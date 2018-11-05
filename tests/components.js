/* globals describe, it */
import assert from 'assert';

describe('components', () => {
	it('should not crash when imported', () => {
		assert.doesNotThrow(require('../dist/main')); // eslint-disable-line
	});
});
