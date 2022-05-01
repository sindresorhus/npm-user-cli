import {execa} from 'execa';
import test from 'ava';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['sindresorhus']);
	t.is(stdout.split('\n')[0], 'Name: Sindre Sorhus');
});
