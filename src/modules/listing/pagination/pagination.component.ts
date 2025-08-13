import { Component, html, Input, WebComponent } from '@wok/web-component/core';

import style from './pagination.component.scss'

@Component({
    selector: 'wc-list-pagination',
    style,
})
export class PaginationComponent extends WebComponent {
    @Input() index!: number;

    @Input() randomValue!: number;

    @Input() randomPXValue!: string;

    render() {
        return html``;
    }
}
