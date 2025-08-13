import { __decorate } from "tslib";
import { Injectable } from '@wok/web-component/core';
let ReactiveTestService = class ReactiveTestService {
    getClickMap() {
        return this.fakeBackend().then((clickMap) => clickMap);
    }
    fakeBackend() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Array(Math.floor(Math.random() * (20 - 0 + 0)) + 0)
                    .fill(0)
                    .map(() => ({ date: new Date(), active: true })));
            }, 1000);
        });
    }
};
ReactiveTestService = __decorate([
    Injectable()
], ReactiveTestService);
export { ReactiveTestService };
//# sourceMappingURL=reactive-test.service.js.map