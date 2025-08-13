import { Component, html, Input, WebComponent } from '@wok/web-component/core';
import { getColorArray } from './shared/reactive-test.constants';

@Component({
    selector: 'wc-reactive-list',
    style: `
        svg {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        
        li {
            list-style: none;
            position: relative;
        }
    `,
})
export class ReactiveList extends WebComponent {
    @Input() index!: number;

    @Input() randomValue!: number;

    @Input() randomPXValue!: string;

    render() {
        return html`
            <li style="color: ${getColorArray(this.index)}; font-size: ${this.randomPXValue}">
                <svg
                    height="${this.randomValue / 3}"
                    width="${this.randomValue / 3}"
                    style="left: ${-this.randomValue / 1.5}px"
                >
                    <circle
                        r="${this.randomValue / 6.66666666}"
                        cx="${this.randomValue / 6}"
                        cy="${this.randomValue / 6}"
                        fill="${getColorArray(this.index)}"
                    />
                </svg>
                index: ${this.index} and color is ${getColorArray(this.index)}
            </li>
        `;
    }
}
