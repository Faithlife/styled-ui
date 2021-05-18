import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Menu } from '../';

describe('Menu', () => {
	it('and its children are truthy', () => {
		expect.hasAssertions();

		expect(Menu).toBeTruthy();
		expect(Menu.Toggle).toBeTruthy();
		expect(Menu.Dropdown).toBeTruthy();
		expect(Menu.Item).toBeTruthy();
		expect(Menu.LinkItem).toBeTruthy();
		expect(Menu.Separator).toBeTruthy();
		expect(Menu.ActionButton).toBeTruthy();
		expect(Menu.ItemIcon).toBeTruthy();
		expect(Menu.ItemPrimaryText).toBeTruthy();
		expect(Menu.ItemSecondaryText).toBeTruthy();
		expect(Menu.Title).toBeTruthy();
		expect(Menu.ItemTextContainer).toBeTruthy();
	});

	// TODO: fix act warnings with popovers
	it('will toggle', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		const { rerender } = render(
			<Menu isOpen={false} onToggleMenu={callback}>
				<Menu.Toggle>Show a Dropdown!</Menu.Toggle>
				<Menu.Dropdown>
					<Menu.Item onClick={() => {}}>Menu Item 1</Menu.Item>
					<Menu.Item onClick={() => {}}>Menu Item 2</Menu.Item>
					<Menu.Item disabled onClick={() => {}}>
						Menu Item 3
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>,
		);

		expect(screen.queryByText('Menu Item 1')).toBeFalsy();
		userEvent.click(screen.getByText('Show a Dropdown!'));
		expect(callback).toHaveBeenCalledTimes(1);

		rerender(
			<Menu isOpen={true} onToggleMenu={callback}>
				<Menu.Toggle>Show a Dropdown!</Menu.Toggle>
				<Menu.Dropdown>
					<Menu.Item onClick={() => {}}>Menu Item 1</Menu.Item>
					<Menu.Item onClick={() => {}}>Menu Item 2</Menu.Item>
					<Menu.Item disabled onClick={() => {}}>
						Menu Item 3
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>,
		);

		expect(screen.queryByText('Menu Item 1')).toBeVisible();
		userEvent.click(screen.getByText('Show a Dropdown!'));
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it('handles selecting an item', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<Menu isOpen={true} onToggleMenu={() => {}}>
				<Menu.Toggle>Show a Dropdown!</Menu.Toggle>
				<Menu.Dropdown>
					<Menu.Item onClick={callback}>Menu Item 1</Menu.Item>
					<Menu.Item onClick={() => {}}>Menu Item 2</Menu.Item>
					<Menu.Item disabled onClick={() => {}}>
						Menu Item 3
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>,
		);

		expect(screen.queryByText('Menu Item 1')).toBeVisible();
		userEvent.click(screen.getByText('Menu Item 1'));
		expect(callback).toHaveBeenCalled();
	});

	it('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Menu isOpen={true} onToggleMenu={() => {}}>
				<Menu.Toggle>Show a Dropdown!</Menu.Toggle>
				<Menu.Dropdown>
					<Menu.Item onClick={() => {}}>Menu Item 1</Menu.Item>
					<Menu.Item onClick={() => {}}>Menu Item 2</Menu.Item>
					<Menu.Item disabled onClick={() => {}}>
						Menu Item 3
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
