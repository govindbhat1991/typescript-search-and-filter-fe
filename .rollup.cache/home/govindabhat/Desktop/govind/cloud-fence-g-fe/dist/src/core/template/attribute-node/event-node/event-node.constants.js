/** to store event listener details */
const eventListener = new WeakMap();
export const getComponentEventListener = (targetClass) => {
    return eventListener.get(targetClass);
};
export const setComponentEventListener = (targetInstance, element, event, eventMethod) => {
    const targetClass = targetInstance.constructor;
    const eventData = getComponentEventListener(targetClass);
    if (!eventData || !eventData.length) {
        eventListener.set(targetClass, [{ element, event, eventMethod }]);
    }
    else {
        eventData.push({ element, event, eventMethod });
        eventListener.set(targetClass, eventData);
    }
    element.addEventListener(event, eventMethod, { capture: false });
};
export const deleteAllComponentEventListener = (targetInstance) => {
    const targetClass = targetInstance.constructor;
    const eventData = getComponentEventListener(targetClass);
    if (eventData && eventData.length) {
        eventData.forEach(({ element, event, eventMethod }) => {
            element.removeEventListener(event, eventMethod, { capture: false });
        });
        eventListener.delete(targetClass);
    }
};
export const deleteComponentEventListener = (targetInstance, element, event, eventMethod) => {
    const targetClass = targetInstance.constructor;
    let eventData = getComponentEventListener(targetClass);
    if (eventData && eventData.length) {
        eventData = eventData.filter(({ element: ele, event: evnt, eventMethod: evntMthd }) => {
            return !(element === ele && event === evnt && eventMethod === evntMthd);
        });
        element.removeEventListener(event, eventMethod, { capture: false });
        eventListener.set(targetClass, eventData);
    }
};
//# sourceMappingURL=event-node.constants.js.map