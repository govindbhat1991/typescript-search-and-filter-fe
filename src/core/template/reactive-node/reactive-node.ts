import { isPrimitive } from 'src/core/utils/value-type.utils';
import { documentObject, nothing } from '../template.constants';
import { insertNode, removeNode } from '../template.helpers';

export class ReactiveNode {
    /** hold the detail of the starting node of the component */
    #startNode!: ChildNode;

    /** to hold current node details */
    #currentNode!: Node;

    /** hold the detail of the ending node of the component */
    #endNode: ChildNode | null;

    /** hold the detail of the parent */
    #renderedInstance: unknown = nothing;

    constructor(startNode: ChildNode, endNode: ChildNode | null = null) {
        this.#startNode = startNode;
        this.#endNode = endNode || startNode.nextSibling;
    }

    get parentNode(): Node {
        return this.startNode.parentNode!;
    }

    get startNode(): ChildNode {
        return this.#startNode;
    }

    get currentNode(): Node {
        return this.#currentNode;
    }

    get endNode(): ChildNode | null {
        return this.#endNode;
    }

    /** handles rendering the templates */
    render(value: unknown): void {
        switch (true) {
            case isPrimitive(value):
                this.addTextNode(value);
                break;
            case value === null || value === undefined:
                removeNode(this.startNode!.nextSibling, this.endNode);
                break;
            default:
                this.addTextNode(value);
        }
    }

    /** check if value is not equal to the already rendered value */
    private isValueChanged(value: unknown): boolean {
        return this.#renderedInstance !== value;
    }

    /** handle node value */
    private addNode(value: Node): void {
        if (!this.isValueChanged(value)) {
            return;
        }
        removeNode(this.startNode!.nextSibling, this.endNode);
        if (value !== null || value !== undefined) {
            this.#currentNode = insertNode(value, this.startNode, this.endNode ?? this.startNode.nextSibling);
        }
    }

    /** handle text value */
    private addTextNode(value: unknown): void {
        if (!this.isValueChanged(value)) {
            return;
        }

        if (this.#renderedInstance === nothing) {
            this.addNode(documentObject.createTextNode(value as string));
            this.#renderedInstance = value;
            return;
        }

        (this.currentNode as Text).data = value as string;
        this.#renderedInstance = value;
    }
}
