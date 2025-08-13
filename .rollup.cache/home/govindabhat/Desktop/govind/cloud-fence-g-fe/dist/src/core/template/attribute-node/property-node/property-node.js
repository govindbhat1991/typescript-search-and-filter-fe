var _PropertyAttributeNode_element, _PropertyAttributeNode_attrDetails, _PropertyAttributeNode_renderedAttrValue;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { isObject } from 'src/core/utils/value-type.utils';
import { attrFullMarkerRegex } from '../../string-template/string-template.constants';
import { nothing } from '../../template.constants';
// @TODO, refactor create helper functions
export class PropertyAttributeNode {
    constructor(element, attrDetails) {
        /** to hold html element */
        _PropertyAttributeNode_element.set(this, void 0);
        /** hold default value */
        _PropertyAttributeNode_attrDetails.set(this, void 0);
        /** to hold render attribute value */
        _PropertyAttributeNode_renderedAttrValue.set(this, nothing);
        __classPrivateFieldSet(this, _PropertyAttributeNode_element, element, "f");
        __classPrivateFieldSet(this, _PropertyAttributeNode_attrDetails, attrDetails, "f");
        if (!__classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f").stringValue) {
            return;
        }
        const { name, stringValue } = __classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f");
        if (name === 'class') {
            const classValue = stringValue.replace(attrFullMarkerRegex, '');
            this.addClass(classValue.trim().split(' ').filter(Boolean));
        }
    }
    /** handles rendering the attributes */
    render(value, startingIndex) {
        //@TODO value will not be same; change isValueChanged logic
        if (!this.isValueChanged(value)) {
            return __classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f").count;
        }
        if (!Array.isArray(value) && isObject(value)) {
            this.attributeHandler(value);
            return __classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f").count;
        }
        const renderValue = value.length === 1 ? value[startingIndex] : value;
        switch (__classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f").name) {
            case 'style':
                this.styleHandler(renderValue, startingIndex);
                break;
            case 'class':
                this.classHandler(renderValue, startingIndex);
                break;
            default:
                this.attributeHandler(this.stringReplace(renderValue, startingIndex));
        }
        return __classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f").count;
    }
    /** check if value is not equal to the already rendered value */
    isValueChanged(value) {
        return __classPrivateFieldGet(this, _PropertyAttributeNode_renderedAttrValue, "f") !== value;
    }
    /** replace marker with value */
    stringReplace(value, startingIndex) {
        if (!Array.isArray(value)) {
            return value;
        }
        let index = startingIndex;
        return __classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f").stringValue.replace(attrFullMarkerRegex, () => value[index++]);
    }
    /** handle style value */
    styleHandler(attrValue, startingIndex) {
        const value = this.stringReplace(attrValue, startingIndex);
        if (__classPrivateFieldGet(this, _PropertyAttributeNode_renderedAttrValue, "f") === value) {
            return;
        }
        __classPrivateFieldGet(this, _PropertyAttributeNode_element, "f").style.cssText = value;
        __classPrivateFieldSet(this, _PropertyAttributeNode_renderedAttrValue, value, "f");
    }
    /** handle class value */
    classHandler(attrValue, startingIndex) {
        const value = this.stringReplace(attrValue, startingIndex);
        if (__classPrivateFieldGet(this, _PropertyAttributeNode_renderedAttrValue, "f") === value) {
            return;
        }
        const renderedClassList = (__classPrivateFieldGet(this, _PropertyAttributeNode_renderedAttrValue, "f") !== nothing ? __classPrivateFieldGet(this, _PropertyAttributeNode_renderedAttrValue, "f") : '')
            .trim()
            .split(' ');
        const targetClassList = (value ?? '').trim().split(' ');
        const addClass = targetClassList.filter((className) => !renderedClassList.includes(className)).filter(Boolean);
        const removeClass = renderedClassList
            .filter((className) => !targetClassList.includes(className))
            .filter(Boolean);
        if (removeClass.length) {
            this.removeClass(removeClass);
        }
        if (addClass.length) {
            this.addClass(addClass);
        }
        __classPrivateFieldSet(this, _PropertyAttributeNode_renderedAttrValue, value, "f");
    }
    addClass(value) {
        __classPrivateFieldGet(this, _PropertyAttributeNode_element, "f").classList.add(...value);
    }
    removeClass(value) {
        __classPrivateFieldGet(this, _PropertyAttributeNode_element, "f").classList.remove(...value);
    }
    /** handle attribute value */
    attributeHandler(value) {
        const { name } = __classPrivateFieldGet(this, _PropertyAttributeNode_attrDetails, "f");
        __classPrivateFieldGet(this, _PropertyAttributeNode_element, "f").setAttribute(name, value);
        __classPrivateFieldSet(this, _PropertyAttributeNode_renderedAttrValue, value, "f");
    }
}
_PropertyAttributeNode_element = new WeakMap(), _PropertyAttributeNode_attrDetails = new WeakMap(), _PropertyAttributeNode_renderedAttrValue = new WeakMap();
//# sourceMappingURL=property-node.js.map