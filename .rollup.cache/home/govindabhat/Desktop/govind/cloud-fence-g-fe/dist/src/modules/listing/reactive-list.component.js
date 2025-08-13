import { __decorate } from "tslib";
import { Component, html, Input, WebComponent } from '@wok/web-component/core';
import { getColorArray } from './shared/reactive-test.constants';
let ReactiveList = class ReactiveList extends WebComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "randomValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "randomPXValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    render() {
        return html `
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
};
__decorate([
    Input()
], ReactiveList.prototype, "index", void 0);
__decorate([
    Input()
], ReactiveList.prototype, "randomValue", void 0);
__decorate([
    Input()
], ReactiveList.prototype, "randomPXValue", void 0);
ReactiveList = __decorate([
    Component({
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
], ReactiveList);
export { ReactiveList };
//# sourceMappingURL=reactive-list.component.js.map