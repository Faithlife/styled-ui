import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ShareDialog } from '../';

// TODO test copy interaction. The component will need an update to facilitate this
describe('ShareDialog', () => {
	beforeAll(() => {
		window.ResizeObserver = jest.fn(() => ({
			disconnect: jest.fn(),
			observe: jest.fn(),
			unobserve: jest.fn(),
		}));
	});

	it('is truthy', () => {
		expect.hasAssertions();

		expect(ShareDialog).toBeTruthy();
	});

	it('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<ShareDialog
				isOpen={true}
				shareUrl={'Test me!'}
				message={'Share dialog'}
				onClose={() => {}}
			/>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
