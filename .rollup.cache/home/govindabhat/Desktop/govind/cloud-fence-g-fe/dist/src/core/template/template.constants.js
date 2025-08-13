export const global = globalThis;
export const documentObject = global.document === undefined
    ? {
        createTreeWalker() {
            return {};
        },
    }
    : document;
/** used instead of `null` */
export const nothing = Symbol.for('nothing');
/** first time rendering templates will wait here to render in group */
export const fragmentRender = [];
//# sourceMappingURL=template.constants.js.map