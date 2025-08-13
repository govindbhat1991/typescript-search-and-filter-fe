import { documentObject } from '../template/template.constants';

type TemplateTreeWalkerInput = Node | DocumentFragment | Document;

type TemplateTreeWalkerCallback = (node: Node, index: number, fragment: TemplateTreeWalkerInput) => void;

type TemplateForEach = (fn: TemplateTreeWalkerCallback) => DocumentFragment;

interface TemplateTreeWalkerMethods {
    forEach: TemplateForEach;
}

export type TemplateTreeWalker = (fragment: TemplateTreeWalkerInput) => TemplateTreeWalkerMethods;

/**
 * tree walker helper function
 * @param fragment, document that needed to be walk through
 */
export const templateTreeWalker: TemplateTreeWalker = (fragment) => {
    const walker = documentObject.createTreeWalker(documentObject, 129);
    walker.currentNode = fragment;

    let node: Node | null;
    let treewalkerIndex = 0;
    return {
        forEach: (fn: TemplateTreeWalkerCallback): DocumentFragment => {
            while ((node = walker.nextNode()) !== null) {
                fn(node, treewalkerIndex++, fragment);
            }
            return fragment as DocumentFragment;
        },
    };
};
