import React from 'react';
import { render, axe } from '../../../test-utils';

import { ImageWell } from '../';

// TODO: add an interaction test
describe('ImageWell', () => {
	it('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<ImageWell previewUrl={''} onSelectImage={() => {}} onRemoveImage={() => {}} />,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
