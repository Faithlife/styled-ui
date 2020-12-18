/* globals describe, it */
import assert from 'assert';

/* eslint-disable global-require */
describe('components', () => {
	it('should not crash when imported', () => {
		assert.doesNotThrow(() => require('../dist/main'));
		assert.doesNotThrow(() => require('../dist/text-input'));
		assert.doesNotThrow(() => require('../dist/share-dialog'));
	});
});
