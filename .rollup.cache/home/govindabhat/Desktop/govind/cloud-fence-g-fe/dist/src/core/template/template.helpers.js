import { documentObject } from './template.constants';
/** Creates a dynamic marker. */
export const createMarker = () => documentObject.createComment('');
/** insert node */
export const insertNode = (node, startNode, endNode = null) => {
    return startNode.parentNode.insertBefore(node, endNode);
};
/** remove node */
export const removeNode = (start, endNode) => {
    while (start && start !== endNode) {
        const n = start.nextSibling;
        start.remove();
        start = n;
    }
};
//# sourceMappingURL=template.helpers.js.map