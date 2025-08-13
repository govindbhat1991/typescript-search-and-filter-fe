import { WebComponent } from '../web-component/web-component';
import { TemplateResult } from './html-literal/html-literal.interface';
import { StringTemplate } from './string-template/string-template';
export declare class Template {
    #private;
    constructor(startNode: ChildNode, endNode: (ChildNode | null) | undefined, root: WebComponent);
    get rootTemplate(): StringTemplate | undefined;
    /** start rendering template as per the template result input */
    renderTemplateFragment(result: TemplateResult | string): void;
}
//# sourceMappingURL=template.d.ts.map