import { InjectionToken } from '../injector/injection-token';
import { Metadata } from '../metadata/metadata';
/** Input, Output etc Decorates a web component class property and generates custom event metadata based on given property key. */
export const Input = (key = '') => (target, propertyKey) => {
    Metadata.setComponentInputMetadata(target, propertyKey, key);
};
export const Output = () => (target, propertyKey) => {
    Metadata.setComponentOutputMetadata(target, propertyKey);
};
export const Watch = () => (target, propertyKey) => {
    Metadata.setComponentWatchMetadata(target, propertyKey);
};
/** Decorates a component class that extends WebComponent class and generates metadata on given class as customized component. */
export const Component = (componentConfig) => (target) => {
    Metadata.setComponentConfigMetadata(target, componentConfig);
};
/** Decorates a module class and generates metadata on given class as module. */
export const Module = (moduleConfig) => (target) => {
    Metadata.setModuleConfigMetadata(target, moduleConfig);
};
/**
 * Decorates a provider class and generates metadata on given class as provider.
 * @param providerConfig
 */
export const Injectable = (providerConfig) => (target) => {
    Metadata.setProviderConfigMetadata(target, providerConfig || { providedIn: 'root' });
};
/**
 * Decorates a constructor parameter and generates metadata on class that injects the provider with given token.
 * @param token
 */
export const Inject = (token) => (target, _propertyKey, parameterIndex) => {
    const tokenValue = token ? token : new InjectionToken('test');
    Metadata.setInjectMetadata(target, parameterIndex, tokenValue);
};
//# sourceMappingURL=decorator.js.map