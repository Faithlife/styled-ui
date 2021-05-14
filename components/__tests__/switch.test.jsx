import React from 'react';
import { render, axe, screen, userEvent } from '../../test-utils';

import { Switch } from '../Switch';

describe('Switch', () => {
	it('should respond to user click', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(<Switch onClick={callback} isChecked={false} />);

		userEvent.click(screen.getByRole('switch'));

		expect(callback).toHaveBeenCalledTimes(1);
	});

	// TODO: make aXe compatible
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(<Switch onClick={() => {}} isChecked={false} />);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
