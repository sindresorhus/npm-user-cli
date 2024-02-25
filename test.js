import {execa} from 'execa';
import test from 'ava';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['sindresorhus']);
	t.regex(stdout, /Name: Sindre Sorhus/);
});

test('no username', async t => {
	const {stderr} = await t.throwsAsync(execa('./cli.js'));
	t.is(stderr, 'Specify an npm username');
});
