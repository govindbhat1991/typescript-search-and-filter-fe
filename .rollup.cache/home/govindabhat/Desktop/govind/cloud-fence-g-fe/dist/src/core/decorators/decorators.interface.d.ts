import { InjectionToken } from '../injector/injection-token';
import { Class, InstanceOf, Maybe } from '../interfaces/generic.interface';
import { WebComponent } from '../web-component/web-component';
export type PropertyDecorator<T extends WebComponent> = (target: InstanceOf<T>, propertyKey: string) => void;
export type ComponentDecorator<T extends WebComponent> = (target: Class<T>) => void;
export type MethodDecorator<T extends WebComponent> = (target: InstanceOf<T>, propertyKey: string) => void;
export type ClassDecorator = (target: Class) => void;
export type ParameterDecorator = (target: Class, propertyKey: string, parameterIndex: number) => void;
export interface ComponentConfig {
    selector: string;
    template?: string;
    style?: Maybe<string>;
}
export interface ModuleWithProviders {
    module: Class;
    providers: StaticProvider[];
}
export type StaticModule = Class | ModuleWithProviders;
export interface ModuleConfig {
    imports?: StaticModule[];
    providers?: StaticProvider[];
    components?: Class<WebComponent>[];
    exports?: StaticProvider[];
}
export interface ProviderConfig {
    providedIn: string;
}
export type DependencyToken<T = unknown> = Class<T> | InjectionToken;
export interface ValueProvider<T = unknown> {
    provide: InjectionToken;
    useValue: T;
}
export interface FactoryProvider {
    provide: InjectionToken;
    deps: DependencyToken[];
    useFactory(...dependencyInstances: unknown[]): unknown;
}
export interface ClassProvider<T = unknown> {
    provide: InjectionToken;
    useClass: Class<T>;
}
export type StaticProvider = Class | ClassProvider | FactoryProvider | ValueProvider;
//# sourceMappingURL=decorators.interface.d.ts.map