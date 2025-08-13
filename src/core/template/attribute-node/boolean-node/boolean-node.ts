import { nothing } from '../../template.constants';

export class BooleanAttributeNode {
    /** to hold html element */
    #element!: HTMLElement;

    /** attribute name */
    #attributeName!: string;

    /** to hold render attribute value */
    #renderedAttrValue: boolean | typeof nothing = nothing;

    constructor(element: HTMLElement, attributeName: string) {
        this.#element = element;
        this.#attributeName = attributeName;
    }

    /** handles rendering the attributes */
    render(value: unknown): void {
        if (!this.isValueChanged(value)) {
            return;
        }
        this.#element.toggleAttribute(this.#attributeName);
        this.#renderedAttrValue = value as boolean;
    }

    /** check if value is not equal to the already rendered value */
    private isValueChanged(value: unknown): boolean {
        return this.#renderedAttrValue !== value;
    }
}
