import {execa} from 'execa';
import test from 'ava';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['sindresorhus']);
	const [firstRow] = stdout.split('\n');

	t.is(firstRow, 'Name: Sindre Sorhus');
});

test('no username', async t => {
	const {stderr} = await t.throwsAsync(execa('./cli.js'));
	t.is(stderr, 'Specify an npm username');
});
