import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Slider } from '../';

// TODO: add interaction tests. It will require some work on the component itself.
describe('Slider', () => {
	it('is truthy', () => {
		expect.hasAssertions();

		expect(Slider).toBeTruthy();
	});
	// TODO: this is sort of an accessiblity nightmare currently
	it('should be aXe compliant', async () => {
		expect.hasAssertions();

		const { container } = render(<Slider value={0} stopCount={5} onStop={() => {}} />);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
