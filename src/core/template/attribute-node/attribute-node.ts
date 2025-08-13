import { WebComponent } from 'src';
import { attrPrefix } from '../string-template/string-template.constants';
import { getAttributes } from '../string-template/string-template.helper';
import { TemplateAttribute, TemplateAttributeType } from '../string-template/string-template.interface';
import { BooleanAttributeNode } from './boolean-node/boolean-node';
import { EventAttributeNode } from './event-node/event-node';
import { PropertyAttributeNode } from './property-node/property-node';

export class AttributeNode {
    /** to hold html element */
    #element!: HTMLElement;

    /** to hold root element */
    readonly #root!: WebComponent;

    /** to hold attributes node */
    #childAttributeNode: (PropertyAttributeNode | EventAttributeNode | BooleanAttributeNode)[] = [];

    constructor(element: HTMLElement, root: WebComponent) {
        this.#element = element;
        this.#root = root;
    }

    get childAttributeNode(): (PropertyAttributeNode | EventAttributeNode | BooleanAttributeNode)[] {
        return this.#childAttributeNode;
    }

    /** handles rendering the attributes */
    render(values: unknown[], startingIndex: number): number {
        if (!this.#childAttributeNode.length) {
            return this.attributesHanlder(values, startingIndex);
        }

        this.childAttributeNode.forEach((node) => {
            if (node instanceof EventAttributeNode) {
                startingIndex++;
                return;
            }
            switch (true) {
                case node instanceof PropertyAttributeNode:
                    startingIndex += node.render(values, startingIndex);
                    break;
                case node instanceof BooleanAttributeNode:
                    node.render(values[startingIndex++]);
                    break;
            }
        });
        return startingIndex;
    }

    private attributesHanlder(values: unknown[], startingIndex: number): number {
        this.#element
            .getAttributeNames()
            .filter((name) => name.startsWith(attrPrefix))
            .forEach((name) => {
                const attrStringValue = this.#element.getAttribute(name);
                const attrDetails = getAttributes(name, attrStringValue);
                this.#element.removeAttribute(name);
                const [attrNode, index] = this.createAttributeNode(this.#element, attrDetails, values, startingIndex);
                startingIndex = index;
                this.#childAttributeNode.push(attrNode);
            });

        return startingIndex;
    }

    /** add value to the template, after determining */
    private createAttributeNode(
        node: HTMLElement,
        attrValue: TemplateAttribute,
        value: unknown[],
        startingIndex: number
    ): [PropertyAttributeNode | EventAttributeNode | BooleanAttributeNode, number] {
        let attributes!: PropertyAttributeNode | EventAttributeNode | BooleanAttributeNode;
        const { name, type } = attrValue;

        switch (type) {
            case TemplateAttributeType.PropertyAttribute:
                attributes = new PropertyAttributeNode(node, attrValue);
                startingIndex += attributes.render(value, startingIndex);
                break;
            case TemplateAttributeType.BooleanAttribute:
                attributes = new BooleanAttributeNode(node, name);
                attributes.render(value[startingIndex++]);
                break;
            case TemplateAttributeType.EventAttribute:
                attributes = new EventAttributeNode(node, this.#root, name, value[startingIndex++]);
                break;
        }

        return [attributes, startingIndex];
    }
}
