import React from 'react';
import { render, axe, userEvent, screen, waitFor } from '../../../test-utils';

import { Tooltip } from '../';

// TODO: find out why hovering is not working properly here
describe('Tooltip', () => {
	beforeAll(() => {
		window.matchMedia = jest.fn(query => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		}));
	});

	it('is truthy', () => {
		expect(Tooltip).toBeTruthy();
	});

	it.skip('shows children', async () => {
		expect.hasAssertions();

		render(<Tooltip content="hovered!">Hover me!</Tooltip>);

		userEvent.hover(screen.getByText('Hover me!'));
		await waitFor(() => expect(screen.getByText('hovered!')).toBeVisible());
	});

	it.skip('closes when not hovered', async () => {
		expect.hasAssertions();

		render(<Tooltip content="hovered!">Hover me!</Tooltip>);

		userEvent.hover(screen.getByText('Hover me!'));
		await waitFor(() => expect(screen.getByText('hovered!')).toBeVisible());

		userEvent.unhover(screen.getByText('Hover me!'));
		await waitFor(() => expect(screen.getByText('hovered!')).not.toBeVisible());
	});

	it('should be aXe compliant', async () => {
		expect.hasAssertions();

		const { container } = render(<Tooltip content="hovered!">Hover me!</Tooltip>);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
