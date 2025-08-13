import { __decorate } from "tslib";
import { Component, html, Input, WebComponent } from '@wok/web-component/core';
import style from './pagination.component.scss';
let PaginationComponent = class PaginationComponent extends WebComponent {
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
], PaginationComponent.prototype, "index", void 0);
__decorate([
    Input()
], PaginationComponent.prototype, "randomValue", void 0);
__decorate([
    Input()
], PaginationComponent.prototype, "randomPXValue", void 0);
PaginationComponent = __decorate([
    Component({
        selector: 'wc-list-pagination',
        style,
    })
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map