var _Provider_empty, _Provider_instance;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
/**
 * Provider class that creates an instance of given provider if has none,
 */
export class Provider {
    constructor(provider, exported) {
        Object.defineProperty(this, "provider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: provider
        });
        Object.defineProperty(this, "exported", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: exported
        });
        /**
         * value to distinguish not instantiated values from all falsy values
         * @private
         */
        _Provider_empty.set(this, Symbol('empty'));
        /**
         * value of the created instance of given provider
         * @private
         */
        _Provider_instance.set(this, __classPrivateFieldGet(this, _Provider_empty, "f"));
    }
    /**
     * Creates instance of given provider and sets it to instance
     * @param deps instances of providers that provider depends on
     */
    createInstance(...deps) {
        let value;
        if ('useValue' in this.provider) {
            value = this.provider.useValue;
        }
        else if ('useFactory' in this.provider) {
            value = this.provider.useFactory(...deps);
        }
        else if ('useClass' in this.provider) {
            value = new this.provider.useClass(...deps);
        }
        else {
            value = new this.provider(...deps);
        }
        __classPrivateFieldSet(this, _Provider_instance, value, "f");
        return __classPrivateFieldGet(this, _Provider_instance, "f");
    }
    /**
     * Retrieve the instance value of provider or create if EMPTY
     * @param deps
     */
    getInstance(...deps) {
        if (__classPrivateFieldGet(this, _Provider_instance, "f") !== __classPrivateFieldGet(this, _Provider_empty, "f")) {
            return __classPrivateFieldGet(this, _Provider_instance, "f");
        }
        return this.createInstance(...deps);
    }
}
_Provider_empty = new WeakMap(), _Provider_instance = new WeakMap();
//# sourceMappingURL=provider.js.map