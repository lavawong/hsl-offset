'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var chalk = _interopDefault(require('chalk'));
var semver = _interopDefault(require('semver'));
var commander = _interopDefault(require('commander'));
var convert = _interopDefault(require('color-convert'));

const NODE_ERR = 1;

const name = "hsl-offset";
const version = "1.0.3";
const description = "calculator two rgb color hsl offset";
const engines = { "node": ">=4.8.3" };
const repository = "qiangyee/hsl-offset";
const bin = "bin/hsl-offset";
const scripts = { "prepublish": "./node_modules/.bin/rollup -c rollup.config.js", "dev": "./node_modules/.bin/rollup -c rollup.config.js -w" };
const author = "Lava Wong <lazy.false@gmail.com>";
const license = "MIT";
const dependencies = { "chalk": "^2.0.1", "commander": "^2.11.0", "semver": "^5.3.0", "color-convert": "2.14.2" };
const devDependencies = { "babel-preset-es2015": "^6.24.1", "eslint": "^4.1.1", "eslint-config-airbnb": "^15.0.2", "eslint-plugin-import": "^2.7.0", "eslint-plugin-jsx-a11y": "^6.0.2", "eslint-plugin-react": "^7.1.0", "rollup": "^0.43.0", "rollup-plugin-babel": "^2.7.1", "rollup-plugin-json": "^2.3.0", "rollup-watch": "^4.0.0" };
var packageJson = {
  name: name,
  version: version,
  description: description,
  engines: engines,
  repository: repository,
  bin: bin,
  scripts: scripts,
  author: author,
  license: license,
  dependencies: dependencies,
  devDependencies: devDependencies
};

// import {rgbToHsl} from './color-conversion-algorithms';
let inputOriginColor;
let inputDestColor;

var cmd = function (argv) {
    const program = new commander.Command(packageJson.name).version(packageJson.version).usage(`${chalk.green('<origin-rgb-color> <dest-rgb-color>')}`).arguments('<origin-rgb-color> <dest-rgb-color>').action((originColor, destColor) => {
        inputOriginColor = originColor;
        inputDestColor = destColor;
    }).option('--verbose', 'print additional logs').allowUnknownOption().on('-h, --help', () => {
        console.log(`    Both ${chalk.green('<origin-rgb-color>> and <dest-rgb-color>')} is required.`);
        console.log();
    });

    program.parse(process.argv);
    // console.log(inputOriginColor, inputDestColor);
    function isValidate(rgbHex) {
        let validateRgb = /([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})|([a-fA-F0-9]{3})/;
        return typeof rgbHex !== 'undefined' && validateRgb.test(rgbHex);
    }
    if (!isValidate(inputDestColor) || !isValidate(inputDestColor)) {
        console.error('Please specify the origin color and dest color');
        console.log(`   ${chalk.cyan(program.name())} ${chalk.green('<origin-rgb-color> <dest-rgb-color>')}`);
        console.log();
        console.log('For example:');
        console.log(`  ${chalk.cyan(program.name())} ${chalk.green('dd0a20 35a1d4')}`);
        console.log(`  ${chalk.cyan(program.name())} ${chalk.green('da2 5a1')}`);
        console.log();
        console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
        /* eslint no-process-exit:"off" */
        process.exit(NODE_ERR);
    }
    let org = convert.hex.rgb(inputOriginColor),
        dest = convert.hex.rgb(inputDestColor);

    if (org && dest) {
        let orgBrHCG = convert.rgb.hsl(org);
        let desBrHCG = convert.rgb.hsl(dest);

        let hueOffset = desBrHCG[0] - orgBrHCG[0];
        console.log(chalk.cyan('Your postcss hsl offset is: '), chalk.yellow('color') + '(' + `${chalk.yellow('var')}(${chalk.blue('#' + inputOriginColor)}) ${chalk.yellow('h')}(${hueOffset == 0 ? '' : (hueOffset > 0 ? '+' : '') + chalk.blue(hueOffset)}) ${chalk.yellow('s')}(${chalk.blue(desBrHCG[1])}%) ${chalk.yellow('l')}(${chalk.blue(desBrHCG[2])}%)` + ')');
    }
};

/* global require, process */
const currentNodeVersion = process.versions.node;

if (semver.lt(currentNodeVersion, '4.0.0')) {
    const errMsg = `You are running Node ${currentNodeVersion}.
Create React App requires Node 4 or higher.
Please update your version of Node.`;
    console.error(chalk.red(errMsg));
    /* eslint no-process-exit:"off" */
    process.exit(NODE_ERR);
}
var index = {
    run: function (argv) {
        cmd(argv);
    }
};

module.exports = index;
