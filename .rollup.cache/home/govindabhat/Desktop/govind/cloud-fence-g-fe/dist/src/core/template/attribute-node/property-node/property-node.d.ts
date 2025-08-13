import { TemplateAttribute } from '../../string-template/string-template.interface';
export declare class PropertyAttributeNode {
    #private;
    constructor(element: HTMLElement, attrDetails: TemplateAttribute);
    /** handles rendering the attributes */
    render(value: unknown, startingIndex: number): number;
    /** check if value is not equal to the already rendered value */
    private isValueChanged;
    /** replace marker with value */
    private stringReplace;
    /** handle style value */
    private styleHandler;
    /** handle class value */
    private classHandler;
    private addClass;
    private removeClass;
    /** handle attribute value */
    private attributeHandler;
}
//# sourceMappingURL=property-node.d.ts.map