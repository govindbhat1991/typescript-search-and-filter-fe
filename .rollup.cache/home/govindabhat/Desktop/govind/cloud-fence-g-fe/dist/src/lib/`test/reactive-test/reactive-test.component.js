import { __decorate, __param } from "tslib";
import style from './reactive-test.scss';
import { Component, Inject, Input, Output, Watch, WebComponent, html, } from '@wok/web-component/core';
import { getColorArray, testInjectionToken } from './reactive-test.constants';
/** Custom Web component for button element */
let ReactiveTest = class ReactiveTest extends WebComponent {
    set labelText(label) {
        this._labelText = label;
    }
    get labelText() {
        return this._labelText;
    }
    get buttonClass() {
        return this.disabled ? 'test-moron malu' : 'vittal-oppan malu';
    }
    get buttonStyle() {
        return this.disabled ? { color: '#ccc', 'border-color': '#ccc' } : {};
    }
    constructor(reactiveTestService) {
        super();
        Object.defineProperty(this, "reactiveTestService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: reactiveTestService
        });
        Object.defineProperty(this, "_labelText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'No label'
        });
        Object.defineProperty(this, "disabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "count", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "loading", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "clickMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "randomValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Math.floor(Math.random() * (36 - 16 + 1)) + 16
        });
        Object.defineProperty(this, "randomPXValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `${this.randomValue}px`
        });
        /** Event emitter that emits onClick event for updated value */
        Object.defineProperty(this, "onClicked", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "showList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    onConnected() {
        this.reactiveTestService.getClickMap().then((clickMap) => {
            this.clickMap = clickMap;
            this.loading = false;
        });
    }
    onUpdated(changedProperties) {
        console.log('updated: ', changedProperties);
    }
    /** Click event listener on the Button */
    onClick() {
        this.count++;
        this.showList = this.count !== 4;
        if (this.count === 3) {
            this.labelText = 'Moru nokk';
            this.clickMap = [{ date: new Date(), active: true, text: 'Hope New' }, ...this.clickMap];
        }
        else {
            this.clickMap = [...this.clickMap, { date: new Date(), active: true }];
        }
        this.onClicked.emit(this.count);
    }
    testClassName(name) {
        return `${name}-${this.count}`;
    }
    testTextName(name) {
        return `${name}-${this.count}`;
    }
    sayHello(name) {
        return `Hello, ${name}`;
    }
    randomPX() {
        return `${Math.floor(Math.random() * (36 - 16 + 1)) + 16}px`;
    }
    render() {
        return html `
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
                ? html `<button disabled="${this.count % 2}">${this.count}</button>`
                : html `<button disabled>4th click is forbidable, please go ahead</button>`
            : html `<button disabled>Not yet clicked</button>`}
            ${!this.loading || this.count !== 0
            ? this.clickMap.some(({ active }) => active) && this.count !== 4
                ? html `
                          <ul>
                              ${this.clickMap.map(({ text, active }, i) => active
                    ? text
                        ? html ` <div
                                                style="color: ${getColorArray(i)}; font-size: ${this.randomPXValue}"
                                            >
                                                ${text} and color is ${getColorArray(i)}
                                            </div>`
                        : html `
                                                <wc-reactive-list
                                                    index="${i}"
                                                    randomValue="${this.randomValue}"
                                                    randomPXValue="${this.randomPXValue}"
                                                ></wc-reactive-list>
                                            `
                    : '')}
                          </ul>
                      `
                : ''
            : html `<ul>
                      <li class="">Loading...</li>
                  </ul>`}
        `;
    }
};
__decorate([
    Input('label')
], ReactiveTest.prototype, "labelText", null);
__decorate([
    Watch()
], ReactiveTest.prototype, "buttonClass", null);
__decorate([
    Watch()
], ReactiveTest.prototype, "buttonStyle", null);
__decorate([
    Watch()
], ReactiveTest.prototype, "disabled", void 0);
__decorate([
    Watch()
], ReactiveTest.prototype, "count", void 0);
__decorate([
    Watch()
], ReactiveTest.prototype, "loading", void 0);
__decorate([
    Watch()
], ReactiveTest.prototype, "clickMap", void 0);
__decorate([
    Output()
], ReactiveTest.prototype, "onClicked", void 0);
__decorate([
    Watch()
], ReactiveTest.prototype, "showList", void 0);
ReactiveTest = __decorate([
    Component({
        selector: 'wc-reactive-test',
        style,
    }),
    __param(0, Inject(testInjectionToken))
], ReactiveTest);
export { ReactiveTest };
//# sourceMappingURL=reactive-test.component.js.map