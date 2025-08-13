/** `@Output` decorator helper function; this can be used outside web component to access `@Output` data */
export const output = (element) => {
    /** to store event listener details */
    const eventListener = new WeakMap();
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
const getCustomEventListener = (eventListener, element) => {
    return eventListener.get(element);
};
const setCustomEventListener = (eventListener, element, event, eventMethod) => {
    const eventData = getCustomEventListener(eventListener, element);
    if (!eventData || !eventData.length) {
        eventListener.set(element, [{ event, eventMethod }]);
    }
    else {
        eventData.push({ event, eventMethod });
        eventListener.set(element, eventData);
    }
    element.addEventListener(event, eventMethod, { capture: false });
};
const deleteAllCustomEventListener = (eventListener, element) => {
    const eventData = getCustomEventListener(eventListener, element);
    if (eventData && eventData.length) {
        eventData.forEach(({ event, eventMethod }) => {
            element.removeEventListener(event, eventMethod, { capture: false });
        });
        eventListener.delete(element);
    }
};
const deleteCustomEventListener = (eventListener, element, event) => {
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
//# sourceMappingURL=event-emitters.utlis.js.map