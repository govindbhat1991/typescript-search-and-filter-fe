import { Component, html, Input, WebComponent } from '@wok/web-component/core';

import style from './filter.component.scss'

@Component({
    selector: 'wc-list-filter',
    style,
})
export class FilterComponent extends WebComponent {
    @Input() index!: number;

    @Input() randomValue!: number;

    @Input() randomPXValue!: string;

    render() {
        return html``;
    }
}
