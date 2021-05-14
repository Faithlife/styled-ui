import React from 'react';
import { render, axe, userEvent, screen } from '../../../test-utils';

import { Popover } from '../';

describe('Popover', () => {
	it('shows children', () => {
		expect.hasAssertions();

		const ref = React.createRef();
		render(
			<>
				<button ref={ref}>Show a Popover!</button>
				<Popover reference={ref.current} placement="top" onFocusAway={() => {}}>
					{'Test me!'}
				</Popover>
			</>,
		);

		expect(screen.getByText('Test me!')).toBeVisible();
	});

	it('closes when losing focus', () => {
		expect.hasAssertions();

		// HACK could be a bit flaky, but due to the fact that refs are never set during testing we kinda have to fake it
		const ref = { current: { contains: jest.fn(() => false) } }; // React.createRef();
		const callback = jest.fn();
		render(
			<>
				<button>Not referenced</button>
				<button ref={ref}>Show a Popover!</button>
				<Popover reference={ref.current} placement="top" onFocusAway={callback}>
					{'Test me!'}
				</Popover>
			</>,
		);

		expect(callback).not.toHaveBeenCalled();
		expect(screen.getByText('Test me!')).toHaveFocus();

		userEvent.click(screen.getByText('Not referenced'));
		expect(screen.getByText('Not referenced')).toHaveFocus();
		expect(callback).toHaveBeenCalled();
	});

	it('should be aXe compliant', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Popover reference={{}} placement="top" onFocusAway={() => {}}>
				{'Test me!'}
			</Popover>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
