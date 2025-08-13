import { Metadata } from 'src/core/metadata/metadata';
import { Template } from '../template/template';
import { createMarker } from '../template/template.helpers';
import { CustomElementHooks, EventEmitter, PropertyValue, PropertyValues } from './web-component.interface';
import { deleteAllComponentEventListener } from '../template/attribute-node/event-node/event-node.constants';

export class WebComponent extends HTMLElement implements CustomElementHooks {
    private static shadowRootOptions: ShadowRootInit = { mode: 'open' };

    static get observedAttributes() {
        return Metadata.getComponentInputMetadata(this.prototype.getConstructor()).map(({ inputKey, propertyKey }) =>
            inputKey ? inputKey : propertyKey
        );
    }

    /** to hold pending update state */
    private isUpdatePending = false;

    /** after the initial update it will set to true */
    private hasUpdated = false;

    /** Map with keys for any properties that have changed since the last update cycle with previous values. */
    private changedProperties: PropertyValues<PropertyValue> = new Map();

    /** a promise to avoid multiple update request */
    private updatePromise!: Promise<boolean>;

    /** ShadowRoot; into which element DOM should be rendered. */
    readonly renderRoot = this.createRenderRoot();

    /** reactive node, which holds the template state and do dom manipulation */
    private templateFragment: Template | undefined;

    /** Returns if property descriptor is available on this object. */
    private static getOwnPropertyDescriptor(key: PropertyKey) {
        return Object.getOwnPropertyDescriptor(this.prototype, key);
    }

    /** Returns a property descriptor to be defined on the given named property. */
    private static getPropertyDescriptor(key: PropertyKey, obj: WebComponent): PropertyDescriptor {
        const getNewPropertyDescriptor = () => {
            const watchPropertyAndValue = new Map<string, unknown>();
            const setWatchPropertyValue = (key: string, value: unknown) => watchPropertyAndValue.set(key, value);
            const getWatchPropertyValue = (key: string) => watchPropertyAndValue.get(key);
            setWatchPropertyValue(key as string, Reflect.get(obj, key));
            Reflect.deleteProperty(obj, key);

            return {
                get() {
                    return getWatchPropertyValue(key as string);
                },
                set(value: unknown) {
                    setWatchPropertyValue(key as string, value);
                },
            };
        };
        const { get, set } = this.getOwnPropertyDescriptor(key) ?? getNewPropertyDescriptor();
        return {
            get(this: WebComponent) {
                return get?.call(this);
            },
            set(this: WebComponent, value: unknown) {
                const oldValue = get?.call(this);
                set!.call(this, value);
                this.callUpdate(key, oldValue, value);
            },
            configurable: true,
            enumerable: true,
        };
    }

    /** returns the constructor of extending class at runtime */
    private getConstructor() {
        return this.constructor as typeof WebComponent;
    }

    /** returns the node that the element is supposed to render into */
    private createRenderRoot(): HTMLElement | DocumentFragment {
        return this.shadowRoot ?? this.attachShadow(this.getConstructor().shadowRootOptions);
    }

    /** Native lifecycle method by Web Api on custom element */
    connectedCallback(): void {
        this.attachWatchProperties();
        this.attachAttributes();
        this.assignCustomEventEmitters();
        this.attachStyles();
        if (this.hasCallbackMethod('onConnected')) {
            (this['onConnected' as keyof typeof this] as Function)?.();
        }
        this.callUpdate();
    }

    attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void {
        this.attachAttributes(name);
        this.callUpdate(name, oldValue, newValue);
    }

    disconnectedCallback(): void {
        deleteAllComponentEventListener(this);
        if (this.hasCallbackMethod('onDisconnected')) {
            (this['onDisconnected' as keyof typeof this] as Function)?.();
        }
    }

    /** checks whether the child class have given method */
    private hasCallbackMethod(key: string): boolean {
        return (
            this.getConstructor().prototype.hasOwnProperty(key) && typeof this[key as keyof typeof this] === 'function'
        );
    }

