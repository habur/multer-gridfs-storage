import test from 'ava';

import {cleanStorage, mongoVersion} from './utils/testutils';
import {storageOpts} from './utils/settings';
import GridFsStorage from '..';

test.afterEach.always('cleanup', t => {
	return cleanStorage(t.context.storage);
});

test('is compatible with an options object on url based connections', async t => {
	const {url, options} = storageOpts();
	const storage = new GridFsStorage({
		url,
		options: {...options, poolSize: 10}
	});
	t.context.storage = storage;

	await storage.ready();
	t.is(
		mongoVersion[0] === 3
			? storage.db.serverConfig.s.options.poolSize
			: storage.db.serverConfig.s.poolSize,
		10
	);
});
