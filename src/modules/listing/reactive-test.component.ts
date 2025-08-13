import style from './reactive-test.scss';

import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnConnected,
    OnUpdated,
    Output,
    PropertyValues,
    Watch,
    WebComponent,
    html,
} from '@wok/web-component/core';
import { ReactiveTestService } from './shared/reactive-test.service';
import { getColorArray, TestInjectionToken } from './shared/reactive-test.constants';

/** Custom Web component for button element */
@Component({
    selector: 'wc-reactive-test',
    style,
})
export class ReactiveTest extends WebComponent implements OnConnected, OnUpdated {
    private _labelText = 'No label';

    @Input('label')
    set labelText(label: string) {
        this._labelText = label;
    }
    get labelText(): string {
        return this._labelText;
    }

    @Watch() get buttonClass(): string {
        return this.disabled ? 'test-moron malu' : 'vittal-oppan malu';
    }

    @Watch() get buttonStyle(): Record<string, string> {
        return this.disabled ? { color: '#ccc', 'border-color': '#ccc' } : {};
    }

    @Watch() disabled = false;

    @Watch() count = 0;

    @Watch() loading = true;

    @Watch() clickMap: any[] = [];

    constructor(@Inject(TestInjectionToken) private reactiveTestService: ReactiveTestService) {
        super();
    }

    onConnected(): void {
        this.reactiveTestService.getClickMap().then((clickMap) => {
            this.clickMap = clickMap;
            this.loading = false;
        });
    }

    onUpdated(changedProperties: PropertyValues): void {
        console.log('updated: ', changedProperties);
    }

    /** Click event listener on the Button */
    onClick(): void {
        this.count++;
        this.showList = this.count !== 4;
        if (this.count === 3) {
            this.labelText = 'Moru nokk';
            this.clickMap = [{ date: new Date(), active: true, text: 'Hope New' }, ...this.clickMap];
        } else {
            this.clickMap = [...this.clickMap, { date: new Date(), active: true }];
        }
        this.onClicked.emit(this.count);
    }

    testClassName(name: string) {
        return `${name}-${this.count}`;
    }

    testTextName(name: string) {
        return `${name}-${this.count}`;
    }

    sayHello(name: string): string {
        return `Hello, ${name}`;
    }

    randomPX(): string {
        return `${Math.floor(Math.random() * (36 - 16 + 1)) + 16}px`;
    }

    randomValue: number = Math.floor(Math.random() * (36 - 16 + 1)) + 16;

    randomPXValue: string = `${this.randomValue}px`;

    /** Event emitter that emits onClick event for updated value */
    @Output()
    onClicked!: EventEmitter<number>;

    @Watch() showList = true;

    render() {
        return html`
            <button
                id="kittu"
                class="btn btn__default"
                (click)="${this.onClick}"
                disabled="${this.loading ? true : false}"
                class="${this.loading ? 'disabled' : ''}"
            >
                ${this.labelText}
            </button>
            ${this.count
                ? this.showList
                    ? html`<button disabled="${this.count % 2}">${this.count}</button>`
                    : html`<button disabled>4th click is forbidable, please go ahead</button>`
                : html`<button disabled>Not yet clicked</button>`}
            ${!this.loading || this.count !== 0
                ? this.clickMap.some(({ active }) => active) && this.count !== 4
                    ? html`
                          <ul>
                              ${this.clickMap.map(({ text, active }, i) =>
                                  active
                                      ? text
                                          ? html` <div
                                                style="color: ${getColorArray(i)}; font-size: ${this.randomPXValue}"
                                            >
                                                ${text} and color is ${getColorArray(i)}
                                            </div>`
                                          : html`
                                                <wc-reactive-list
                                                    index="${i}"
                                                    randomValue="${this.randomValue}"
                                                    randomPXValue="${this.randomPXValue}"
                                                ></wc-reactive-list>
                                            `
                                      : ''
                              )}
                          </ul>
                      `
                    : ''
                : html`<ul>
                      <li class="">Loading...</li>
                  </ul>`}
        `;
    }
}
