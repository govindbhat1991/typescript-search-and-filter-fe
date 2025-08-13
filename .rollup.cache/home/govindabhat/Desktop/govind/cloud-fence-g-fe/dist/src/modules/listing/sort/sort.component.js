import { __decorate } from "tslib";
import { Component, html, Input, WebComponent } from '@wok/web-component/core';
import style from './sort.component.scss';
let SortComponent = class SortComponent extends WebComponent {
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
        return html ``;
    }
};
__decorate([
    Input()
], SortComponent.prototype, "index", void 0);
__decorate([
    Input()
], SortComponent.prototype, "randomValue", void 0);
__decorate([
    Input()
], SortComponent.prototype, "randomPXValue", void 0);
SortComponent = __decorate([
    Component({
        selector: 'wc-list-sort',
        style,
    })
], SortComponent);
export { SortComponent };
//# sourceMappingURL=sort.component.js.map