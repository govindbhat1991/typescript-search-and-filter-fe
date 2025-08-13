import { DocumentFragmentRenderer } from './template.interface';

export const global = globalThis;

export const documentObject =
    global.document === undefined
        ? ({
              createTreeWalker() {
                  return {};
              },
          } as unknown as Document)
        : document;

/** used instead of `null` */
export const nothing = Symbol.for('nothing');

/** first time rendering templates will wait here to render in group */
export const fragmentRender: DocumentFragmentRenderer[] = [];
