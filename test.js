import {execa} from 'execa';
import test from 'ava';

// Note: Not a full implementation, don't use elsewhere
const dedent = string_ => string_.split('\n').slice(1, -1).map(x => x.trim()).join('\n');

const verify = test.macro(async (t, {args, expected, error}) => {
	const {stdout, stderr} = await execa('./cli.js', args.split(' '), {reject: false, env: {NO_COLOR: '1'}});

	if (error) {
		t.is(stderr, error);
	} else {
		t.is(stdout, expected);
	}
});

test('main', verify, {
	args: 'sindresorhus',
	expected: dedent(`
		ℹ Name: Sindre Sorhus
		ℹ Email: sindresorhus@gmail.com
		ℹ GitHub: sindresorhus
		ℹ Twitter: sindresorhus
	`),
});

test('no username', verify, {
	args: '',
	error: 'Specify an npm username',
});

test('non-existant user', verify, {
	args: 'nnnope',
	error: '✖ User `nnnope` could not be found.',
});
