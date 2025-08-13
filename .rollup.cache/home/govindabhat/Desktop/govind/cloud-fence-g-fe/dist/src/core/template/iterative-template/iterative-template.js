var _IterativeTemplate_startNode, _IterativeTemplate_endNode, _IterativeTemplate_root;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { StringTemplate } from '../string-template/string-template';
import { getTemplate } from '../string-template/string-template.helper';
import { createMarker, insertNode, removeNode } from '../template.helpers';
import { IterativeTemplateAbstract } from './iterative-template.abstract';
export class IterativeTemplate extends IterativeTemplateAbstract {
    constructor(startNode, endNode = null, root) {
        super();
        /** hold the detail of the starting node of the component */
        _IterativeTemplate_startNode.set(this, void 0);
        /** hold the detail of the ending node of the component */
        _IterativeTemplate_endNode.set(this, void 0);
        /** to hold child nodes */
        Object.defineProperty(this, "childNodes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /** to hold root element */
        _IterativeTemplate_root.set(this, void 0);
        __classPrivateFieldSet(this, _IterativeTemplate_startNode, startNode, "f");
        __classPrivateFieldSet(this, _IterativeTemplate_endNode, endNode, "f");
        __classPrivateFieldSet(this, _IterativeTemplate_root, root, "f");
    }
    get parentNode() {
        return __classPrivateFieldGet(this, _IterativeTemplate_startNode, "f").parentNode;
    }
    get startNode() {
        return __classPrivateFieldGet(this, _IterativeTemplate_startNode, "f");
    }
    get endNode() {
        return __classPrivateFieldGet(this, _IterativeTemplate_endNode, "f");
    }
    /** render iterative template values */
    render(results) {
        const templateResults = results;
        if (!templateResults.length) {
            removeNode(this.startNode.nextSibling, this.endNode);
            this.childNodes = [];
            return;
        }
        let childNode;
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
            const nextSibling = childNode.endNode.nextSibling;
            const lastChild = childNode.startNode.parentNode?.lastChild;
            removeNode(nextSibling, lastChild);
            this.childNodes.length = nodeIndex;
        }
    }
    createChild(templateResult, endNode) {
        let childNode;
        const lastChild = this.parentNode?.lastChild;
        const insertMarker = () => insertNode(createMarker(), lastChild, endNode);
        childNode = new StringTemplate(insertMarker(), insertMarker(), __classPrivateFieldGet(this, _IterativeTemplate_root, "f"));
        childNode.render(templateResult);
        return childNode;
    }
}
_IterativeTemplate_startNode = new WeakMap(), _IterativeTemplate_endNode = new WeakMap(), _IterativeTemplate_root = new WeakMap();
//# sourceMappingURL=iterative-template.js.map