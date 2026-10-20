import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

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

	it('forwards supported legacy modifiers when a touch tooltip opens', async () => {
		window.matchMedia.mockReturnValueOnce({ matches: true });
		render(
			<Tooltip
				toggleOnClick
				placement="bottom"
				content="Billing help"
				modifiers={[{ name: 'preventOverflow', options: { padding: 12 } }]}
				data-testid="billing-tooltip"
			>
				{'Explain billing'}
			</Tooltip>,
		);

		await userEvent.click(screen.getByText('Explain billing'));

		expect(await screen.findByText('Billing help')).toBeVisible();
		await waitFor(() =>
			expect(screen.getByTestId('billing-tooltip')).toHaveAttribute(
				'data-popper-placement',
				'bottom',
			),
		);
		expect(screen.getByTestId('billing-tooltip')).not.toHaveAttribute('modifiers');
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
