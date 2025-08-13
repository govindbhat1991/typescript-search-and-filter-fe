const pkg = require('./package.json');
const importHtml = require('./scripts/custom-html-fetcher');
const { scssFetcher } = require('./scripts/custom-scss-fetcher');
import path from 'path';
import glob from 'glob';
import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';
import bundleSize from 'rollup-plugin-bundle-size';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

export default defineConfig({
    base: '/',
    root: path.join(__dirname, 'src'),
    build: {
        outDir: path.join(__dirname, 'dist'),
        watch: {
            include: 'src/**',
        },
        sourcemap: true, // Must be true or 'hidden'
        rollupOptions: {
            input: glob.sync(path.resolve(__dirname, 'src', 'index.ts')),
            external: [/@babel\/runtime/],
            plugins: [
                resolve(),
                commonjs(),
                importHtml({
                    include: 'src/lib/**/*.html',
                }),
                scssFetcher({
                    include: 'src/lib/**/*.scss',
                }),
                typescript({
                    outputToFilesystem: true,
                    tsconfig: path.join(__dirname, 'tsconfig.json'),
                }),
                scss({
                    include: [
                        './src/assets/scss/**/*.css',
                        './src/assets/scss/**/*.scss',
                        './src/assets/scss/**/*.sass',
                    ],
                    sass: require('node-sass'),
                    fileName: 'bundle.css',
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
                // bundleSize(),
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
                terser({ format: { comments: false } }),
            ],
        },
    },
});
