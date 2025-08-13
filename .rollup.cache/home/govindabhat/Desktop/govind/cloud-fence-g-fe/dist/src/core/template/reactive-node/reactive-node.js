var _ReactiveNode_startNode, _ReactiveNode_currentNode, _ReactiveNode_endNode, _ReactiveNode_renderedInstance;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { isPrimitive } from 'src/core/utils/value-type.utils';
import { documentObject, nothing } from '../template.constants';
import { insertNode, removeNode } from '../template.helpers';
export class ReactiveNode {
    constructor(startNode, endNode = null) {
        /** hold the detail of the starting node of the component */
        _ReactiveNode_startNode.set(this, void 0);
        /** to hold current node details */
        _ReactiveNode_currentNode.set(this, void 0);
        /** hold the detail of the ending node of the component */
        _ReactiveNode_endNode.set(this, void 0);
        /** hold the detail of the parent */
        _ReactiveNode_renderedInstance.set(this, nothing);
        __classPrivateFieldSet(this, _ReactiveNode_startNode, startNode, "f");
        __classPrivateFieldSet(this, _ReactiveNode_endNode, endNode || startNode.nextSibling, "f");
    }
    get parentNode() {
        return this.startNode.parentNode;
    }
    get startNode() {
        return __classPrivateFieldGet(this, _ReactiveNode_startNode, "f");
    }
    get currentNode() {
        return __classPrivateFieldGet(this, _ReactiveNode_currentNode, "f");
    }
    get endNode() {
        return __classPrivateFieldGet(this, _ReactiveNode_endNode, "f");
    }
    /** handles rendering the templates */
    render(value) {
        switch (true) {
            case isPrimitive(value):
                this.addTextNode(value);
                break;
            case value === null || value === undefined:
                removeNode(this.startNode.nextSibling, this.endNode);
                break;
            default:
                this.addTextNode(value);
        }
    }
    /** check if value is not equal to the already rendered value */
    isValueChanged(value) {
        return __classPrivateFieldGet(this, _ReactiveNode_renderedInstance, "f") !== value;
    }
    /** handle node value */
    addNode(value) {
        if (!this.isValueChanged(value)) {
            return;
        }
        removeNode(this.startNode.nextSibling, this.endNode);
        if (value !== null || value !== undefined) {
            __classPrivateFieldSet(this, _ReactiveNode_currentNode, insertNode(value, this.startNode, this.endNode ?? this.startNode.nextSibling), "f");
        }
    }
    /** handle text value */
    addTextNode(value) {
        if (!this.isValueChanged(value)) {
            return;
        }
        if (__classPrivateFieldGet(this, _ReactiveNode_renderedInstance, "f") === nothing) {
            this.addNode(documentObject.createTextNode(value));
            __classPrivateFieldSet(this, _ReactiveNode_renderedInstance, value, "f");
            return;
        }
        this.currentNode.data = value;
        __classPrivateFieldSet(this, _ReactiveNode_renderedInstance, value, "f");
    }
}
_ReactiveNode_startNode = new WeakMap(), _ReactiveNode_currentNode = new WeakMap(), _ReactiveNode_endNode = new WeakMap(), _ReactiveNode_renderedInstance = new WeakMap();
//# sourceMappingURL=reactive-node.js.map