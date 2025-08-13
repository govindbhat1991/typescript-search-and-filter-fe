import { Component, html, Input, WebComponent } from '@wok/web-component/core';

import style from './search.component.scss'

@Component({
    selector: 'wc-list-search',
    style,
})
export class SearchComponent extends WebComponent {
    @Input() index!: number;

    @Input() randomValue!: number;

    @Input() randomPXValue!: string;

    render() {
        return html``;
    }
}
