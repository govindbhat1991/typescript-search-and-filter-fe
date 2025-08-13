import { Component, html, Input, WebComponent } from '@wok/web-component/core';

import style from './sort.component.scss'

@Component({
    selector: 'wc-list-sort',
    style,
})
export class SortComponent extends WebComponent {
    @Input() index!: number;

    @Input() randomValue!: number;

    @Input() randomPXValue!: string;

    render() {
        return html``;
    }
}
