import React from 'react';
import { render, axe, screen, userEvent } from '../../../test-utils';

import { Tab } from '../';

describe('Tab', () => {
	it('and its children are truthy', () => {
		expect.hasAssertions();

		expect(Tab).toBeTruthy();
		expect(Tab.Manager).toBeTruthy();
		expect(Tab.List).toBeTruthy();
		expect(Tab.Panels).toBeTruthy();
		expect(Tab.Panel).toBeTruthy();
	});

	it('should respond to user click', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		const { rerender } = render(
			<Tab.Manager selectedTab={0} onSelectedTabChange={callback}>
				<Tab.List>
					<Tab>First Tab</Tab>
					<Tab>Second Tab</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>First Tab!</Tab.Panel>
					<Tab.Panel>Second Tab!</Tab.Panel>
				</Tab.Panels>
			</Tab.Manager>,
		);

		expect(screen.getByText('First Tab!')).toBeVisible();
		expect(screen.getByText('Second Tab!')).not.toBeVisible();

		userEvent.click(screen.getByText('Second Tab'));
		expect(callback).toHaveBeenLastCalledWith(1);

		rerender(
			<Tab.Manager selectedTab={1} onSelectedTabChange={callback}>
				<Tab.List>
					<Tab>First Tab</Tab>
					<Tab>Second Tab</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>First Tab!</Tab.Panel>
					<Tab.Panel>Second Tab!</Tab.Panel>
				</Tab.Panels>
			</Tab.Manager>,
		);

		expect(screen.getByText('First Tab!')).not.toBeVisible();
		expect(screen.getByText('Second Tab!')).toBeVisible();
	});

	// TODO: make aXe compatible
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Tab.Manager selectedTab={1} onSelectedTabChange={() => {}}>
				<Tab.List>
					<Tab>First Tab</Tab>
					<Tab>Second Tab</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>First Tab!</Tab.Panel>
					<Tab.Panel>Second Tab!</Tab.Panel>
				</Tab.Panels>
			</Tab.Manager>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
