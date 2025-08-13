import template from './button.component.html';
import style from './button.component.scss';

import {
    Component,
    EventEmitter,
    Input,
    OnConnected,
    OnDisconnected,
    Output,
    Watch,
    WebComponent,
} from '@wok/web-component/core';

/** Custom web component for button element */
@Component({
    selector: 'wc-button',
    template,
    style,
})
export class ButtonComponent extends WebComponent implements OnConnected, OnDisconnected {
    /**  button disable state  */
    @Watch() disabled = true;

    /** Button state */
    @Input() active = false;

    /** Icon Position */
    @Input() iconPos: 'left' | 'right' = 'left';

    /** button class */
    @Input('btn-class') btnClass = '';

    /** Click event listener on the Button */
    onClickHandler(event: PointerEvent): void {
        this.onClicked.emit(event);
    }

    /** Event emitter that emits onClick event for updated value */
    @Output()
    onClicked!: EventEmitter<PointerEvent>;

    onConnected(): void {}

    onDisconnected(): void {}
}
