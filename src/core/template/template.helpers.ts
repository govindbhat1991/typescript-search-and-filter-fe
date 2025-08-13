import { documentObject } from './template.constants';

/** Creates a dynamic marker. */
export const createMarker = () => documentObject.createComment('');

/** insert node */
export const insertNode = <T extends Node>(node: T, startNode: Node, endNode: Node | null = null) => {
    return startNode.parentNode!.insertBefore(node, endNode);
};

/** remove node */
export const removeNode = (start: ChildNode | null, endNode: ChildNode | null): void => {
    while (start && start !== endNode) {
        const n = start!.nextSibling;
        (start! as Element).remove();
        start = n;
    }
};
