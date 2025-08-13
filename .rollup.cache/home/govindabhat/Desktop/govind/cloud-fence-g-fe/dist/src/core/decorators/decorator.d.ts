import { InjectionToken } from '../injector/injection-token';
import { WebComponent } from '../web-component/web-component';
import { ClassDecorator, ComponentConfig, ComponentDecorator, ModuleConfig, PropertyDecorator, ProviderConfig } from './decorators.interface';
/** Input, Output etc Decorates a web component class property and generates custom event metadata based on given property key. */
export declare const Input: <T extends WebComponent>(key?: string) => PropertyDecorator<T>;
export declare const Output: <T extends WebComponent>() => PropertyDecorator<T>;
export declare const Watch: <T extends WebComponent>() => PropertyDecorator<T>;
/** Decorates a component class that extends WebComponent class and generates metadata on given class as customized component. */
export declare const Component: <T extends WebComponent>(componentConfig: ComponentConfig) => ComponentDecorator<T>;
/** Decorates a module class and generates metadata on given class as module. */
export declare const Module: (moduleConfig: ModuleConfig) => ClassDecorator;
/**
 * Decorates a provider class and generates metadata on given class as provider.
 * @param providerConfig
 */
export declare const Injectable: (providerConfig?: ProviderConfig) => ClassDecorator;
/**
 * Decorates a constructor parameter and generates metadata on class that injects the provider with given token.
 * @param token
 */
export declare const Inject: (token?: InjectionToken) => any;
//# sourceMappingURL=decorator.d.ts.map