import { WebComponent } from './core';
import { DependencyToken, ModuleConfig, StaticModule, StaticProvider } from './decorators/decorators.interface';
import { Injector } from './injector/injector';
import { Class, Maybe } from './interfaces/generic.interface';
import { Metadata } from './metadata/metadata';
import { Utils } from './utils/class.utlis';

/** class that initiates when the web-components ecosystem is used */
export class Runtime {
    /** injector map that holds weak refs to module class with value of an injector created for that module class */
    readonly injectors: WeakMap<Class, Injector> = new WeakMap<Class, Injector>();

    /** Initializes given module. */
    initModule(staticModule: Class, extraProviders?: Maybe<StaticProvider[]>): void {
        const moduleClass = Utils.getModuleClass(staticModule);
        const moduleConfigMetadata = Metadata.getModuleConfigMetadata(moduleClass);
        this.initImportedModules(moduleConfigMetadata, moduleClass, extraProviders);
        this.registerComponents(moduleConfigMetadata, moduleClass);
    }

    /** Initialize imported modules */
    private initImportedModules(
        { imports }: ModuleConfig,
        moduleClass: Class,
        extraProviders?: Maybe<StaticProvider[]>
    ) {
        if (imports) {
            for (const importedModule of imports) {
                let module: Class;
                let providers: Maybe<StaticProvider[]>;
                if ('module' in importedModule) {
                    module = importedModule.module;
                    providers = importedModule.providers;
                } else {
                    module = importedModule;
                }
                this.initModule(module, providers);
            }
        }

        // get imported modules' injectors
        const parentInjectors: Maybe<Injector[]> = imports?.map(
            (importedModule: StaticModule) => this.injectors.get(Utils.getModuleClass(importedModule)) as Injector
        );
        // create module injector if does not exist
        if (!this.injectors.has(moduleClass)) {
            this.injectors.set(moduleClass, Injector.create(moduleClass, parentInjectors));
        }
        // get module injector after created
        const injector: Injector = this.injectors.get(moduleClass) as Injector;
        // register extra providers on module with providers
        if (extraProviders?.length) {
            Injector.extend(injector, extraProviders);
        }
    }

    /** Register module components to factory */
    private registerComponents({ components }: ModuleConfig, moduleClass: Class) {
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
            const injector: Injector = this.injectors.get(moduleClass) as Injector;

            const proxyComponent = new Proxy<Class<WebComponent>>(component, {
                construct: (
                    target: Class<WebComponent>,
                    _argumentArray: unknown[],
                    newTarget: Class<HTMLElement>
                ): WebComponent => {
                    return Reflect.construct(target, this.injectDependencies(component, injector), newTarget);
                },
            });
            customElements.define(selector, proxyComponent);
        }
    }

    private injectDependencies<T extends WebComponent>(componentClass: Class<T>, injector: Injector): unknown[] {
        const dependencyTokensMetadata = Metadata.getDependencyTokens(componentClass);
        if (dependencyTokensMetadata.length === 0) {
            return [];
        }
        const dependencyTokens = dependencyTokensMetadata.map((dependencyToken: DependencyToken) =>
            injector.inject(dependencyToken)
        );
        console.log('injections: ', dependencyTokens);
        return dependencyTokens;
    }
}
