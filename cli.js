#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import npmUser from 'npm-user';
import chalk from 'chalk';
import terminalLink from 'terminal-link';

const cli = meow(`
	Usage
	  $ npm-user <username>

	Example
	  $ npm-user sindresorhus
	  Name: Sindre Sorhus
	 Email: sindresorhus@gmail.com
	GitHub: sindresorhus
       Twitter: sindresorhus
`, {
	importMeta: import.meta,
});

const [username] = cli.input;

if (!username) {
	console.error(chalk.red('Specify an npm username'));
	process.exit(1);
}

(async () => {
	const user = await npmUser(username);
	const rows = [];

	const createRow = (prefix, key) => {
		if (user[key]) {
			if (key === 'github') {
				rows.push(`${chalk.green(prefix)}: ${chalk.bold("@"+user[key])} ${chalk.gray(terminalLink(`(Click Here)`, `https://github.com/${user[key]}`))}`);
			} else if (key === 'twitter') {
				rows.push(`${chalk.green(prefix)}: ${chalk.bold("@"+user[key])} ${chalk.gray(terminalLink(`(Click Here)`, `https://twitter.com/${user[key]}`))}`);
			} else {
				rows.push(`${chalk.green(prefix)}: ${chalk.bold(user[key])}`);
			}
		}
	};

	createRow('Name', 'name');
	createRow('Email', 'email');
	createRow('GitHub', 'github');
	createRow('Twitter', 'twitter');

	console.log(rows.join('\n'));
})();
