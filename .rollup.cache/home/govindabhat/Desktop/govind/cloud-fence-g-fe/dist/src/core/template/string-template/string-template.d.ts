import { WebComponent } from '../../web-component/web-component';
import { AttributeNode } from '../attribute-node/attribute-node';
import { IterativeTemplate } from '../iterative-template/iterative-template';
import { ReactiveNode } from '../reactive-node/reactive-node';
export declare class StringTemplate {
    #private;
    constructor(startNode: ChildNode, endNode: (ChildNode | null) | undefined, root: WebComponent);
    get startNode(): ChildNode;
    get parentNode(): ParentNode;
    get endNode(): ChildNode | null;
    get childNodes(): (StringTemplate | IterativeTemplate | ReactiveNode | AttributeNode)[];
    get template(): HTMLTemplateElement | undefined;
    render(result: unknown): void;
    /** start mapping the value to the template */
    private valueMapping;
    /** add value to the template, after determining */
    private createTemplateNode;
}
//# sourceMappingURL=string-template.d.ts.map