const path = require('path');
const pkg = require('./package.json');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const importHtml = require('./scripts/custom-html-fetcher');
const { scssFetcher } = require('./scripts/custom-scss-fetcher');
const scss = require('rollup-plugin-scss');
const bundleSize = require('rollup-plugin-bundle-size');
const copy = require('rollup-plugin-copy');
const terser = require('@rollup/plugin-terser');

module.exports = {
    input: './src/index.ts',
    output: {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
    },
    external: [/@babel\/runtime/],
    plugins: [
        resolve(),
        commonjs(),
        // scss({
        //     include: ['./src/lib/**/*.css', './src/lib/**/*.scss', './src/lib/**/*.sass'],
        //     sass: require('node-sass'),
        // }),
        importHtml({
            include: ['src/lib/**/*.html', 'src/modules/**/*.html'],
        }),
        scssFetcher({
            include: ['src/lib/**/*.scss', 'src/modules/**/*.scss'],
        }),
        typescript({
            outputToFilesystem: true,
            tsconfig: path.join(__dirname, 'tsconfig.json'),
        }),

        babel({
            babelHelpers: 'runtime',
            extensions: ['.ts'],
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: pkg.browserslist.modern,
                        debug: true,
                    },
                ],
            ],
            plugins: ['@babel/transform-runtime'],
            exclude: 'node_modules/**',
        }),
        bundleSize(),
        copy({
            targets: [
                {
                    src: 'package.json',
                    dest: './dist',
                    transform: (contents) => {
                        const json = JSON.parse(contents.toString());
                        delete json.scripts;
                        delete json.devDependencies;

                        return JSON.stringify(json, null, 4);
                    },
                },
                {
                    src: 'README.md',
                    dest: './dist',
                },
                {
                    src: 'docs',
                    dest: './dist',
                },
                {
                    src: '.npmignore',
                    dest: './dist',
                },
            ],
        }),
        // terser({ format: { comments: false } }),
    ],
};
