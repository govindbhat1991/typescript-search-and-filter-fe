import { StaticProvider } from './decorators/decorators.interface';
import type { Maybe } from './interfaces/generic.interface';

/**
 * Provider class that creates an instance of given provider if has none,
 */
export class Provider<T = unknown> {
    /**
     * value to distinguish not instantiated values from all falsy values
     * @private
     */
    readonly #empty = Symbol('empty');

    /**
     * value of the created instance of given provider
     * @private
     */
    #instance: Maybe<T> | symbol = this.#empty;

    constructor(readonly provider: StaticProvider, readonly exported: boolean) {}

    /**
     * Creates instance of given provider and sets it to instance
     * @param deps instances of providers that provider depends on
     */
    createInstance(...deps: unknown[]): T {
        let value: T;
        if ('useValue' in this.provider) {
            value = this.provider.useValue as T;
        } else if ('useFactory' in this.provider) {
            value = this.provider.useFactory(...deps) as T;
        } else if ('useClass' in this.provider) {
            value = new this.provider.useClass(...deps) as T;
        } else {
            value = new this.provider(...deps) as T;
        }
        this.#instance = value;

        return this.#instance;
    }

    /**
     * Retrieve the instance value of provider or create if EMPTY
     * @param deps
     */
    getInstance(...deps: unknown[]): T {
        if (this.#instance !== this.#empty) {
            return this.#instance as T;
        }

        return this.createInstance(...deps);
    }
}
