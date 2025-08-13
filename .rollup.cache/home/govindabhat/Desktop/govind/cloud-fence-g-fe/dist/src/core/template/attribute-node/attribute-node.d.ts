import { WebComponent } from 'src';
import { BooleanAttributeNode } from './boolean-node/boolean-node';
import { EventAttributeNode } from './event-node/event-node';
import { PropertyAttributeNode } from './property-node/property-node';
export declare class AttributeNode {
    #private;
    constructor(element: HTMLElement, root: WebComponent);
    get childAttributeNode(): (PropertyAttributeNode | EventAttributeNode | BooleanAttributeNode)[];
    /** handles rendering the attributes */
    render(values: unknown[], startingIndex: number): number;
    private attributesHanlder;
    /** add value to the template, after determining */
    private createAttributeNode;
}
//# sourceMappingURL=attribute-node.d.ts.map