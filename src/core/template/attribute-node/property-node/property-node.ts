import { isObject } from 'src/core/utils/value-type.utils';
import { attrFullMarkerRegex } from '../../string-template/string-template.constants';
import { TemplateAttribute } from '../../string-template/string-template.interface';
import { nothing } from '../../template.constants';

// @TODO, refactor create helper functions
export class PropertyAttributeNode {
    /** to hold html element */
    #element!: HTMLElement;

    /** hold default value */
    #attrDetails!: TemplateAttribute;

    /** to hold render attribute value */
    #renderedAttrValue: unknown = nothing;

    constructor(element: HTMLElement, attrDetails: TemplateAttribute) {
        this.#element = element;
        this.#attrDetails = attrDetails;
        if (!this.#attrDetails.stringValue) {
            return;
        }
        const { name, stringValue } = this.#attrDetails;

        if (name === 'class') {
            const classValue = (stringValue as string).replace(attrFullMarkerRegex, '');
            this.addClass(classValue.trim().split(' ').filter(Boolean));
        }
    }

    /** handles rendering the attributes */
    render(value: unknown, startingIndex: number): number {
        //@TODO value will not be same; change isValueChanged logic
        if (!this.isValueChanged(value)) {
            return this.#attrDetails.count;
        }

        if (!Array.isArray(value) && isObject(value)) {
            this.attributeHandler(value);
            return this.#attrDetails.count;
        }

        const renderValue = (value as unknown[]).length === 1 ? (value as unknown[])[startingIndex] : value;

        switch (this.#attrDetails.name) {
            case 'style':
                this.styleHandler(renderValue, startingIndex);
                break;
            case 'class':
                this.classHandler(renderValue, startingIndex);
                break;
            default:
                this.attributeHandler(this.stringReplace(renderValue, startingIndex));
        }
        return this.#attrDetails.count;
    }

    /** check if value is not equal to the already rendered value */
    private isValueChanged(value: unknown): boolean {
        return this.#renderedAttrValue !== value;
    }

    /** replace marker with value */
    private stringReplace(value: unknown, startingIndex: number): string {
        if (!Array.isArray(value)) {
            return value as string;
        }

        let index = startingIndex;
        return (this.#attrDetails.stringValue as string).replace(attrFullMarkerRegex, () => value[index++]);
    }

    /** handle style value */
    private styleHandler(attrValue: unknown, startingIndex: number): void {
        const value = this.stringReplace(attrValue, startingIndex);

        if (this.#renderedAttrValue === value) {
            return;
        }

        this.#element.style.cssText = value;
        this.#renderedAttrValue = value;
    }

    /** handle class value */
    private classHandler(attrValue: unknown, startingIndex: number): void {
        const value = this.stringReplace(attrValue, startingIndex);
        if (this.#renderedAttrValue === value) {
            return;
        }

        const renderedClassList = (this.#renderedAttrValue !== nothing ? (this.#renderedAttrValue as string) : '')
            .trim()
            .split(' ');
        const targetClassList = ((value as string) ?? '').trim().split(' ');

        const addClass = targetClassList.filter((className) => !renderedClassList.includes(className)).filter(Boolean);
        const removeClass = renderedClassList
            .filter((className) => !targetClassList.includes(className))
            .filter(Boolean);

        if (removeClass.length) {
            this.removeClass(removeClass);
        }
        if (addClass.length) {
            this.addClass(addClass);
        }
        this.#renderedAttrValue = value;
    }

    private addClass(value: string[]) {
        this.#element.classList.add(...value);
    }

    private removeClass(value: string[]) {
        this.#element.classList.remove(...value);
    }

    /** handle attribute value */
    private attributeHandler(value: unknown): void {
        const { name } = this.#attrDetails;
        this.#element.setAttribute(name, value as string);
        this.#renderedAttrValue = value;
    }
}
