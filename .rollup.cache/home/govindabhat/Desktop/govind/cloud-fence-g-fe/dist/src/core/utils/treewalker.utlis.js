import { documentObject } from '../template/template.constants';
/**
 * tree walker helper function
 * @param fragment, document that needed to be walk through
 */
export const templateTreeWalker = (fragment) => {
    const walker = documentObject.createTreeWalker(documentObject, 129);
    walker.currentNode = fragment;
    let node;
    let treewalkerIndex = 0;
    return {
        forEach: (fn) => {
            while ((node = walker.nextNode()) !== null) {
                fn(node, treewalkerIndex++, fragment);
            }
            return fragment;
        },
    };
};
//# sourceMappingURL=treewalker.utlis.js.map