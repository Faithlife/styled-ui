import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Button } from '../';

describe('button', () => {
	it('should respond to user click', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<Button primary medium onClick={callback}>
				{'Click Me'}
			</Button>,
		);

		userEvent.click(screen.getByText('Click Me'));

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Button primary medium>
				{'Click Me'}
			</Button>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
