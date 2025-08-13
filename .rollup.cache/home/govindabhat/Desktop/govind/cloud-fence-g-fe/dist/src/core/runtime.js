import { Injector } from './injector/injector';
import { Metadata } from './metadata/metadata';
import { Utils } from './utils/class.utlis';
/** class that initiates when the web-components ecosystem is used */
export class Runtime {
    constructor() {
        /** injector map that holds weak refs to module class with value of an injector created for that module class */
        Object.defineProperty(this, "injectors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new WeakMap()
        });
    }
    /** Initializes given module. */
    initModule(staticModule, extraProviders) {
        const moduleClass = Utils.getModuleClass(staticModule);
        const moduleConfigMetadata = Metadata.getModuleConfigMetadata(moduleClass);
        this.initImportedModules(moduleConfigMetadata, moduleClass, extraProviders);
        this.registerComponents(moduleConfigMetadata, moduleClass);
    }
    /** Initialize imported modules */
    initImportedModules({ imports }, moduleClass, extraProviders) {
        if (imports) {
            for (const importedModule of imports) {
                let module;
                let providers;
                if ('module' in importedModule) {
                    module = importedModule.module;
                    providers = importedModule.providers;
                }
                else {
                    module = importedModule;
                }
                this.initModule(module, providers);
            }
        }
        // get imported modules' injectors
        const parentInjectors = imports?.map((importedModule) => this.injectors.get(Utils.getModuleClass(importedModule)));
        // create module injector if does not exist
        if (!this.injectors.has(moduleClass)) {
            this.injectors.set(moduleClass, Injector.create(moduleClass, parentInjectors));
        }
        // get module injector after created
        const injector = this.injectors.get(moduleClass);
        // register extra providers on module with providers
        if (extraProviders?.length) {
            Injector.extend(injector, extraProviders);
        }
    }
    /** Register module components to factory */
    registerComponents({ components }, moduleClass) {
        if (!components) {
            return;
        }
        for (const component of components) {
            const componentConfigMetadata = Metadata.getComponentConfigMetadata(component);
            if (!componentConfigMetadata) {
                return;
            }
            const { selector } = componentConfigMetadata;
            if (customElements.get(selector)) {
                return;
            }
            // get module injector after created
            const injector = this.injectors.get(moduleClass);
            const proxyComponent = new Proxy(component, {
                construct: (target, _argumentArray, newTarget) => {
                    return Reflect.construct(target, this.injectDependencies(component, injector), newTarget);
                },
            });
            customElements.define(selector, proxyComponent);
        }
    }
    injectDependencies(componentClass, injector) {
        const dependencyTokensMetadata = Metadata.getDependencyTokens(componentClass);
        if (dependencyTokensMetadata.length === 0) {
            return [];
        }
        const dependencyTokens = dependencyTokensMetadata.map((dependencyToken) => injector.inject(dependencyToken));
        console.log('injections: ', dependencyTokens);
        return dependencyTokens;
    }
}
//# sourceMappingURL=runtime.js.map