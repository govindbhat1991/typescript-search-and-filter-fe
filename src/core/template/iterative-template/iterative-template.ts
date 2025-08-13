import { WebComponent } from '../../web-component/web-component';
import { TemplateResult } from '../html-literal/html-literal.interface';
import { StringTemplate } from '../string-template/string-template';
import { getTemplate } from '../string-template/string-template.helper';
import { createMarker, insertNode, removeNode } from '../template.helpers';
import { IterativeTemplateAbstract } from './iterative-template.abstract';

export class IterativeTemplate extends IterativeTemplateAbstract {
    /** hold the detail of the starting node of the component */
    #startNode!: ChildNode;

    /** hold the detail of the ending node of the component */
    #endNode: ChildNode | null;

    /** to hold child nodes */
    childNodes: StringTemplate[] = [];

    /** to hold root element */
    readonly #root!: WebComponent;

    constructor(startNode: ChildNode, endNode: ChildNode | null = null, root: WebComponent) {
        super();
        this.#startNode = startNode;
        this.#endNode = endNode;
        this.#root = root;
    }

    get parentNode(): Node {
        return this.#startNode.parentNode!;
    }

    get startNode(): ChildNode {
        return this.#startNode;
    }

    get endNode(): ChildNode | null {
        return this.#endNode;
    }

    /** render iterative template values */
    render(results: unknown) {
        const templateResults = results as TemplateResult[];
        if (!templateResults.length) {
            removeNode(this.startNode.nextSibling, this.endNode);
            this.childNodes = [];
            return;
        }

        let childNode: StringTemplate | undefined;
        let nodeIndex = 0;

        templateResults.forEach((templateResult, index) => {
            /** tracking childNode so that, we could remove the sibling nodes from dom, if no scope */
            childNode = this.childNodes[index];
            nodeIndex++;
            const template = getTemplate(templateResult.strings);

            switch (true) {
                /** no changes in template; only value change */
                case childNode?.template === template:
                    childNode.render(templateResult);
                    return;
                /** create new node template */
                case index > this.childNodes.length - 1:
                    childNode = this.createChild(templateResult);
                    this.childNodes.push(childNode);
                    return;
                /** template string changes */
                case !!childNode && !!childNode.startNode && !!childNode.endNode:
                    const { startNode, endNode } = childNode;
                    removeNode(startNode.nextSibling, endNode.nextSibling);
                    childNode = this.createChild(templateResult, startNode);
                    startNode.remove();
                    this.childNodes.splice(index, 1, childNode);
                    return;
            }
        });

        /** delete template */
        if (childNode && nodeIndex < this.childNodes.length) {
            const nextSibling = (childNode.endNode as ChildNode).nextSibling;
            const lastChild = childNode.startNode.parentNode?.lastChild as ChildNode;
            removeNode(nextSibling, lastChild);
            this.childNodes.length = nodeIndex;
        }
    }

    protected createChild(templateResult: TemplateResult, endNode?: ChildNode): StringTemplate {
        let childNode: StringTemplate;
        const lastChild = this.parentNode?.lastChild as ChildNode;
        const insertMarker = () => insertNode(createMarker(), lastChild, endNode);
        childNode = new StringTemplate(insertMarker(), insertMarker(), this.#root);
        childNode.render(templateResult);
        return childNode;
    }
}
