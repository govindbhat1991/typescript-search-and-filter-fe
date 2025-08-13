import { StaticProvider } from './decorators/decorators.interface';
import { Injector } from './injector/injector';
import { Class, Maybe } from './interfaces/generic.interface';
/** class that initiates when the web-components ecosystem is used */
export declare class Runtime {
    /** injector map that holds weak refs to module class with value of an injector created for that module class */
    readonly injectors: WeakMap<Class, Injector>;
    /** Initializes given module. */
    initModule(staticModule: Class, extraProviders?: Maybe<StaticProvider[]>): void;
    /** Initialize imported modules */
    private initImportedModules;
    /** Register module components to factory */
    private registerComponents;
    private injectDependencies;
}
//# sourceMappingURL=runtime.d.ts.map