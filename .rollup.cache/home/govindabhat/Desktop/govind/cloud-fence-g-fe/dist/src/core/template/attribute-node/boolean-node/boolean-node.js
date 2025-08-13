var _BooleanAttributeNode_element, _BooleanAttributeNode_attributeName, _BooleanAttributeNode_renderedAttrValue;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { nothing } from '../../template.constants';
export class BooleanAttributeNode {
    constructor(element, attributeName) {
        /** to hold html element */
        _BooleanAttributeNode_element.set(this, void 0);
        /** attribute name */
        _BooleanAttributeNode_attributeName.set(this, void 0);
        /** to hold render attribute value */
        _BooleanAttributeNode_renderedAttrValue.set(this, nothing);
        __classPrivateFieldSet(this, _BooleanAttributeNode_element, element, "f");
        __classPrivateFieldSet(this, _BooleanAttributeNode_attributeName, attributeName, "f");
    }
    /** handles rendering the attributes */
    render(value) {
        if (!this.isValueChanged(value)) {
            return;
        }
        __classPrivateFieldGet(this, _BooleanAttributeNode_element, "f").toggleAttribute(__classPrivateFieldGet(this, _BooleanAttributeNode_attributeName, "f"));
        __classPrivateFieldSet(this, _BooleanAttributeNode_renderedAttrValue, value, "f");
    }
    /** check if value is not equal to the already rendered value */
    isValueChanged(value) {
        return __classPrivateFieldGet(this, _BooleanAttributeNode_renderedAttrValue, "f") !== value;
    }
}
_BooleanAttributeNode_element = new WeakMap(), _BooleanAttributeNode_attributeName = new WeakMap(), _BooleanAttributeNode_renderedAttrValue = new WeakMap();
//# sourceMappingURL=boolean-node.js.map