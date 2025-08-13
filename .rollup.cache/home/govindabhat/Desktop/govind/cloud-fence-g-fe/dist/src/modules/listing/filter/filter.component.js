import { __decorate } from "tslib";
import { Component, html, Input, WebComponent } from '@wok/web-component/core';
import style from './filter.component.scss';
let FilterComponent = class FilterComponent extends WebComponent {
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
], FilterComponent.prototype, "index", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "randomValue", void 0);
__decorate([
    Input()
], FilterComponent.prototype, "randomPXValue", void 0);
FilterComponent = __decorate([
    Component({
        selector: 'wc-list-filter',
        style,
    })
], FilterComponent);
export { FilterComponent };
//# sourceMappingURL=filter.component.js.map