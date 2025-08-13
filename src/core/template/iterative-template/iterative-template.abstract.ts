import { TemplateResult } from '../html-literal/html-literal.interface';
import { StringTemplate } from '../string-template/string-template';

export abstract class IterativeTemplateAbstract {
    /** to hold child nodes */
    abstract childNodes: StringTemplate[];

    abstract get parentNode(): Node;

    abstract get startNode(): ChildNode;

    abstract get endNode(): ChildNode | null;

    /** render iterative template values */
    abstract render(results: unknown): void;

    protected abstract createChild(templateResult: TemplateResult, endNode?: ChildNode): StringTemplate;
}
