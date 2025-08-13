import { Class } from './interfaces/generic.interface';
import { Runtime } from './runtime';

/** main start point of web components library */
export const bootstrap = (moduleClass: Class): void => {
    const runtime = new Runtime();
    runtime.initModule(moduleClass);
};
