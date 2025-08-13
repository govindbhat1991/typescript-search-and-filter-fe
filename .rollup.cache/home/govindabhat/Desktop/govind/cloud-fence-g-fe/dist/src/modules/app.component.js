import { __decorate } from "tslib";
import { Component, html, WebComponent } from "@wok/web-component/core";
let AppComponent = class AppComponent extends WebComponent {
    render() {
        return html `
      <wc-reactive-test
        id="wc-btn"
        btn-class="btn__default"
        label="Click me!"
      ></wc-reactive-test>
    `;
    }
};
AppComponent = __decorate([
    Component({
        selector: "wc-app",
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map