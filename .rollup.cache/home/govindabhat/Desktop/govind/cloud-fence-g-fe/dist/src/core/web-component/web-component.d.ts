import { CustomElementHooks } from './web-component.interface';
export declare class WebComponent extends HTMLElement implements CustomElementHooks {
    private static shadowRootOptions;
    static get observedAttributes(): string[];
    /** to hold pending update state */
    private isUpdatePending;
    /** after the initial update it will set to true */
    private hasUpdated;
    /** Map with keys for any properties that have changed since the last update cycle with previous values. */
    private changedProperties;
    /** a promise to avoid multiple update request */
    private updatePromise;
    /** ShadowRoot; into which element DOM should be rendered. */
    readonly renderRoot: HTMLElement | DocumentFragment;
    /** reactive node, which holds the template state and do dom manipulation */
    private templateFragment;
    /** Returns if property descriptor is available on this object. */
    private static getOwnPropertyDescriptor;
    /** Returns a property descriptor to be defined on the given named property. */
    private static getPropertyDescriptor;
    /** returns the constructor of extending class at runtime */
    private getConstructor;
    /** returns the node that the element is supposed to render into */
    private createRenderRoot;
    /** Native lifecycle method by Web Api on custom element */
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    disconnectedCallback(): void;
    /** checks whether the child class have given method */
    private hasCallbackMethod;
    /**
     * attaches attributes value to the property decorated with @Input extention to observedAttributes
     * @param changedProp, target only one property update, if not given all property from metadata will get updated
     */
    private attachAttributes;
    /** attaches setter and getter to property decorated with @Watch */
    private attachWatchProperties;
    /** injects style (if exists) */
    private attachStyles;
    /** translates the output metadata as custom events with name (decorated property key) and converts them to EventEmitter */
    private assignCustomEventEmitters;
    private callUpdate;
    private streamUpdate;
    /** handle update of dom element process */
    private updateHanlder;
    private updated;
    /** attaches template content */
    private getTemplate;
    /** attaches template content */
    private attachTemplate;
}
//# sourceMappingURL=web-component.d.ts.map