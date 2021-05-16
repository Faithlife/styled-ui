import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../';

describe('Checkbox', () => {
	it('should respond to user click', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(<Checkbox onClick={callback} isChecked={false} title="Click me" type="button" />);

		userEvent.click(screen.getByText('Click me'));

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Checkbox onClick={() => {}} isChecked={false} title="Click me" type="button" />,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
