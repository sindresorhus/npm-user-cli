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
	  Homepage: http://sindresorhus.com
	  Twitter: sindresorhus
	  GitHub: sindresorhus
	  Freenode: sindresorhus
`);

const username = cli.input[0];

if (!username) {
	console.error('Specify an npm username');
	process.exit(1);
}

npmUser(username).then(user => {
	const ret = [];

	const createRow = (prefix, key) => {
		if (user[key]) {
			ret.push(`${prefix}: ${user[key]}`);
		}
	};

	createRow('Name', 'name');
	createRow('Email', 'email');
	createRow('Homepage', 'homepage');
	createRow('GitHub', 'github');
	createRow('Twitter', 'twitter');
	createRow('Freenode', 'freenode');

	console.log(ret.join('\n'));
});
