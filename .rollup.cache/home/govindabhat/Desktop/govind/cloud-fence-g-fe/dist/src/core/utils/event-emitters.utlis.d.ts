interface CustomEventListenerMethods {
    subscribe: (event: string, eventMethod: (event: any) => void) => void;
    unsubscribe: (event?: string) => void;
}
type CustomEventListenerType = (element: HTMLElement) => CustomEventListenerMethods;
/** `@Output` decorator helper function; this can be used outside web component to access `@Output` data */
export declare const output: CustomEventListenerType;
export {};
//# sourceMappingURL=event-emitters.utlis.d.ts.map