import 'reflect-metadata';
import { ComponentConfig, DependencyToken, ModuleConfig, ProviderConfig } from '../decorators/decorators.interface';
import { Class, InstanceOf } from '../interfaces/generic.interface';
import { WebComponent } from '../web-component/web-component';
import { InjectMetadata, InputMetadata } from './metadata.interface';
import { InjectionToken } from '../injector/injection-token';
declare const InputMetadata: {
    /**
     * Sets input - metadata on a given component class
     * @param targetInstance is the instance of a class derived from WebComponent
     * @param propertyKey is the property of the instance of a class derived from WebComponent and decorated with @Input()
     * @param inputKey is the attribute key to represent property of the instance of a class
     */
    setComponentInputMetadata: <T extends WebComponent>(targetInstance: InstanceOf<T>, propertyKey: string, inputKey?: string) => void;
    /**
     * Retrieves the metadata set on a component class as property keys array
     * @param targetClass class that holds metadata through @Input() decorator
     */
    getComponentInputMetadata: <T extends WebComponent>(targetClass: Class<T>) => InputMetadata[];
};
declare const DependencyToken: {
    /**
     * Retrieves normalized(!) constructor parameters for given class.
     * Combines the types of the constructor param types with inject metadata
     * @param targetClass class that hold metadata through constructor params and @Inject() decorator calls
     */
    getDependencyTokens: <T = unknown>(targetClass: Class<T>) => DependencyToken[];
};
/**
 * Metadata factory to set and get metadata using decorators
 */
export declare const Metadata: {
    /**
     * Retrieves normalized(!) constructor parameters for given class.
     * Combines the types of the constructor param types with inject metadata
     * @param targetClass class that hold metadata through constructor params and @Inject() decorator calls
     */
    getDependencyTokens: <T = unknown>(targetClass: Class<T>) => DependencyToken[];
    /**
     * Sets the metadata on a Component or Injectable class where to inject the provider with given Dependency Token
     * @param targetClass component or provider class that injects dependency via @Inject() decorator
     * @param token is the class name or Injection token of the provider
     * @param parameterIndex index of the decorated constructor parameter
     */
    setInjectMetadata: (targetClass: Class, parameterIndex: number, token: InjectionToken) => void;
    /**
     * Retrieves the metadata set on target class as IInjectMetadata array
     * @param targetClass class that holds inject config metadata
     */
    getInjectMetadata: (targetClass: Class) => InjectMetadata[];
    /**
     * Sets the metadata for injectable class
     * @param targetClass injectable class that can be used in DI system
     * @param config info that contains if the provider is providedIn root, currently no use of it
     */
    setProviderConfigMetadata: (targetClass: Class, config: ProviderConfig) => void;
    /**
     * Retrieves the metadata set on target class as Injectable config
     * @param targetClass class that holds injectable config metadata
     */
    getProviderConfigMetadata: (targetClass: Class) => ProviderConfig | undefined;
    /**
     * Sets Watch - metadata on a given component class
     * @param targetInstance is the instance of a class derived from WebComponent
     * @param propertyKey is the property of the instance of a class derived from WebComponent and decorated with @Watch()
     */
    setComponentWatchMetadata: <T extends WebComponent>(targetInstance: InstanceOf<T>, propertyKey: string) => void;
    /**
     * Retrieves the metadata set on a component class as property keys array
     * @param targetClass class that holds metadata through @Watch() decorator
     */
    getComponentWatchMetadata: <T extends WebComponent>(targetClass: Class<T>) => string[];
    /**
     * Sets the metadata for module class
     * @param targetClass module class that is decorated with @Module()
     * @param config module config that contains information will be saved as metadata
     */
    setModuleConfigMetadata: (targetClass: Class, config: ModuleConfig) => void;
    /**
     * Retrieves the metadata set on target class as Module config
     * @param targetClass class that holds module config metadata
     */
    getModuleConfigMetadata: (targetClass: Class) => ModuleConfig;
    /**
     * Sets the metadata for component class that will be registered in customElementRegistry
     * @param targetClass is the component class that extends WebComponent base class
     * @param config info that contains component's selector, template and style
     */
    setComponentConfigMetadata: <T extends WebComponent>(targetClass: Class<T>, config: ComponentConfig) => void;
    /**
     * Retrieves the metadata set on target class as IComponentConfig
     * @param targetClass class that holds component config metadata
     */
    getComponentConfigMetadata: <T extends WebComponent>(targetClass: Class<T>) => ComponentConfig | undefined;
    /**
     * Sets output - custom event - metadata on a given component class
     * @param targetInstance is the instance of a class derived from WebComponent
     * @param propertyKey is the property of the instance of a class derived from WebComponent and decorated with @Output()
     */
    setComponentOutputMetadata: <T extends WebComponent>(targetInstance: InstanceOf<T>, propertyKey: string) => void;
    /**
     * Retrieves the metadata set on a component class as property keys array
     * @param targetClass class that holds metadata through @Output() decorator
     */
    getComponentOutputMetadata: <T extends WebComponent>(targetClass: Class<T>) => string[];
    /**
     * Sets input - metadata on a given component class
     * @param targetInstance is the instance of a class derived from WebComponent
     * @param propertyKey is the property of the instance of a class derived from WebComponent and decorated with @Input()
     * @param inputKey is the attribute key to represent property of the instance of a class
     */
    setComponentInputMetadata: <T extends WebComponent>(targetInstance: InstanceOf<T>, propertyKey: string, inputKey?: string) => void;
    /**
     * Retrieves the metadata set on a component class as property keys array
     * @param targetClass class that holds metadata through @Input() decorator
     */
    getComponentInputMetadata: <T extends WebComponent>(targetClass: Class<T>) => InputMetadata[];
};
export {};
//# sourceMappingURL=metadata.d.ts.map