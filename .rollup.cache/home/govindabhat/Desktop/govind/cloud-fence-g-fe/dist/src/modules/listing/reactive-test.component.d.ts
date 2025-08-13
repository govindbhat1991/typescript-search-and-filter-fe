import { EventEmitter, OnConnected, OnUpdated, PropertyValues, WebComponent } from '@wok/web-component/core';
import { ReactiveTestService } from './shared/reactive-test.service';
/** Custom Web component for button element */
export declare class ReactiveTest extends WebComponent implements OnConnected, OnUpdated {
    private reactiveTestService;
    private _labelText;
    set labelText(label: string);
    get labelText(): string;
    get buttonClass(): string;
    get buttonStyle(): Record<string, string>;
    disabled: boolean;
    count: number;
    loading: boolean;
    clickMap: any[];
    constructor(reactiveTestService: ReactiveTestService);
    onConnected(): void;
    onUpdated(changedProperties: PropertyValues): void;
    /** Click event listener on the Button */
    onClick(): void;
    testClassName(name: string): string;
    testTextName(name: string): string;
    sayHello(name: string): string;
    randomPX(): string;
    randomValue: number;
    randomPXValue: string;
    /** Event emitter that emits onClick event for updated value */
    onClicked: EventEmitter<number>;
    showList: boolean;
    render(): import("@wok/web-component/core").TemplateResult;
}
//# sourceMappingURL=reactive-test.component.d.ts.map