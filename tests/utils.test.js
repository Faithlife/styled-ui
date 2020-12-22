/* globals describe, it, expect */
import { applyVariations } from '../components/utils';

describe('applyVariations', () => {
	it('should return filtered props', () => {
		const variationMap = {
			medium: component => component,
		};

		const component = {};

		expect(applyVariations(component, variationMap, { medium: true, disabled: true })).toEqual({
			component,
			filteredProps: { disabled: true },
		});
	});
});
