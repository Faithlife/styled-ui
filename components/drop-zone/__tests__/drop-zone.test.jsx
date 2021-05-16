import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { DropZone } from '../';

// TODO: add an interaction test
describe('DropZone', () => {
	it('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(<DropZone onDrop={() => {}}>Drop files</DropZone>);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
