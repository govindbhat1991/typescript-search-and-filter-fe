import { Runtime } from './runtime';
/** main start point of web components library */
export const bootstrap = (moduleClass) => {
    const runtime = new Runtime();
    runtime.initModule(moduleClass);
};
//# sourceMappingURL=bootstrap.js.map