/* globals describe, it */
import assert from 'assert';
global.HTMLElement = () => {};

describe('components', () => {
	it('should not crash when imported', () => {
		assert.doesNotThrow(() => require('../dist/main')); // eslint-disable-line
	});
});
