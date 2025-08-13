import 'reflect-metadata';
import { METADATA_KEYS } from './metadata.constant';
// @TODO, remove reflect metadata and use custom weakmap
const WatchMetadata = {
    /**
     * Sets Watch - metadata on a given component class
     * @param targetInstance is the instance of a class derived from WebComponent
     * @param propertyKey is the property of the instance of a class derived from WebComponent and decorated with @Watch()
     */
    setComponentWatchMetadata: (targetInstance, propertyKey) => {
        const targetClass = targetInstance.constructor;
        const hasMetadata = Reflect.hasMetadata(METADATA_KEYS.Watch, targetClass);
        if (!hasMetadata) {
            Reflect.defineMetadata(METADATA_KEYS.Watch, [propertyKey], targetClass);
        }
        else {
            const watchMetadata = WatchMetadata.getComponentWatchMetadata(targetClass);
            watchMetadata.push(propertyKey);
        }
    },
    /**
     * Retrieves the metadata set on a component class as property keys array
     * @param targetClass class that holds metadata through @Watch() decorator
     */
    getComponentWatchMetadata: (targetClass) => {
        return Reflect.getMetadata(METADATA_KEYS.Watch, targetClass) || [];
    },
};
const InputMetadata = {
    /**
     * Sets input - metadata on a given component class
     * @param targetInstance is the instance of a class derived from WebComponent
     * @param propertyKey is the property of the instance of a class derived from WebComponent and decorated with @Input()
     * @param inputKey is the attribute key to represent property of the instance of a class
     */
    setComponentInputMetadata: (targetInstance, propertyKey, inputKey = '') => {
        const targetClass = targetInstance.constructor;
        const hasMetadata = Reflect.hasMetadata(METADATA_KEYS.Input, targetClass);
        if (!hasMetadata) {
            Reflect.defineMetadata(METADATA_KEYS.Input, [{ propertyKey, inputKey }], targetClass);
        }
        else {
            const inputMetadata = InputMetadata.getComponentInputMetadata(targetClass);
            inputMetadata.push({ propertyKey, inputKey });
        }
    },
    /**
     * Retrieves the metadata set on a component class as property keys array
     * @param targetClass class that holds metadata through @Input() decorator
     */
    getComponentInputMetadata: (targetClass) => {
        return Reflect.getMetadata(METADATA_KEYS.Input, targetClass) || [];
    },
};
const OutputMetadata = {
    /**
     * Sets output - custom event - metadata on a given component class
     * @param targetInstance is the instance of a class derived from WebComponent
     * @param propertyKey is the property of the instance of a class derived from WebComponent and decorated with @Output()
     */
    setComponentOutputMetadata: (targetInstance, propertyKey) => {
        const targetClass = targetInstance.constructor;
        const hasMetadata = Reflect.hasMetadata(METADATA_KEYS.Output, targetClass);
        if (!hasMetadata) {
            Reflect.defineMetadata(METADATA_KEYS.Output, [propertyKey], targetClass);
        }
        else {
            const outputMetadata = OutputMetadata.getComponentOutputMetadata(targetClass);
            outputMetadata.push(propertyKey);
        }
    },
    /**
     * Retrieves the metadata set on a component class as property keys array
     * @param targetClass class that holds metadata through @Output() decorator
     */
    getComponentOutputMetadata: (targetClass) => {
        return Reflect.getMetadata(METADATA_KEYS.Output, targetClass) || [];
    },
};
const ComponentMetadata = {
    /**
     * Sets the metadata for component class that will be registered in customElementRegistry
     * @param targetClass is the component class that extends WebComponent base class
     * @param config info that contains component's selector, template and style
     */
    setComponentConfigMetadata: (targetClass, config) => {
        Reflect.defineMetadata(METADATA_KEYS.Component, config, targetClass);
    },
    /**
     * Retrieves the metadata set on target class as IComponentConfig
     * @param targetClass class that holds component config metadata
     */
    getComponentConfigMetadata: (targetClass) => {
        return Reflect.getMetadata(METADATA_KEYS.Component, targetClass);
    },
};
const ModuleMetadata = {
    /**
     * Sets the metadata for module class
     * @param targetClass module class that is decorated with @Module()
     * @param config module config that contains information will be saved as metadata
     */
    setModuleConfigMetadata: (targetClass, config) => {
        Reflect.defineMetadata(METADATA_KEYS.Module, config, targetClass);
    },
    /**
     * Retrieves the metadata set on target class as Module config
     * @param targetClass class that holds module config metadata
     */
    getModuleConfigMetadata: (targetClass) => {
        return Reflect.getMetadata(METADATA_KEYS.Module, targetClass);
    },
};
const ProviderMetadata = {
    /**
     * Sets the metadata for injectable class
     * @param targetClass injectable class that can be used in DI system
     * @param config info that contains if the provider is providedIn root, currently no use of it
     */
    setProviderConfigMetadata: (targetClass, config) => {
        Reflect.defineMetadata(METADATA_KEYS.Provider, config, targetClass);
    },
    /**
     * Retrieves the metadata set on target class as Injectable config
     * @param targetClass class that holds injectable config metadata
     */
    getProviderConfigMetadata: (targetClass) => {
        return Reflect.getMetadata(METADATA_KEYS.Provider, targetClass);
    },
};
const InjectMetatdata = {
    /**
     * Sets the metadata on a Component or Injectable class where to inject the provider with given Dependency Token
     * @param targetClass component or provider class that injects dependency via @Inject() decorator
     * @param token is the class name or Injection token of the provider
     * @param parameterIndex index of the decorated constructor parameter
     */
    setInjectMetadata: (targetClass, parameterIndex, token) => {
        const hasMetadata = Reflect.hasMetadata(METADATA_KEYS.inject, targetClass);
        if (!hasMetadata) {
            Reflect.defineMetadata(METADATA_KEYS.inject, [{ token, parameterIndex }], targetClass);
        }
        else {
            const injectMetadata = InjectMetatdata.getInjectMetadata(targetClass);
            injectMetadata.unshift({ token, parameterIndex });
        }
    },
    /**
     * Retrieves the metadata set on target class as IInjectMetadata array
     * @param targetClass class that holds inject config metadata
     */
    getInjectMetadata: (targetClass) => {
        return Reflect.getMetadata(METADATA_KEYS.inject, targetClass) || [];
    },
};
const DependencyToken = {
    /**
     * Retrieves normalized(!) constructor parameters for given class.
     * Combines the types of the constructor param types with inject metadata
     * @param targetClass class that hold metadata through constructor params and @Inject() decorator calls
     */
    getDependencyTokens: (targetClass) => {
        // const constructorParameterTypes = (Reflect.getMetadata(METADATA_KEYS.ConstructorParams, targetClass) ||
        //     []) as Class[];
        const injectMetadata = Metadata.getInjectMetadata(targetClass);
        return injectMetadata.map(({ token }) => token);
        // console.log('get inject: ', injectMetadata);
        // const tokens: DependencyToken[] = [];
        // for (const parameterType of constructorParameterTypes) {
        //     const index: number = constructorParameterTypes.indexOf(parameterType);
        //     const mayBeInjectionToken = injectMetadata.find(
        //         (metadata: InjectMetadata) => metadata.parameterIndex === index
        //     );
        //     tokens.push(mayBeInjectionToken?.token || parameterType);
        // }
        // return tokens;
    },
};
/**
 * Metadata factory to set and get metadata using decorators
 */
export const Metadata = {
    ...InputMetadata,
    ...OutputMetadata,
    ...ComponentMetadata,
    ...ModuleMetadata,
    ...WatchMetadata,
    ...ProviderMetadata,
    ...InjectMetatdata,
    ...DependencyToken,
};
//# sourceMappingURL=metadata.js.map