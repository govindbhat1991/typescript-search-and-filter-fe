import { TemplateAttribute } from './string-template.interface';
/** check whether the type of the value changed, when compare to previous value */
export declare const hasValueTypeChanged: (oldValue: unknown, newValue: unknown) => boolean;
/** find and return type and name of attributes and event from a template string */
export declare const getAttributes: (name: string, stringValue: string | null) => TemplateAttribute;
/** to get html sting from template string, Heart of templating */
export declare const getTemplateHtml: (strings: TemplateStringsArray) => string;
/** to create a template element from html */
export declare const createTemplate: (html: string) => HTMLTemplateElement;
/** return template from given template string array */
export declare const getTemplate: (strings: TemplateStringsArray) => HTMLTemplateElement;
//# sourceMappingURL=string-template.helper.d.ts.map