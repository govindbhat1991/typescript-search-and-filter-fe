var _Template_startNode, _Template_endNode, _Template_renderedValue, _Template_rootTemplate, _Template_root;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { isPrimitive } from 'src/core/utils/value-type.utils';
import { StringTemplate } from './string-template/string-template';
import { getTemplate } from './string-template/string-template.helper';
import { documentObject, fragmentRender, nothing } from './template.constants';
import { createMarker, removeNode } from './template.helpers';
export class Template {
    constructor(startNode, endNode = null, root) {
        /** hold the detail of the starting node of the component */
        _Template_startNode.set(this, void 0);
        /** hold the detail of the ending node of the component */
        _Template_endNode.set(this, void 0);
        /** to hold value, if Template Result is string */
        _Template_renderedValue.set(this, nothing);
        /** to hold root child template */
        _Template_rootTemplate.set(this, void 0);
        /** to hold root element */
        _Template_root.set(this, void 0);
        __classPrivateFieldSet(this, _Template_startNode, startNode, "f");
        __classPrivateFieldSet(this, _Template_endNode, endNode, "f");
        __classPrivateFieldSet(this, _Template_root, root, "f");
    }
    get rootTemplate() {
        return __classPrivateFieldGet(this, _Template_rootTemplate, "f");
    }
    /** start rendering template as per the template result input */
    renderTemplateFragment(result) {
        if (!result) {
            __classPrivateFieldSet(this, _Template_rootTemplate, undefined, "f");
            removeNode(__classPrivateFieldGet(this, _Template_startNode, "f"), __classPrivateFieldGet(this, _Template_endNode, "f"));
            return;
        }
        if (isPrimitive(result)) {
            __classPrivateFieldSet(this, _Template_rootTemplate, undefined, "f");
            removeNode(__classPrivateFieldGet(this, _Template_startNode, "f"), __classPrivateFieldGet(this, _Template_endNode, "f"));
            if (__classPrivateFieldGet(this, _Template_renderedValue, "f") === result) {
                return;
            }
            __classPrivateFieldGet(this, _Template_root, "f").renderRoot.insertBefore(createMarker(), null);
            __classPrivateFieldGet(this, _Template_root, "f").renderRoot.insertBefore(documentObject.createTextNode(result), __classPrivateFieldGet(this, _Template_endNode, "f"));
            __classPrivateFieldSet(this, _Template_renderedValue, result, "f");
            return;
        }
        if (!result.values.length) {
            __classPrivateFieldSet(this, _Template_rootTemplate, undefined, "f");
            removeNode(__classPrivateFieldGet(this, _Template_startNode, "f"), __classPrivateFieldGet(this, _Template_endNode, "f"));
            const template = getTemplate(result.strings);
            if (template === __classPrivateFieldGet(this, _Template_renderedValue, "f")) {
                return;
            }
            __classPrivateFieldGet(this, _Template_root, "f").renderRoot.insertBefore(createMarker(), null);
            const fragment = documentObject.importNode(template.content, true);
            __classPrivateFieldGet(this, _Template_root, "f").renderRoot.insertBefore(fragment, __classPrivateFieldGet(this, _Template_endNode, "f"));
            __classPrivateFieldSet(this, _Template_renderedValue, template, "f");
            return;
        }
        __classPrivateFieldSet(this, _Template_renderedValue, nothing, "f");
        __classPrivateFieldSet(this, _Template_rootTemplate, __classPrivateFieldGet(this, _Template_rootTemplate, "f") ?? new StringTemplate(__classPrivateFieldGet(this, _Template_startNode, "f"), __classPrivateFieldGet(this, _Template_endNode, "f"), __classPrivateFieldGet(this, _Template_root, "f")), "f");
        __classPrivateFieldGet(this, _Template_rootTemplate, "f").render(result);
        // @TODO, what will i do with this, oh!.
        if (!fragmentRender.length) {
            return;
        }
        fragmentRender.forEach(({ value, parentNode, endNode }) => {
            parentNode.insertBefore(value, endNode);
        });
        fragmentRender.length = 0;
    }
}
_Template_startNode = new WeakMap(), _Template_endNode = new WeakMap(), _Template_renderedValue = new WeakMap(), _Template_rootTemplate = new WeakMap(), _Template_root = new WeakMap();
//# sourceMappingURL=template.js.map