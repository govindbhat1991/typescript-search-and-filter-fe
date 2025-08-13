import { __decorate } from "tslib";
import { Component, html, Input, WebComponent } from '@wok/web-component/core';
import style from './search.component.scss';
let SearchComponent = class SearchComponent extends WebComponent {
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
], SearchComponent.prototype, "index", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "randomValue", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "randomPXValue", void 0);
SearchComponent = __decorate([
    Component({
        selector: 'wc-list-search',
        style,
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map