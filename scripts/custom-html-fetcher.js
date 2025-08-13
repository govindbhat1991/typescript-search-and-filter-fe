const { createFilter } = require('rollup-pluginutils');

const isHTMLString = (code) => new RegExp('^html`').test(code) && typeof code === 'string';

const getHtml = (code) => {
    const htmlLiteral = `import { html } from '@wok/web-component/core';`;
    const transformedStringCode = (code) => `${htmlLiteral} export default function() { return \`${code}\`; }`;
    const transformedHTMLCode = (code) => `${htmlLiteral} export default function() { return ${code}; }`;
    return isHTMLString(code) ? transformedHTMLCode(code) : transformedStringCode(code);
};

// @TODO, get notes from rollup-plugin-import-lithtml
module.exports = function importHtml(options = {}) {
    const filter = createFilter(options.include || '**/*.html', options.exclude);
    return {
        name: 'import-html',

        async transform(code, id) {
            if (!filter(id)) {
                return null;
            }

            return {
                code: getHtml(code),
                map: { mappings: '' },
            };
        },
    };
};
