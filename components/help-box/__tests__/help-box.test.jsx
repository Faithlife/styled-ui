import React from 'react';
import { render, axe, screen, userEvent } from '../../../test-utils';

import { HelpBox } from '../';

describe('HelpBox', () => {
	it('should close when x button clicked', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<HelpBox variant="primary" handleClose={callback}>
				<HelpBox.Body>This is a helpful alert.</HelpBox.Body>
			</HelpBox>,
		);

		userEvent.click(screen.getByLabelText('Close'));
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<HelpBox variant="primary" handleClose={() => {}}>
				<HelpBox.Body>This is a helpful alert.</HelpBox.Body>
			</HelpBox>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
