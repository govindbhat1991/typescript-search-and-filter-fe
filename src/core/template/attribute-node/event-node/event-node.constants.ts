import { Class, InstanceOf } from '../../../interfaces/generic.interface';
import { WebComponent } from '../../../web-component/web-component';

interface EventListener {
    element: HTMLElement;
    event: string;
    eventMethod: (event: any) => void;
}

/** to store event listener details */
const eventListener = new WeakMap<Class<WebComponent>, EventListener[]>();

export const getComponentEventListener = <T extends WebComponent>(
    targetClass: Class<T>
): EventListener[] | undefined => {
    return eventListener.get(targetClass);
};

export const setComponentEventListener = <T extends WebComponent>(
    targetInstance: InstanceOf<T>,
    element: HTMLElement,
    event: string,
    eventMethod: (event: any) => void
): void => {
    const targetClass: Class = targetInstance.constructor as Class<T>;
    const eventData = getComponentEventListener(targetClass);

    if (!eventData || !eventData.length) {
        eventListener.set(targetClass, [{ element, event, eventMethod }]);
    } else {
        eventData.push({ element, event, eventMethod });
        eventListener.set(targetClass, eventData);
    }
    element.addEventListener(event, eventMethod, { capture: false });
};

export const deleteAllComponentEventListener = <T extends WebComponent>(targetInstance: InstanceOf<T>): void => {
    const targetClass: Class = targetInstance.constructor as Class<T>;
    const eventData = getComponentEventListener(targetClass);

    if (eventData && eventData.length) {
        eventData.forEach(({ element, event, eventMethod }) => {
            element.removeEventListener(event, eventMethod, { capture: false });
        });
        eventListener.delete(targetClass);
    }
};

export const deleteComponentEventListener = <T extends WebComponent>(
    targetInstance: InstanceOf<T>,
    element: HTMLElement,
    event: string,
    eventMethod: (event: any) => void
): void => {
    const targetClass: Class = targetInstance.constructor as Class<T>;
    let eventData = getComponentEventListener(targetClass);

    if (eventData && eventData.length) {
        eventData = eventData.filter(({ element: ele, event: evnt, eventMethod: evntMthd }) => {
            return !(element === ele && event === evnt && eventMethod === evntMthd);
        });
        element.removeEventListener(event, eventMethod, { capture: false });
        eventListener.set(targetClass, eventData);
    }
};
