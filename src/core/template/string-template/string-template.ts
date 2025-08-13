import { isIterable, isPrimitive } from 'src/core/utils/value-type.utils';
import { WebComponent } from '../../web-component/web-component';
import { AttributeNode } from '../attribute-node/attribute-node';
import { TemplateResult } from '../html-literal/html-literal.interface';
import { IterativeTemplate } from '../iterative-template/iterative-template';
import { ReactiveNode } from '../reactive-node/reactive-node';
import { documentObject, fragmentRender } from '../template.constants';
import { removeNode } from '../template.helpers';
import { markerMatch } from './string-template.constants';
import { getTemplate, hasValueTypeChanged } from './string-template.helper';
import { templateTreeWalker } from 'src/core/utils/treewalker.utlis';

export class StringTemplate {
    /** hold the detail of the starting node of the component */
    #startNode!: ChildNode;

    /** hold the detail of the ending node of the component */
    #endNode: ChildNode | null;

    /** to hold template */
    #template: HTMLTemplateElement | undefined;

    /** to hold root element */
    readonly #root!: WebComponent;

    /** to hold child nodes */
    #childNodes: (StringTemplate | IterativeTemplate | ReactiveNode | AttributeNode)[] = [];

    constructor(startNode: ChildNode, endNode: ChildNode | null = null, root: WebComponent) {
        this.#startNode = startNode;
        this.#endNode = endNode || this.#startNode.nextSibling;
        this.#root = root;
    }

    get startNode(): ChildNode {
        return this.#startNode;
    }

    get parentNode(): ParentNode {
        return this.#startNode.parentNode!;
    }

    get endNode(): ChildNode | null {
        return this.#endNode;
    }

    get childNodes(): (StringTemplate | IterativeTemplate | ReactiveNode | AttributeNode)[] {
        return this.#childNodes;
    }

    get template(): HTMLTemplateElement | undefined {
        return this.#template;
    }

    render(result: unknown): void {
        const { strings, values } = result as TemplateResult;
        const templateString = getTemplate(strings);

        if (this.#template !== templateString || !this.#childNodes.length) {
            this.#template = templateString;
            this.#childNodes = [];
            removeNode(this.startNode.nextSibling, this.endNode);
            const fragment = this.valueMapping(this.#template.content, values);
            fragmentRender.push({
                value: fragment,
                parentNode: this.parentNode,
                endNode: this.endNode,
            });
            return;
        }

        /** if no template change happended */
        let index = 0;
        this.#childNodes = this.#childNodes.map((node) => {
            const isAttributesType = node instanceof AttributeNode;

            /** when type of the value changed */
            if (hasValueTypeChanged(node, values[index]) && !isAttributesType) {
                removeNode(node.startNode!.nextSibling, node.endNode);
                return this.createTemplateNode(node.startNode as HTMLElement, values[index++]);
            }

            if (isAttributesType) {
                index = node.render(values, index);
            } else {
                node.render(values[index]);
                index++;
            }
            return node;
        });
    }

    /** start mapping the value to the template */
    private valueMapping(content: DocumentFragment, values: unknown[]): DocumentFragment {
        const fragment = documentObject.importNode(content, true);

        // @TODO, re visit on this value indexing, to find a better approch
        let index = 0;
        return templateTreeWalker(fragment).forEach((node) => {
            const element = node as HTMLElement;

            switch (true) {
                /** if current node a attribute node */
                case element.nodeType === 1 && element.hasAttributes():
                    const attributeNode = new AttributeNode(element, this.#root);
                    index = attributeNode.render(values, index);
                    this.#childNodes.push(attributeNode);
                    break;
                /** if current node a marker comment node */
                case element.nodeType === 8 && element.nodeValue === markerMatch:
                    const childNode = this.createTemplateNode(element, values[index++]);
                    this.#childNodes.push(childNode);
                    break;
            }
        });
    }

    /** add value to the template, after determining */
    private createTemplateNode(node: HTMLElement, value: unknown): StringTemplate | ReactiveNode | IterativeTemplate {
        switch (true) {
            case (value as TemplateResult)?.strings !== undefined:
                const template = new StringTemplate(node, node.nextSibling, this.#root);
                template.render(value as TemplateResult);
                return template;
            case isIterable(value):
                const iterativeTemplate = new IterativeTemplate(node, null, this.#root);
                iterativeTemplate.render(value as unknown as TemplateResult[]);
                return iterativeTemplate;
            case isPrimitive(value):
            default:
                const primitiveNode = new ReactiveNode(node);
                primitiveNode.render(value);
                return primitiveNode;
        }
    }
}
