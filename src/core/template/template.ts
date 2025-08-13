import { isPrimitive } from 'src/core/utils/value-type.utils';
import { WebComponent } from '../web-component/web-component';
import { TemplateResult } from './html-literal/html-literal.interface';
import { StringTemplate } from './string-template/string-template';
import { getTemplate } from './string-template/string-template.helper';
import { documentObject, fragmentRender, nothing } from './template.constants';
import { createMarker, removeNode } from './template.helpers';

export class Template {
    /** hold the detail of the starting node of the component */
    #startNode!: ChildNode;

    /** hold the detail of the ending node of the component */
    #endNode: ChildNode | null;

    /** to hold value, if Template Result is string */
    #renderedValue: string | HTMLTemplateElement | symbol = nothing;

    /** to hold root child template */
    #rootTemplate: StringTemplate | undefined;

    /** to hold root element */
    readonly #root!: WebComponent;

    constructor(startNode: ChildNode, endNode: ChildNode | null = null, root: WebComponent) {
        this.#startNode = startNode;
        this.#endNode = endNode;
        this.#root = root;
    }

    get rootTemplate(): StringTemplate | undefined {
        return this.#rootTemplate;
    }

    /** start rendering template as per the template result input */
    renderTemplateFragment(result: TemplateResult | string): void {
        if (!result) {
            this.#rootTemplate = undefined;
            removeNode(this.#startNode, this.#endNode);
            return;
        }

        if (isPrimitive(result)) {
            this.#rootTemplate = undefined;
            removeNode(this.#startNode, this.#endNode);
            if (this.#renderedValue === result) {
                return;
            }
            this.#root.renderRoot.insertBefore(createMarker(), null);
            this.#root.renderRoot.insertBefore(documentObject.createTextNode(result as string), this.#endNode);
            this.#renderedValue = result;
            return;
        }

        if (!result.values.length) {
            this.#rootTemplate = undefined;
            removeNode(this.#startNode, this.#endNode);
            const template = getTemplate(result.strings);
            if (template === this.#renderedValue) {
                return;
            }
            this.#root.renderRoot.insertBefore(createMarker(), null);
            const fragment = documentObject.importNode(template.content, true);
            this.#root.renderRoot.insertBefore(fragment, this.#endNode);
            this.#renderedValue = template;
            return;
        }

        this.#renderedValue = nothing;

        this.#rootTemplate ??= new StringTemplate(this.#startNode, this.#endNode, this.#root);
        this.#rootTemplate.render(result as TemplateResult);

        // @TODO, what will i do with this, oh!.
        if (!fragmentRender.length) {
            return;
        }

        fragmentRender.forEach(({ value, parentNode, endNode }) => {
            parentNode.insertBefore(value, endNode);
        });

        fragmentRender.length = 0;
    }
}
