import { Injectable } from '@wok/web-component/core';

@Injectable()
export class ReactiveTestService {
    getClickMap() {
        return this.fakeBackend().then((clickMap) => clickMap);
    }

    private fakeBackend(): Promise<{ date: Date; active: boolean }[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    Array(Math.floor(Math.random() * (20 - 0 + 0)) + 0)
                        .fill(0)
                        .map(() => ({ date: new Date(), active: true }))
                );
            }, 1000);
        });
    }
}
