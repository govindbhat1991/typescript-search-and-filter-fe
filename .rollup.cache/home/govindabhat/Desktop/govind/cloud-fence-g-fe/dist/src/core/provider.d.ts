import { StaticProvider } from './decorators/decorators.interface';
/**
 * Provider class that creates an instance of given provider if has none,
 */
export declare class Provider<T = unknown> {
    #private;
    readonly provider: StaticProvider;
    readonly exported: boolean;
    constructor(provider: StaticProvider, exported: boolean);
    /**
     * Creates instance of given provider and sets it to instance
     * @param deps instances of providers that provider depends on
     */
    createInstance(...deps: unknown[]): T;
    /**
     * Retrieve the instance value of provider or create if EMPTY
     * @param deps
     */
    getInstance(...deps: unknown[]): T;
}
//# sourceMappingURL=provider.d.ts.map