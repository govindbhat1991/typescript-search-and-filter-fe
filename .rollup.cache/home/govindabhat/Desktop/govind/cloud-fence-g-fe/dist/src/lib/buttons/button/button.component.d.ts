import { EventEmitter, OnConnected, OnDisconnected, WebComponent } from '@wok/web-component/core';
/** Custom web component for button element */
export declare class ButtonComponent extends WebComponent implements OnConnected, OnDisconnected {
    /**  button disable state  */
    disabled: boolean;
    /** Button state */
    active: boolean;
    /** Icon Position */
    iconPos: 'left' | 'right';
    /** button class */
    btnClass: string;
    /** Click event listener on the Button */
    onClickHandler(event: PointerEvent): void;
    /** Event emitter that emits onClick event for updated value */
    onClicked: EventEmitter<PointerEvent>;
    onConnected(): void;
    onDisconnected(): void;
}
//# sourceMappingURL=button.component.d.ts.map