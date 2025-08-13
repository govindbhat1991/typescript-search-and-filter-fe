interface CustomEventListener {
    event: string;
    eventMethod: (event: any) => void;
}

interface CustomEventListenerMethods {
    subscribe: (event: string, eventMethod: (event: any) => void) => void;
    unsubscribe: (event?: string) => void;
}

type CustomEventListenerType = (element: HTMLElement) => CustomEventListenerMethods;

/** `@Output` decorator helper function; this can be used outside web component to access `@Output` data */
export const output: CustomEventListenerType = (element) => {
    /** to store event listener details */
    const eventListener = new WeakMap<HTMLElement, CustomEventListener[]>();

    return {
        subscribe: (event, eventMethod) => {
            setCustomEventListener(eventListener, element, event, eventMethod);
        },
        unsubscribe: (event) => {
            if (event) {
                deleteCustomEventListener(eventListener, element, event);
                return;
            }
            deleteAllCustomEventListener(eventListener, element);
        },
    };
};

const getCustomEventListener = (
    eventListener: WeakMap<HTMLElement, CustomEventListener[]>,
    element: HTMLElement
): CustomEventListener[] | undefined => {
    return eventListener.get(element);
};

const setCustomEventListener = (
    eventListener: WeakMap<HTMLElement, CustomEventListener[]>,
    element: HTMLElement,
    event: string,
    eventMethod: (event: any) => void
): void => {
    const eventData = getCustomEventListener(eventListener, element);

    if (!eventData || !eventData.length) {
        eventListener.set(element, [{ event, eventMethod }]);
    } else {
        eventData.push({ event, eventMethod });
        eventListener.set(element, eventData);
    }
    element.addEventListener(event, eventMethod, { capture: false });
};

const deleteAllCustomEventListener = (
    eventListener: WeakMap<HTMLElement, CustomEventListener[]>,
    element: HTMLElement
): void => {
    const eventData = getCustomEventListener(eventListener, element);

    if (eventData && eventData.length) {
        eventData.forEach(({ event, eventMethod }) => {
            element.removeEventListener(event, eventMethod, { capture: false });
        });
        eventListener.delete(element);
    }
};

const deleteCustomEventListener = (
    eventListener: WeakMap<HTMLElement, CustomEventListener[]>,
    element: HTMLElement,
    event: string
): void => {
    let eventDatas = getCustomEventListener(eventListener, element);

    if (eventDatas && eventDatas.length) {
        eventDatas = eventDatas.filter(({ event: evnt }) => !(event === evnt));
        const eventData = eventDatas.find(({ event: evnt }) => event === evnt);
        if (!eventData) {
            return;
        }
        const { eventMethod } = eventData;
        element.removeEventListener(event, eventMethod, { capture: false });
        eventListener.set(element, eventDatas);
    }
};
