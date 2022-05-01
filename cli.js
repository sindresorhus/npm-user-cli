#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import npmUser from 'npm-user';

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
	console.error('Specify an npm username');
	process.exit(1);
}

(async () => {
	const user = await npmUser(username);
	const rows = [];

	const createRow = (prefix, key) => {
		if (user[key]) {
			rows.push(`${prefix}: ${user[key]}`);
		}
	};

	createRow('Name', 'name');
	createRow('Email', 'email');
	createRow('GitHub', 'github');
	createRow('Twitter', 'twitter');

	console.log(rows.join('\n'));
})();
