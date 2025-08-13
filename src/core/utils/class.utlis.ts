import { Class } from '../core';
import { DependencyToken, StaticModule, StaticProvider } from '../decorators/decorators.interface';
import { InjectionToken } from '../injector/injection-token';

/**
 * Class for common operations used in system
 */
export const Utils = {
    /**
     * extracts module class from module definition
     * @param module class decorated by @Module()
     */
    getModuleClass: (module: StaticModule): Class => {
        return 'module' in module ? module.module : module;
    },

    /**
     * extracts dependency token from given provider definition
     * @param provider provider definition either as value, factory and class or class decorated by @Injectable()
     */
    getDependencyToken: (provider: StaticProvider): DependencyToken => {
        return 'provide' in provider ? provider.provide : provider;
    },

    /**
     * extracts the string value from dependency token
     * @param token is Injection token or class
     */
    getDependencyTokenStr: (token: DependencyToken): string => {
        return token instanceof InjectionToken ? token.keyword : token.name;
    },
};
