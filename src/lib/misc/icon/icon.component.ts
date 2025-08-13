import template from './icon.component.html';
import style from './icon.component.scss';

import { Component, WebComponent } from '@wok/web-component/core';

/** Custom web component for icon element */
@Component({
    selector: 'wc-icon',
    template,
    style,
})
export class IconComponent extends WebComponent {}
