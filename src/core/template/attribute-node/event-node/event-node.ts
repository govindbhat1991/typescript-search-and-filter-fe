import { WebComponent } from '../../../web-component/web-component';
import { nothing } from '../../template.constants';
import { deleteComponentEventListener, setComponentEventListener } from './event-node.constants';

export class EventAttributeNode {
    /** to hold html element */
    #element!: HTMLElement;

    /** to hold event value */
    #event!: string;

    /** to hold the current event listner */
    #assignedEventListner: unknown = nothing;

    /** to hold root element */
    readonly #root!: WebComponent;

    constructor(element: HTMLElement, root: WebComponent, event: string, value: unknown) {
        this.#element = element;
        this.#event = event;
        this.#root = root;
        this.setEventListners(value);
    }

    private setEventListners(method: unknown) {
        if (!this.#element) {
            return;
        }

        const eventMethod = (event: any) => (method as EventListener).bind(this.#root)(event);

        if (this.#assignedEventListner !== nothing) {
            deleteComponentEventListener(this.#root, this.#element, this.#event, eventMethod);
            this.#assignedEventListner = nothing;
        }
        setComponentEventListener(this.#root, this.#element, this.#event, eventMethod);

        this.#assignedEventListner = this.#event;
    }
}
