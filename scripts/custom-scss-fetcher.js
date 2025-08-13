const scss = require('rollup-plugin-scss');
const { createFilter } = require('rollup-pluginutils');

function scssFetcher(opts = {}) {
    if (!opts.include) {
        throw Error('include option should be specified');
    }

    const filter = createFilter(opts.include, opts.exclude);

    return {
        name: 'scssFetcher',

        transform(code, id) {
            if (filter(id)) {
                // // const style = scss({
                // //     include: ['./src/lib/**/*.css', './src/lib/**/*.scss', './src/lib/**/*.sass'],
                // //     sass: require('node-sass'),
                // // });
                // console.log('===============Starts================');
                // console.log(code);
                // console.log('----------------ends----------------');
                return {
                    code: `export default ${JSON.stringify(code)};`,
                    map: { mappings: '' },
                };
            }
        },
    };
}

exports.scssFetcher = scssFetcher;
