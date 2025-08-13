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
export declare const templateTreeWalker: TemplateTreeWalker;
export {};
//# sourceMappingURL=treewalker.utlis.d.ts.map