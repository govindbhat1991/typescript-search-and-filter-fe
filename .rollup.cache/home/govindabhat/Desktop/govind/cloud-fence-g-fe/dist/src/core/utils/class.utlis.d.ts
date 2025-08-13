import { Class } from '../core';
import { DependencyToken, StaticModule, StaticProvider } from '../decorators/decorators.interface';
/**
 * Class for common operations used in system
 */
export declare const Utils: {
    /**
     * extracts module class from module definition
     * @param module class decorated by @Module()
     */
    getModuleClass: (module: StaticModule) => Class;
    /**
     * extracts dependency token from given provider definition
     * @param provider provider definition either as value, factory and class or class decorated by @Injectable()
     */
    getDependencyToken: (provider: StaticProvider) => DependencyToken;
    /**
     * extracts the string value from dependency token
     * @param token is Injection token or class
     */
    getDependencyTokenStr: (token: DependencyToken) => string;
};
//# sourceMappingURL=class.utlis.d.ts.map