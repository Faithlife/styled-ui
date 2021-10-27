import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Popover } from '../';

const fakeRef = {
	getBoundingClientRect() {
		return {
			width: 0,
			height: 0,
			top: 0,
			right: 100,
			bottom: 100,
			left: 0,
		};
	},
	contains() {
		return false;
	},
};

describe('Popover', () => {
	it('shows children', async () => {
		expect.hasAssertions();

		render(
			<>
				<button>Show a Popover!</button>
				<Popover reference={fakeRef} placement="top" onFocusAway={() => {}}>
					{'Test me!'}
				</Popover>
			</>,
		);

		expect(await screen.findByText('Test me!')).toBeVisible();
	});

	it('closes when losing focus', async () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<>
				<button>Not referenced</button>
				<button>Show a Popover!</button>
				<Popover reference={fakeRef} placement="top" onFocusAway={callback}>
					{'Test me!'}
				</Popover>
			</>,
		);

		expect(callback).not.toHaveBeenCalled();
		expect(screen.getByText('Test me!')).toHaveFocus();

		await userEvent.click(await screen.findByText('Not referenced'));
		expect(screen.getByText('Not referenced')).toHaveFocus();
		expect(callback).toHaveBeenCalled();
	});

	it('should be aXe compliant', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Popover reference={fakeRef} placement="top" onFocusAway={() => {}}>
				{'Test me!'}
			</Popover>,
		);

		await act(async () => {
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});
