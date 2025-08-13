import { Metadata } from 'src/core/metadata/metadata';
import { Template } from '../template/template';
import { createMarker } from '../template/template.helpers';
import { deleteAllComponentEventListener } from '../template/attribute-node/event-node/event-node.constants';
export class WebComponent extends HTMLElement {
    constructor() {
        super(...arguments);
        /** to hold pending update state */
        Object.defineProperty(this, "isUpdatePending", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /** after the initial update it will set to true */
        Object.defineProperty(this, "hasUpdated", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /** Map with keys for any properties that have changed since the last update cycle with previous values. */
        Object.defineProperty(this, "changedProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        /** a promise to avoid multiple update request */
        Object.defineProperty(this, "updatePromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** ShadowRoot; into which element DOM should be rendered. */
        Object.defineProperty(this, "renderRoot", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.createRenderRoot()
        });
        /** reactive node, which holds the template state and do dom manipulation */
        Object.defineProperty(this, "templateFragment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    static get observedAttributes() {
        return Metadata.getComponentInputMetadata(this.prototype.getConstructor()).map(({ inputKey, propertyKey }) => inputKey ? inputKey : propertyKey);
    }
    /** Returns if property descriptor is available on this object. */
    static getOwnPropertyDescriptor(key) {
        return Object.getOwnPropertyDescriptor(this.prototype, key);
    }
    /** Returns a property descriptor to be defined on the given named property. */
    static getPropertyDescriptor(key, obj) {
        const getNewPropertyDescriptor = () => {
            const watchPropertyAndValue = new Map();
            const setWatchPropertyValue = (key, value) => watchPropertyAndValue.set(key, value);
            const getWatchPropertyValue = (key) => watchPropertyAndValue.get(key);
            setWatchPropertyValue(key, Reflect.get(obj, key));
            Reflect.deleteProperty(obj, key);
            return {
                get() {
                    return getWatchPropertyValue(key);
                },
                set(value) {
                    setWatchPropertyValue(key, value);
                },
            };
        };
        const { get, set } = this.getOwnPropertyDescriptor(key) ?? getNewPropertyDescriptor();
        return {
            get() {
                return get?.call(this);
            },
            set(value) {
                const oldValue = get?.call(this);
                set.call(this, value);
                this.callUpdate(key, oldValue, value);
            },
            configurable: true,
            enumerable: true,
        };
    }
    /** returns the constructor of extending class at runtime */
    getConstructor() {
        return this.constructor;
    }
    /** returns the node that the element is supposed to render into */
    createRenderRoot() {
        return this.shadowRoot ?? this.attachShadow(this.getConstructor().shadowRootOptions);
    }
    /** Native lifecycle method by Web Api on custom element */
    connectedCallback() {
        this.attachWatchProperties();
        this.attachAttributes();
        this.assignCustomEventEmitters();
        this.attachStyles();
        if (this.hasCallbackMethod('onConnected')) {
            this['onConnected']?.();
        }
        this.callUpdate();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.attachAttributes(name);
        this.callUpdate(name, oldValue, newValue);
    }
    disconnectedCallback() {
        deleteAllComponentEventListener(this);
        if (this.hasCallbackMethod('onDisconnected')) {
            this['onDisconnected']?.();
        }
    }
    /** checks whether the child class have given method */
    hasCallbackMethod(key) {
        return (this.getConstructor().prototype.hasOwnProperty(key) && typeof this[key] === 'function');
    }
    /**
     * attaches attributes value to the property decorated with @Input extention to observedAttributes
     * @param changedProp, target only one property update, if not given all property from metadata will get updated
     */
    attachAttributes(changedProp) {
        // @TODO, handle undefined, when no property defined.
        Metadata.getComponentInputMetadata(this.getConstructor())
            .map(({ inputKey, propertyKey }) => ({ name: propertyKey, key: inputKey ? inputKey : propertyKey }))
            .filter(({ key, name }) => {
            return ((this.hasOwnProperty(name) || this.getConstructor().getOwnPropertyDescriptor(name)) &&
                this.hasAttribute(key) &&
                (changedProp ? changedProp === key : true));
        })
            .forEach(({ key, name }) => {
            Reflect.set(this, name, this.getAttribute(key));
        });
    }
    /** attaches setter and getter to property decorated with @Watch */
    attachWatchProperties() {
        Metadata.getComponentWatchMetadata(this.getConstructor())
            .filter(Boolean)
            .forEach((key) => {
            const descriptor = this.getConstructor().getPropertyDescriptor(key, this);
            Reflect.defineProperty(this, key, descriptor);
        });
    }
    /** injects style (if exists) */
    attachStyles() {
        if (!this.shadowRoot) {
            return;
        }
        const componentConfigMetadata = Metadata.getComponentConfigMetadata(this.getConstructor());
        let fallbackStyles = '';
        if (componentConfigMetadata?.style?.trim()) {
            try {
                const cssStyleSheet = new CSSStyleSheet();
                cssStyleSheet.replaceSync(componentConfigMetadata.style);
                this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
            }
            catch {
                fallbackStyles = `<style>${componentConfigMetadata.style}</style>`;
                console.warn('browser does not support CSSStyleSheet constructor');
            }
        }
        this.shadowRoot.innerHTML = fallbackStyles;
    }
    /** translates the output metadata as custom events with name (decorated property key) and converts them to EventEmitter */
    assignCustomEventEmitters() {
        const outputs = Metadata.getComponentOutputMetadata(this.getConstructor());
        if (!outputs.length) {
            return;
        }
        for (const output of outputs) {
            const eventEmitter = {
                emit: (data) => {
                    const customEvent = new CustomEvent(output, { detail: data });
                    this.dispatchEvent(customEvent);
                },
            };
            Reflect.set(this, output, eventEmitter);
        }
    }
    callUpdate(name, oldValue, newValue) {
        if (name && !this.changedProperties.has(name)) {
            this.changedProperties.set(name, { oldValue, newValue });
        }
        if (!this.isUpdatePending) {
            this.updatePromise = this.streamUpdate();
        }
    }
    async streamUpdate() {
        this.isUpdatePending = true;
        try {
            await this.updatePromise;
        }
        catch (e) {
            Promise.reject(e);
        }
        const result = this.updateHanlder();
        if (result !== null) {
            await result;
        }
        return !this.isUpdatePending;
    }
    /** handle update of dom element process */
    updateHanlder() {
        if (!this.isUpdatePending) {
            return;
        }
        if (this.hasCallbackMethod('onBeforeUpdate')) {
            this['onBeforeUpdate']?.(this.changedProperties);
        }
        try {
            this.attachTemplate();
            this.updated();
        }
        catch (e) {
            this.updated();
            throw e;
        }
    }
    updated() {
        if (this.hasCallbackMethod('onUpdated')) {
            this['onUpdated']?.(this.changedProperties);
        }
        this.changedProperties = new Map();
        this.isUpdatePending = false;
    }
    /** attaches template content */
    getTemplate() {
        if (this.hasCallbackMethod('render')) {
            return this['render']?.();
        }
    }
    /** attaches template content */
    attachTemplate() {
        const componentConfigMetadata = Metadata.getComponentConfigMetadata(this.getConstructor());
        if (!componentConfigMetadata) {
            throw new Error('Component config is not provided');
        }
        /** will check for template in component config metadata; if not avaialble then try to get from `render` method */
        const templateResult = componentConfigMetadata.template
            ? componentConfigMetadata.template.call(this)
            : this.getTemplate();
        if (!templateResult) {
            throw new Error('Component template is not provided');
        }
        this.templateFragment ?? (this.templateFragment = new Template(this.renderRoot.insertBefore(createMarker(), null), null, this));
        this.templateFragment.renderTemplateFragment(templateResult);
        if (!this.hasUpdated) {
            this.hasUpdated = true;
            if (this.hasCallbackMethod('afterViewInit')) {
                this['afterViewInit']?.(this.changedProperties);
            }
        }
    }
}
Object.defineProperty(WebComponent, "shadowRootOptions", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { mode: 'open' }
});
//# sourceMappingURL=web-component.js.map