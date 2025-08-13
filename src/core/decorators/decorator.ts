import { InjectionToken } from '../injector/injection-token';
import { Class, InstanceOf } from '../interfaces/generic.interface';
import { Metadata } from '../metadata/metadata';
import { WebComponent } from '../web-component/web-component';
import {
    ClassDecorator,
    ComponentConfig,
    ComponentDecorator,
    ModuleConfig,
    // ParameterDecorator,
    PropertyDecorator,
    ProviderConfig,
} from './decorators.interface';

/** Input, Output etc Decorates a web component class property and generates custom event metadata based on given property key. */
export const Input =
    <T extends WebComponent>(key = ''): PropertyDecorator<T> =>
    (target, propertyKey) => {
        Metadata.setComponentInputMetadata(target, propertyKey, key);
    };

export const Output =
    <T extends WebComponent>(): PropertyDecorator<T> =>
    (target: InstanceOf<T>, propertyKey: string) => {
        Metadata.setComponentOutputMetadata(target, propertyKey);
    };

export const Watch =
    <T extends WebComponent>(): PropertyDecorator<T> =>
    (target, propertyKey) => {
        Metadata.setComponentWatchMetadata(target, propertyKey);
    };

/** Decorates a component class that extends WebComponent class and generates metadata on given class as customized component. */
export const Component =
    <T extends WebComponent>(componentConfig: ComponentConfig): ComponentDecorator<T> =>
    (target: Class<T>) => {
        Metadata.setComponentConfigMetadata(target, componentConfig);
    };

/** Decorates a module class and generates metadata on given class as module. */
export const Module =
    (moduleConfig: ModuleConfig): ClassDecorator =>
    (target: Class) => {
        Metadata.setModuleConfigMetadata(target, moduleConfig);
    };

/**
 * Decorates a provider class and generates metadata on given class as provider.
 * @param providerConfig
 */
export const Injectable =
    (providerConfig?: ProviderConfig): ClassDecorator =>
    (target: Class) => {
        Metadata.setProviderConfigMetadata(target, providerConfig || { providedIn: 'root' });
    };

/**
 * Decorates a constructor parameter and generates metadata on class that injects the provider with given token.
 * @param token
 */
export const Inject =
    (token?: InjectionToken): any =>
    (target: any, _propertyKey: any, parameterIndex: any) => {
        const tokenValue = token ? token : new InjectionToken('test');
        Metadata.setInjectMetadata(target, parameterIndex, tokenValue);
    };
