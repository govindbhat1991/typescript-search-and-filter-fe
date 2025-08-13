var _StringTemplate_startNode, _StringTemplate_endNode, _StringTemplate_template, _StringTemplate_root, _StringTemplate_childNodes;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { isIterable, isPrimitive } from 'src/core/utils/value-type.utils';
import { AttributeNode } from '../attribute-node/attribute-node';
import { IterativeTemplate } from '../iterative-template/iterative-template';
import { ReactiveNode } from '../reactive-node/reactive-node';
import { documentObject, fragmentRender } from '../template.constants';
import { removeNode } from '../template.helpers';
import { markerMatch } from './string-template.constants';
import { getTemplate, hasValueTypeChanged } from './string-template.helper';
import { templateTreeWalker } from 'src/core/utils/treewalker.utlis';
export class StringTemplate {
    constructor(startNode, endNode = null, root) {
        /** hold the detail of the starting node of the component */
        _StringTemplate_startNode.set(this, void 0);
        /** hold the detail of the ending node of the component */
        _StringTemplate_endNode.set(this, void 0);
        /** to hold template */
        _StringTemplate_template.set(this, void 0);
        /** to hold root element */
        _StringTemplate_root.set(this, void 0);
        /** to hold child nodes */
        _StringTemplate_childNodes.set(this, []);
        __classPrivateFieldSet(this, _StringTemplate_startNode, startNode, "f");
        __classPrivateFieldSet(this, _StringTemplate_endNode, endNode || __classPrivateFieldGet(this, _StringTemplate_startNode, "f").nextSibling, "f");
        __classPrivateFieldSet(this, _StringTemplate_root, root, "f");
    }
    get startNode() {
        return __classPrivateFieldGet(this, _StringTemplate_startNode, "f");
    }
    get parentNode() {
        return __classPrivateFieldGet(this, _StringTemplate_startNode, "f").parentNode;
    }
    get endNode() {
        return __classPrivateFieldGet(this, _StringTemplate_endNode, "f");
    }
    get childNodes() {
        return __classPrivateFieldGet(this, _StringTemplate_childNodes, "f");
    }
    get template() {
        return __classPrivateFieldGet(this, _StringTemplate_template, "f");
    }
    render(result) {
        const { strings, values } = result;
        const templateString = getTemplate(strings);
        if (__classPrivateFieldGet(this, _StringTemplate_template, "f") !== templateString || !__classPrivateFieldGet(this, _StringTemplate_childNodes, "f").length) {
            __classPrivateFieldSet(this, _StringTemplate_template, templateString, "f");
            __classPrivateFieldSet(this, _StringTemplate_childNodes, [], "f");
            removeNode(this.startNode.nextSibling, this.endNode);
            const fragment = this.valueMapping(__classPrivateFieldGet(this, _StringTemplate_template, "f").content, values);
            fragmentRender.push({
                value: fragment,
                parentNode: this.parentNode,
                endNode: this.endNode,
            });
            return;
        }
        /** if no template change happended */
        let index = 0;
        __classPrivateFieldSet(this, _StringTemplate_childNodes, __classPrivateFieldGet(this, _StringTemplate_childNodes, "f").map((node) => {
            const isAttributesType = node instanceof AttributeNode;
            /** when type of the value changed */
            if (hasValueTypeChanged(node, values[index]) && !isAttributesType) {
                removeNode(node.startNode.nextSibling, node.endNode);
                return this.createTemplateNode(node.startNode, values[index++]);
            }
            if (isAttributesType) {
                index = node.render(values, index);
            }
            else {
                node.render(values[index]);
                index++;
            }
            return node;
        }), "f");
    }
    /** start mapping the value to the template */
    valueMapping(content, values) {
        const fragment = documentObject.importNode(content, true);
        // @TODO, re visit on this value indexing, to find a better approch
        let index = 0;
        return templateTreeWalker(fragment).forEach((node) => {
            const element = node;
            switch (true) {
                /** if current node a attribute node */
                case element.nodeType === 1 && element.hasAttributes():
                    const attributeNode = new AttributeNode(element, __classPrivateFieldGet(this, _StringTemplate_root, "f"));
                    index = attributeNode.render(values, index);
                    __classPrivateFieldGet(this, _StringTemplate_childNodes, "f").push(attributeNode);
                    break;
                /** if current node a marker comment node */
                case element.nodeType === 8 && element.nodeValue === markerMatch:
                    const childNode = this.createTemplateNode(element, values[index++]);
                    __classPrivateFieldGet(this, _StringTemplate_childNodes, "f").push(childNode);
                    break;
            }
        });
    }
    /** add value to the template, after determining */
    createTemplateNode(node, value) {
        switch (true) {
            case value?.strings !== undefined:
                const template = new StringTemplate(node, node.nextSibling, __classPrivateFieldGet(this, _StringTemplate_root, "f"));
                template.render(value);
                return template;
            case isIterable(value):
                const iterativeTemplate = new IterativeTemplate(node, null, __classPrivateFieldGet(this, _StringTemplate_root, "f"));
                iterativeTemplate.render(value);
                return iterativeTemplate;
            case isPrimitive(value):
            default:
                const primitiveNode = new ReactiveNode(node);
                primitiveNode.render(value);
                return primitiveNode;
        }
    }
}
_StringTemplate_startNode = new WeakMap(), _StringTemplate_endNode = new WeakMap(), _StringTemplate_template = new WeakMap(), _StringTemplate_root = new WeakMap(), _StringTemplate_childNodes = new WeakMap();
//# sourceMappingURL=string-template.js.map