    /**
     * attaches attributes value to the property decorated with @Input extention to observedAttributes
     * @param changedProp, target only one property update, if not given all property from metadata will get updated
     */
    private attachAttributes(changedProp?: string): void {
        // @TODO, handle undefined, when no property defined.
        Metadata.getComponentInputMetadata(this.getConstructor())
            .map(({ inputKey, propertyKey }) => ({ name: propertyKey, key: inputKey ? inputKey : propertyKey }))
            .filter(({ key, name }) => {
                return (
                    (this.hasOwnProperty(name) || this.getConstructor().getOwnPropertyDescriptor(name)) &&
                    this.hasAttribute(key) &&
                    (changedProp ? changedProp === key : true)
                );
            })
            .forEach(({ key, name }) => {
                Reflect.set(this, name, this.getAttribute(key));
            });
    }

    /** attaches setter and getter to property decorated with @Watch */
    private attachWatchProperties(): void {
        Metadata.getComponentWatchMetadata(this.getConstructor())
            .filter(Boolean)
            .forEach((key) => {
                const descriptor = this.getConstructor().getPropertyDescriptor(key, this);
                Reflect.defineProperty(this, key, descriptor);
            });
    }

    /** injects style (if exists) */
    private attachStyles(): void {
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
            } catch {
                fallbackStyles = `<style>${componentConfigMetadata.style}</style>`;
                console.warn('browser does not support CSSStyleSheet constructor');
            }
        }

        this.shadowRoot.innerHTML = fallbackStyles;
    }

    /** translates the output metadata as custom events with name (decorated property key) and converts them to EventEmitter */
    private assignCustomEventEmitters(): void {
        const outputs: string[] = Metadata.getComponentOutputMetadata(this.getConstructor());
        if (!outputs.length) {
            return;
        }

        for (const output of outputs) {
            const eventEmitter: EventEmitter<unknown> = {
                emit: (data) => {
                    const customEvent = new CustomEvent(output, { detail: data });
                    this.dispatchEvent(customEvent);
                },
            };
            Reflect.set(this, output, eventEmitter);
        }
    }

    private callUpdate(name?: PropertyKey, oldValue?: unknown, newValue?: unknown) {
        if (name && !this.changedProperties.has(name)) {
            this.changedProperties.set(name, { oldValue, newValue });
        }

        if (!this.isUpdatePending) {
            this.updatePromise = this.streamUpdate();
        }
    }

    private async streamUpdate() {
        this.isUpdatePending = true;
        try {
            await this.updatePromise;
        } catch (e) {
            Promise.reject(e);
        }
        const result = this.updateHanlder();
        if (result !== null) {
            await result;
        }
        return !this.isUpdatePending;
    }

    /** handle update of dom element process */
    private updateHanlder(): void {
        if (!this.isUpdatePending) {
            return;
        }

        if (this.hasCallbackMethod('onBeforeUpdate')) {
            (this['onBeforeUpdate' as keyof typeof this] as Function)?.(this.changedProperties);
        }

        try {
            this.attachTemplate();
            this.updated();
        } catch (e) {
            this.updated();
            throw e;
        }
    }

    private updated() {
        if (this.hasCallbackMethod('onUpdated')) {
            (this['onUpdated' as keyof typeof this] as Function)?.(this.changedProperties);
        }
        this.changedProperties = new Map();
        this.isUpdatePending = false;
    }

    /** attaches template content */
    private getTemplate() {
        if (this.hasCallbackMethod('render')) {
            return (this['render' as keyof typeof this] as Function)?.();
        }
    }

    /** attaches template content */
    private attachTemplate() {
        const componentConfigMetadata = Metadata.getComponentConfigMetadata(this.getConstructor());
        if (!componentConfigMetadata) {
            throw new Error('Component config is not provided');
        }

        /** will check for template in component config metadata; if not avaialble then try to get from `render` method */
        const templateResult = componentConfigMetadata.template
            ? (componentConfigMetadata.template as unknown as Function).call(this)
            : this.getTemplate();

        if (!templateResult) {
            throw new Error('Component template is not provided');
        }

        this.templateFragment ??= new Template(this.renderRoot.insertBefore(createMarker(), null), null, this);
        this.templateFragment.renderTemplateFragment(templateResult);

        if (!this.hasUpdated) {
            this.hasUpdated = true;
            if (this.hasCallbackMethod('afterViewInit')) {
                (this['afterViewInit' as keyof typeof this] as Function)?.(this.changedProperties);
            }
        }
    }
}
