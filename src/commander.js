import {NODE_ERR} from './constants';
import chalk from 'chalk';
import commander from 'commander';
import packageJson from '../package.json';
// import {rgbToHsl} from './color-conversion-algorithms';
import convert from 'color-convert';

let inputType, inputOriginColor, inputDestColor;

export default function (argv) {
    const program = new commander.Command(packageJson.name)
        .version(packageJson.version)
        .usage(`${chalk.green('<origin-rgb-color> <dest-rgb-color>')}`)
        .arguments('<origin-rgb-color> <dest-rgb-color>')
        .action((originColor, destColor) => {
            inputOriginColor = originColor;
            inputDestColor = destColor;
        })
        .option('--verbose', 'print additional logs')
        .allowUnknownOption()
        .on('-h, --help', () => {
            console.log(`    Both ${chalk.green('<origin-rgb-color>> and <dest-rgb-color>')} is required.`);
            console.log();
        });

    program.parse(process.argv);
    // console.log(inputOriginColor, inputDestColor);
    function isValidate (rgbHex) {
        let validateRgb = /([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})|([a-fA-F0-9]{3})/;
        return typeof rgbHex !== 'undefined' && validateRgb.test(rgbHex);
    }
    if (!isValidate(inputDestColor) || !isValidate(inputDestColor)) {
        console.error('Please specify the origin color and dest color');
        console.log(
            `   ${chalk.cyan(program.name())} ${chalk.green('<origin-rgb-color> <dest-rgb-color>')}`
        );
        console.log();
        console.log('For example:');
        console.log(`  ${chalk.cyan(program.name())} ${chalk.green('dd0a20 35a1d4')}`);
        console.log(`  ${chalk.cyan(program.name())} ${chalk.green('da2 5a1')}`);
        console.log();
        console.log(
            `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
        );
        /* eslint no-process-exit:"off" */
        process.exit(NODE_ERR);
    }
    let org = convert.hex.rgb(inputOriginColor),
        dest = convert.hex.rgb(inputDestColor);

    if (org && dest) {
        let orgBrHCG = convert.rgb.hsl(org);
        let desBrHCG = convert.rgb.hsl(dest);

        let hueOffset = desBrHCG[0] - orgBrHCG[0];
        console.log(chalk.cyan('Your postcss hsl offset is: '),
            chalk.yellow('color')+'('
            + `${chalk.yellow('var')}(${chalk.blue('#'+inputOriginColor)}) ${chalk.yellow('h')}(${hueOffset == 0 ? '' : (hueOffset > 0 ? '+' : '') + chalk.blue(hueOffset)}) ${chalk.yellow('s')}(${chalk.blue(desBrHCG[1])}%) ${chalk.yellow('l')}(${chalk.blue(desBrHCG[2])}%)`
            + ')')
    }

};

