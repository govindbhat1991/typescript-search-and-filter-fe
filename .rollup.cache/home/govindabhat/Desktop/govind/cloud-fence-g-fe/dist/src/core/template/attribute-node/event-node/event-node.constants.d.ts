import { Class, InstanceOf } from '../../../interfaces/generic.interface';
import { WebComponent } from '../../../web-component/web-component';
interface EventListener {
    element: HTMLElement;
    event: string;
    eventMethod: (event: any) => void;
}
export declare const getComponentEventListener: <T extends WebComponent>(targetClass: Class<T>) => EventListener[] | undefined;
export declare const setComponentEventListener: <T extends WebComponent>(targetInstance: InstanceOf<T>, element: HTMLElement, event: string, eventMethod: (event: any) => void) => void;
export declare const deleteAllComponentEventListener: <T extends WebComponent>(targetInstance: InstanceOf<T>) => void;
export declare const deleteComponentEventListener: <T extends WebComponent>(targetInstance: InstanceOf<T>, element: HTMLElement, event: string, eventMethod: (event: any) => void) => void;
export {};
//# sourceMappingURL=event-node.constants.d.ts.map