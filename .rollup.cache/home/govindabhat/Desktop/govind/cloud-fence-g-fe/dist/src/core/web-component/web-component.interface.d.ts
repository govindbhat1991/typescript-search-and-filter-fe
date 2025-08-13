export type PropertyValues<T = unknown> = Map<PropertyKey, T>;
export interface PropertyValue {
    oldValue: unknown;
    newValue: unknown;
}
export interface BindingProperty {
    string: string;
    value: string | number | boolean;
}
export interface EventEmitter<T = unknown> {
    emit: (data: T) => void;
}
export interface CustomElementHooks {
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    disconnectedCallback(): void;
}
/** Invoked when the element is connected. */
export interface OnConnected {
    onConnected(): void;
}
/** Invoked when the element is destroyed/disconnected. */
export interface OnDisconnected {
    onDisconnected(): void;
}
/** Invoked when the element is first updated. */
export interface AfterViewInit {
    afterViewInit(changedProperties: PropertyValues): void;
}
/** Invoked before updating of the element. */
export interface BeforeUpdate {
    beforeUpdate(changedProperties: PropertyValues): void;
}
/** Invoked when the element is updated. */
export interface OnUpdated {
    onUpdated(changedProperties: PropertyValues): void;
}
//# sourceMappingURL=web-component.interface.d.ts.map