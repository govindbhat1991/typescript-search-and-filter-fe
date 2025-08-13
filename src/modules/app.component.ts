import { Component, html, WebComponent } from "@wok/web-component/core";

@Component({
  selector: "wc-app",
})
export class AppComponent extends WebComponent {
  render() {
    return html`
      <wc-reactive-test
        id="wc-btn"
        btn-class="btn__default"
        label="Click me!"
      ></wc-reactive-test>
    `;
  }
}
