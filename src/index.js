/* global require, process */
import {NODE_ERR} from './constants';
import chalk from 'chalk';
import semver from 'semver';
import cmd from './commander';
const currentNodeVersion = process.versions.node;

if (semver.lt(currentNodeVersion, '4.0.0')) {
    const errMsg = `You are running Node ${currentNodeVersion}.
Create React App requires Node 4 or higher.
Please update your version of Node.`;
    console.error(
        chalk.red(
            errMsg
        )
    );
    /* eslint no-process-exit:"off" */
    process.exit(NODE_ERR);
}
export default {
    run: function(argv){
        cmd(argv);
    }
}

