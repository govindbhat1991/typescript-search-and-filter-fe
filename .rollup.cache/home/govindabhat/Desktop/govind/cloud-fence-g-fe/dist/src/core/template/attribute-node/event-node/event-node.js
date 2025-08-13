var _EventAttributeNode_element, _EventAttributeNode_event, _EventAttributeNode_assignedEventListner, _EventAttributeNode_root;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { nothing } from '../../template.constants';
import { deleteComponentEventListener, setComponentEventListener } from './event-node.constants';
export class EventAttributeNode {
    constructor(element, root, event, value) {
        /** to hold html element */
        _EventAttributeNode_element.set(this, void 0);
        /** to hold event value */
        _EventAttributeNode_event.set(this, void 0);
        /** to hold the current event listner */
        _EventAttributeNode_assignedEventListner.set(this, nothing);
        /** to hold root element */
        _EventAttributeNode_root.set(this, void 0);
        __classPrivateFieldSet(this, _EventAttributeNode_element, element, "f");
        __classPrivateFieldSet(this, _EventAttributeNode_event, event, "f");
        __classPrivateFieldSet(this, _EventAttributeNode_root, root, "f");
        this.setEventListners(value);
    }
    setEventListners(method) {
        if (!__classPrivateFieldGet(this, _EventAttributeNode_element, "f")) {
            return;
        }
        const eventMethod = (event) => method.bind(__classPrivateFieldGet(this, _EventAttributeNode_root, "f"))(event);
        if (__classPrivateFieldGet(this, _EventAttributeNode_assignedEventListner, "f") !== nothing) {
            deleteComponentEventListener(__classPrivateFieldGet(this, _EventAttributeNode_root, "f"), __classPrivateFieldGet(this, _EventAttributeNode_element, "f"), __classPrivateFieldGet(this, _EventAttributeNode_event, "f"), eventMethod);
            __classPrivateFieldSet(this, _EventAttributeNode_assignedEventListner, nothing, "f");
        }
        setComponentEventListener(__classPrivateFieldGet(this, _EventAttributeNode_root, "f"), __classPrivateFieldGet(this, _EventAttributeNode_element, "f"), __classPrivateFieldGet(this, _EventAttributeNode_event, "f"), eventMethod);
        __classPrivateFieldSet(this, _EventAttributeNode_assignedEventListner, __classPrivateFieldGet(this, _EventAttributeNode_event, "f"), "f");
    }
}
_EventAttributeNode_element = new WeakMap(), _EventAttributeNode_event = new WeakMap(), _EventAttributeNode_assignedEventListner = new WeakMap(), _EventAttributeNode_root = new WeakMap();
//# sourceMappingURL=event-node.js.map