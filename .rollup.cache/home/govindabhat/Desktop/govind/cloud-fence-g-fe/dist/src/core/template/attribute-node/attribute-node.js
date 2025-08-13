var _AttributeNode_element, _AttributeNode_root, _AttributeNode_childAttributeNode;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { attrPrefix } from '../string-template/string-template.constants';
import { getAttributes } from '../string-template/string-template.helper';
import { TemplateAttributeType } from '../string-template/string-template.interface';
import { BooleanAttributeNode } from './boolean-node/boolean-node';
import { EventAttributeNode } from './event-node/event-node';
import { PropertyAttributeNode } from './property-node/property-node';
export class AttributeNode {
    constructor(element, root) {
        /** to hold html element */
        _AttributeNode_element.set(this, void 0);
        /** to hold root element */
        _AttributeNode_root.set(this, void 0);
        /** to hold attributes node */
        _AttributeNode_childAttributeNode.set(this, []);
        __classPrivateFieldSet(this, _AttributeNode_element, element, "f");
        __classPrivateFieldSet(this, _AttributeNode_root, root, "f");
    }
    get childAttributeNode() {
        return __classPrivateFieldGet(this, _AttributeNode_childAttributeNode, "f");
    }
    /** handles rendering the attributes */
    render(values, startingIndex) {
        if (!__classPrivateFieldGet(this, _AttributeNode_childAttributeNode, "f").length) {
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
    attributesHanlder(values, startingIndex) {
        __classPrivateFieldGet(this, _AttributeNode_element, "f")
            .getAttributeNames()
            .filter((name) => name.startsWith(attrPrefix))
            .forEach((name) => {
            const attrStringValue = __classPrivateFieldGet(this, _AttributeNode_element, "f").getAttribute(name);
            const attrDetails = getAttributes(name, attrStringValue);
            __classPrivateFieldGet(this, _AttributeNode_element, "f").removeAttribute(name);
            const [attrNode, index] = this.createAttributeNode(__classPrivateFieldGet(this, _AttributeNode_element, "f"), attrDetails, values, startingIndex);
            startingIndex = index;
            __classPrivateFieldGet(this, _AttributeNode_childAttributeNode, "f").push(attrNode);
        });
        return startingIndex;
    }
    /** add value to the template, after determining */
    createAttributeNode(node, attrValue, value, startingIndex) {
        let attributes;
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
                attributes = new EventAttributeNode(node, __classPrivateFieldGet(this, _AttributeNode_root, "f"), name, value[startingIndex++]);
                break;
        }
        return [attributes, startingIndex];
    }
}
_AttributeNode_element = new WeakMap(), _AttributeNode_root = new WeakMap(), _AttributeNode_childAttributeNode = new WeakMap();
//# sourceMappingURL=attribute-node.js.map