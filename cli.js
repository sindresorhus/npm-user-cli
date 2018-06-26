#!/usr/bin/env node
'use strict';
const meow = require('meow');
const npmUser = require('npm-user');

const cli = meow(`
	Usage
	  $ npm-user <username>

	Example
	  $ npm-user sindresorhus
	  Name: Sindre Sorhus
	  Email: sindresorhus@gmail.com
	  GitHub: sindresorhus
	  Twitter: sindresorhus
`);

const [username] = cli.input;

if (!username) {
	console.error('Specify an npm username');
	process.exit(1);
}

(async () => {
	const user = await npmUser(username);

	const ret = [];

	const createRow = (prefix, key) => {
		if (user[key]) {
			ret.push(`${prefix}: ${user[key]}`);
		}
	};

	createRow('Name', 'name');
	createRow('Email', 'email');
	createRow('GitHub', 'github');
	createRow('Twitter', 'twitter');

	console.log(ret.join('\n'));
})();
