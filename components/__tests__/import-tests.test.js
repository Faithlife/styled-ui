describe('components', () => {
	it.skip('should not crash when imported', () => {
		expect(() => require('../../dist/main')).not.toThrow();
		expect(() => require('../../dist/text-input')).not.toThrow();
		expect(() => require('../../dist/share-dialog')).not.toThrow();
	});
});
