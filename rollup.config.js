// rollup.config.js
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry  : 'src/index.js',
    dest   : 'lib/index.js',
    format : 'cjs',
    plugins : [
        resolve({jsnext:false, main:true}),
        json({
            // All JSON files will be parsed by default,
            // but you can also specifically include/exclude files
            // include: 'node_modules/**',
            exclude : ['node_modules/**'],

            // for tree-shaking, properties will be declared as
            // variables, using either `var` or `const`
            preferConst : true, // Default: false

            // specify indentation for the generated default export —
            // defaults to '\t'
            indent : '  '
        }),
        babel({
            exclude : 'node_modules/**'
        })
    ],
    external: [ 'chalk', 'commander', 'semver', 'color-convert' ]
};