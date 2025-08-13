import { Metadata } from '../metadata/metadata';
import { Provider } from '../provider';
import { Utils } from '../utils/class.utlis';
export class Injector extends WeakMap {
    static getInjectableDependencies(provider) {
        if ('useValue' in provider) {
            return [];
        }
        else if ('useFactory' in provider) {
            return provider.deps;
        }
        else {
            const providerClass = 'useClass' in provider ? provider.useClass : provider;
            // check metadata
            const providerMetadata = Metadata.getProviderConfigMetadata(providerClass);
            if (!providerMetadata) {
                throw new Error(`${providerClass.name} is not decorated with @Injectable(). If ${providerClass.name} is a provider, please add @Injectable() decorator to it`);
            }
            return Metadata.getDependencyTokens(providerClass);
        }
    }
    static create(module, parentInjectors) {
        return new Injector(Utils.getModuleClass(module), parentInjectors || []);
    }
    static extend(injector, extraProviders) {
        for (const extraProvider of extraProviders) {
            Injector.createProvider(injector, extraProvider, true);
        }
    }
    static createProvider(injector, provider, exports) {
        injector.set(Utils.getDependencyToken(provider), new Provider(provider, exports));
    }
    constructor(moduleClass, parentInjectors) {
        super();
        Object.defineProperty(this, "moduleClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: moduleClass
        });
        Object.defineProperty(this, "parentInjectors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: parentInjectors
        });
        const moduleConfig = Metadata.getModuleConfigMetadata(moduleClass);
        for (const provider of moduleConfig.providers || []) {
            Injector.createProvider(this, provider, !!moduleConfig.exports?.includes(provider));
        }
    }
    inject(token) {
        let injectableInstance;
        for (const injector of [this, ...this.parentInjectors]) {
            const resolvedInjectable = injector.get(token);
            const canInject = this.moduleClass.name === injector.moduleClass.name || !!resolvedInjectable?.exported;
            if (resolvedInjectable && canInject) {
                const dependencies = Injector.getInjectableDependencies(resolvedInjectable.provider);
                const dependencyInstances = dependencies.map((dep) => injector.inject(dep));
                injectableInstance = resolvedInjectable.getInstance(...dependencyInstances);
                break;
            }
        }
        if (!injectableInstance) {
            throw new Error(`NullInjector for ${Utils.getDependencyTokenStr(token)}. Make sure that you have it in ${this.moduleClass.name}'s providers or one of the imported modules exports array`);
        }
        return injectableInstance;
    }
}
//# sourceMappingURL=injector.js.map