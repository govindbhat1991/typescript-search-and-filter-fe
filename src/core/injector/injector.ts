import { Class, Maybe } from '../core';
import { DependencyToken, StaticModule, StaticProvider } from '../decorators/decorators.interface';
import { Metadata } from '../metadata/metadata';
import { Provider } from '../provider';
import { Utils } from '../utils/class.utlis';

export class Injector extends WeakMap {
    static getInjectableDependencies(provider: StaticProvider): DependencyToken[] {
        if ('useValue' in provider) {
            return [];
        } else if ('useFactory' in provider) {
            return provider.deps;
        } else {
            const providerClass: Class = 'useClass' in provider ? provider.useClass : provider;
            // check metadata
            const providerMetadata = Metadata.getProviderConfigMetadata(providerClass);
            if (!providerMetadata) {
                throw new Error(
                    `${providerClass.name} is not decorated with @Injectable(). If ${providerClass.name} is a provider, please add @Injectable() decorator to it`
                );
            }

            return Metadata.getDependencyTokens(providerClass);
        }
    }

    static create(module: StaticModule, parentInjectors?: Maybe<Injector[]>): Injector {
        return new Injector(Utils.getModuleClass(module), parentInjectors || []);
    }

    static extend(injector: Injector, extraProviders: StaticProvider[]): void {
        for (const extraProvider of extraProviders) {
            Injector.createProvider(injector, extraProvider, true);
        }
    }

    private static createProvider(injector: Injector, provider: StaticProvider, exports: boolean): void {
        injector.set(Utils.getDependencyToken(provider), new Provider(provider, exports));
    }

    constructor(readonly moduleClass: Class, readonly parentInjectors: Injector[]) {
        super();
        const moduleConfig = Metadata.getModuleConfigMetadata(moduleClass);

        for (const provider of moduleConfig.providers || []) {
            Injector.createProvider(this, provider, !!moduleConfig.exports?.includes(provider));
        }
    }

    inject<T = unknown>(token: DependencyToken): T {
        let injectableInstance!: T;

        for (const injector of [this, ...this.parentInjectors]) {
            const resolvedInjectable = injector.get(token) as Maybe<Provider<T>>;
            const canInject = this.moduleClass.name === injector.moduleClass.name || !!resolvedInjectable?.exported;
            if (resolvedInjectable && canInject) {
                const dependencies = Injector.getInjectableDependencies(resolvedInjectable.provider);
                const dependencyInstances = dependencies.map((dep: DependencyToken) => injector.inject(dep));
                injectableInstance = resolvedInjectable.getInstance(...dependencyInstances);
                break;
            }
        }
        if (!injectableInstance) {
            throw new Error(
                `NullInjector for ${Utils.getDependencyTokenStr(token)}. Make sure that you have it in ${
                    this.moduleClass.name
                }'s providers or one of the imported modules exports array`
            );
        }

        return injectableInstance;
    }
}
