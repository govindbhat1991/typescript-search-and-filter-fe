import { Class, Maybe } from '../core';
import { DependencyToken, StaticModule, StaticProvider } from '../decorators/decorators.interface';
export declare class Injector extends WeakMap {
    readonly moduleClass: Class;
    readonly parentInjectors: Injector[];
    static getInjectableDependencies(provider: StaticProvider): DependencyToken[];
    static create(module: StaticModule, parentInjectors?: Maybe<Injector[]>): Injector;
    static extend(injector: Injector, extraProviders: StaticProvider[]): void;
    private static createProvider;
    constructor(moduleClass: Class, parentInjectors: Injector[]);
    inject<T = unknown>(token: DependencyToken): T;
}
//# sourceMappingURL=injector.d.ts.map