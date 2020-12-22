/* globals describe, it, expect */

/* eslint-disable global-require */
describe('components', () => {
	it('should not crash when imported', () => {
		expect(() => require('../dist/main')).not.toThrow();
		expect(() => require('../dist/ag-grid')).not.toThrow();
		expect(() => require('../dist/text-input')).not.toThrow();
		expect(() => require('../dist/text-input-v2')).not.toThrow();
		expect(() => require('../dist/group-selector')).not.toThrow();
		expect(() => require('../dist/share-dialog')).not.toThrow();
	});
});
