import { isIterable, isPrimitive } from 'src/core/utils/value-type.utils';
import { PropertyAttributeNode } from '../attribute-node/property-node/property-node';
import { IterativeTemplateAbstract } from '../iterative-template/iterative-template.abstract';
import { ReactiveNode } from '../reactive-node/reactive-node';
import { documentObject } from '../template.constants';
import { StringTemplate } from './string-template';
import { attrFullMarkerRegex, attrMarker, attrMarkerRegex, attrPrefix, booleanAttributes, eventRegex, fullAttributeRegex, generalMarker, nodeMarker, } from './string-template.constants';
import { TemplateAttributeType } from './string-template.interface';
import { minifyHTML } from 'src/core/utils/html-minify.utils';
/** to store template string, as a cache */
const templateStore = new WeakMap();
/** check whether the type of the value changed, when compare to previous value */
export const hasValueTypeChanged = (oldValue, newValue) => {
    switch (true) {
        case oldValue instanceof PropertyAttributeNode && !isPrimitive(newValue):
            return true;
        case oldValue instanceof ReactiveNode && !isPrimitive(newValue):
            return true;
        case oldValue instanceof StringTemplate && (isPrimitive(newValue) || isIterable(newValue)):
            return true;
        case oldValue instanceof IterativeTemplateAbstract && !isIterable(newValue):
            return true;
        default:
            return false;
    }
};
/** find and return type and name of attributes and event from a template string */
export const getAttributes = (name, stringValue) => {
    const noPrefixName = name.replace(attrPrefix, '');
    const isEventAttribute = eventRegex.exec(noPrefixName);
    const attrName = isEventAttribute ? isEventAttribute[1] : noPrefixName;
    const type = isEventAttribute
        ? TemplateAttributeType.EventAttribute
        : booleanAttributes.includes(attrName)
            ? TemplateAttributeType.BooleanAttribute
            : TemplateAttributeType.PropertyAttribute;
    return {
        name: attrName,
        type,
        count: ((stringValue || '').match(attrFullMarkerRegex) || []).length,
        stringValue,
    };
};
/** replace template string dynamic attributes with attribute prefix for identifying while DOM manipulation */
const setAttributeKeyPrefix = (templateString) => {
    if (!templateString) {
        return '';
    }
    return templateString.replace(fullAttributeRegex, (match, key, value) => {
        const attrValue = value.replace(attrMarkerRegex, attrMarker);
        return new RegExp(attrMarkerRegex).exec(match) ? `${attrPrefix}${key}="${attrValue}"` : `${match}`;
    });
};
/** adding node marker */
const setNodeMarker = (templateString) => {
    if (!templateString) {
        return '';
    }
    return templateString.replaceAll(attrMarkerRegex, nodeMarker);
};
/** to get html sting from template string, Heart of templating */
export const getTemplateHtml = (strings) => {
    let templateStrings = strings.reduce((templateStrings, string, index) => {
        return (templateStrings += strings.length > index + 1 ? string + generalMarker : string);
    }, '');
    return setNodeMarker(setAttributeKeyPrefix(minifyHTML(templateStrings)));
};
/** to create a template element from html */
export const createTemplate = (html) => {
    const el = documentObject.createElement('template');
    el.innerHTML = html;
    return el;
};
/** return template from given template string array */
export const getTemplate = (strings) => {
    const cachedTemplate = templateStore.get(strings);
    if (cachedTemplate !== undefined) {
        return cachedTemplate;
    }
    const html = getTemplateHtml(strings);
    const template = createTemplate(html);
    templateStore.set(strings, template);
    return template;
};
//# sourceMappingURL=string-template.helper.js.map