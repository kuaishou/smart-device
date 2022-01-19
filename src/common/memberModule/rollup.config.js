
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');

const { uglify } = require('rollup-plugin-uglify');

const inputOptions = {
  input:__dirname+ '/src/index.js',
  plugins: [
    resolve(),
    buble(),
    commonjs(),
    // uglify({
    //   compress: {
    //     pure_getters: true,
    //     unsafe: true,
    //     unsafe_comps: true,
    //     warnings: false
    //   }
    // })
  ]
};
const outputOptions = {
  file: __dirname+'/dist/index.js',
  name: 'memberModule',
  format: 'umd'
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // console.log(bundle.imports); // an array of external dependencies
  // console.log(bundle.exports); // an array of names exported by the entry point
  // console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();