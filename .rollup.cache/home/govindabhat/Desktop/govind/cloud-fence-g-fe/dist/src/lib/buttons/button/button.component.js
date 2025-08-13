import { __decorate } from "tslib";
import template from './button.component.html';
import style from './button.component.scss';
import { Component, Input, Output, Watch, WebComponent, } from '@wok/web-component/core';
/** Custom web component for button element */
let ButtonComponent = class ButtonComponent extends WebComponent {
    constructor() {
        super(...arguments);
        /**  button disable state  */
        Object.defineProperty(this, "disabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /** Button state */
        Object.defineProperty(this, "active", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /** Icon Position */
        Object.defineProperty(this, "iconPos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'left'
        });
        /** button class */
        Object.defineProperty(this, "btnClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        /** Event emitter that emits onClick event for updated value */
        Object.defineProperty(this, "onClicked", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /** Click event listener on the Button */
    onClickHandler(event) {
        this.onClicked.emit(event);
    }
    onConnected() { }
    onDisconnected() { }
};
__decorate([
    Watch()
], ButtonComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "active", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "iconPos", void 0);
__decorate([
    Input('btn-class')
], ButtonComponent.prototype, "btnClass", void 0);
__decorate([
    Output()
], ButtonComponent.prototype, "onClicked", void 0);
ButtonComponent = __decorate([
    Component({
        selector: 'wc-button',
        template,
        style,
    })
], ButtonComponent);
export { ButtonComponent };
//# sourceMappingURL=button.component.js.map