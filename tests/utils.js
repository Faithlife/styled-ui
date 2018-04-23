import assert from 'assert';
import { applyVariations } from '../components/utils';

describe('applyVariations', () =>
	it('should return filtered props', () => {
		const variationMap = {
			medium: component => component,
		};

		const component = {};

		assert.deepEqual(
			{ component, filteredProps: { disabled: true } },
			applyVariations(component, variationMap, { medium: true, disabled: true }),
		);
	}));
