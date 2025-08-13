import { WebComponent } from '../../web-component/web-component';
import { TemplateResult } from '../html-literal/html-literal.interface';
import { StringTemplate } from '../string-template/string-template';
import { IterativeTemplateAbstract } from './iterative-template.abstract';
export declare class IterativeTemplate extends IterativeTemplateAbstract {
    #private;
    /** to hold child nodes */
    childNodes: StringTemplate[];
    constructor(startNode: ChildNode, endNode: (ChildNode | null) | undefined, root: WebComponent);
    get parentNode(): Node;
    get startNode(): ChildNode;
    get endNode(): ChildNode | null;
    /** render iterative template values */
    render(results: unknown): void;
    protected createChild(templateResult: TemplateResult, endNode?: ChildNode): StringTemplate;
}
//# sourceMappingURL=iterative-template.d.ts.map