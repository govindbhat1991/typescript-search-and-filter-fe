import { __decorate } from "tslib";
import template from './icon.component.html';
import style from './icon.component.scss';
import { Component, WebComponent } from '@wok/web-component/core';
/** Custom web component for icon element */
let IconComponent = class IconComponent extends WebComponent {
};
IconComponent = __decorate([
    Component({
        selector: 'wc-icon',
        template,
        style,
    })
], IconComponent);
export { IconComponent };
//# sourceMappingURL=icon.component.js.map