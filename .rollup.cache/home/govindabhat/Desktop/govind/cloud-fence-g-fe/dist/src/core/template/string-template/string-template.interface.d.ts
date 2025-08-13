/** complied template string and mapped value of it */
export interface TemplateStringInterface {
    template: HTMLTemplateElement;
    attributes: TemplateAttribute[];
}
/** types of template attributes */
export declare enum TemplateAttributeType {
    PropertyAttribute = "property",
    BooleanAttribute = "boolean",
    EventAttribute = "event"
}
export declare enum TemplateValueType {
    Attributes = "attributes",
    Node = "node"
}
export interface TemplateAttribute {
    name: string;
    type: TemplateAttributeType;
    /** count of the dynamic values in one atrribute */
    count: number;
    stringValue: unknown;
}
export interface TemplateValueMapping {
    /** index is aligned with TemplateStringValue index */
    index: number;
    type: TemplateValueType;
    attributes: TemplateAttribute;
}
//# sourceMappingURL=string-template.interface.d.ts.map