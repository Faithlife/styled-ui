import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Listbox } from '../';

describe('Listbox', () => {
	it('and its children are truthy', () => {
		expect.hasAssertions();

		expect(Listbox).toBeTruthy();
		expect(Listbox.Toggle).toBeTruthy();
		expect(Listbox.Dropdown).toBeTruthy();
		expect(Listbox.Option).toBeTruthy();
		expect(Listbox.Separator).toBeTruthy();
		expect(Listbox.ActionButton).toBeTruthy();
		expect(Listbox.ItemIcon).toBeTruthy();
		expect(Listbox.ItemPrimaryText).toBeTruthy();
		expect(Listbox.ItemSecondaryText).toBeTruthy();
		expect(Listbox.Title).toBeTruthy();
		expect(Listbox.OptionTextContainer).toBeTruthy();
	});

	it('will toggle', async () => {
		expect.hasAssertions();

		const callback = jest.fn();
		const { rerender } = render(
			<Listbox
				isOpen={false}
				onItemSelect={id => {}}
				selectedId={'f'}
				onToggleMenu={callback}
				labelledBy="listboxLabel"
				width="100px"
			>
				<Listbox.Toggle>{'Browser'}</Listbox.Toggle>
				<Listbox.Dropdown>
					<Listbox.Option id={'f'}>{'Firefox Choice'}</Listbox.Option>
					<Listbox.Option id="ie" disabled>
						Internet Explorer
					</Listbox.Option>
				</Listbox.Dropdown>
			</Listbox>,
		);

		expect(screen.queryByText('Firefox Choice')).toBeFalsy();
		await userEvent.click(screen.getByText('Browser'));
		expect(callback).toHaveBeenCalledTimes(1);

		rerender(
			<Listbox
				isOpen={true}
				onItemSelect={id => {}}
				selectedId={'f'}
				onToggleMenu={callback}
				labelledBy="listboxLabel"
				width="100px"
			>
				<Listbox.Toggle>{'Browser'}</Listbox.Toggle>
				<Listbox.Dropdown>
					<Listbox.Option id={'f'}>{'Firefox Choice'}</Listbox.Option>
					<Listbox.Option id="ie" disabled>
						Internet Explorer
					</Listbox.Option>
				</Listbox.Dropdown>
			</Listbox>,
		);

		expect(await screen.findByText('Firefox Choice')).toBeVisible();
		await userEvent.click(screen.getByText('Browser'));
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it('handles selecting a value', async () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<Listbox
				isOpen={true}
				onItemSelect={callback}
				selectedId={'f'}
				onToggleMenu={() => {}}
				labelledBy="listboxLabel"
				width="100px"
			>
				<Listbox.Toggle>{'FireFox'}</Listbox.Toggle>
				<Listbox.Dropdown>
					<Listbox.Option id={'f'}>{'Firefox Choice'}</Listbox.Option>
					<Listbox.Option id="ie" disabled>
						Internet Explorer
					</Listbox.Option>
				</Listbox.Dropdown>
			</Listbox>,
		);

		expect(screen.queryByText('Firefox Choice')).toBeVisible();
		await userEvent.click(await screen.findByText('Firefox Choice'));
		expect(callback).toHaveBeenCalledWith('f');
	});

	// TODO: make aXe compliant
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Listbox
				isOpen={true}
				onItemSelect={id => {}}
				selectedId={'f'}
				onToggleMenu={() => {}}
				labelledBy="listboxLabel"
				width="100px"
			>
				<Listbox.Toggle>{'FireFox'}</Listbox.Toggle>
				<Listbox.Dropdown>
					<Listbox.Option id={'f'}>{'Firefox'}</Listbox.Option>
					<Listbox.Option id="ie" disabled>
						Internet Explorer
					</Listbox.Option>
				</Listbox.Dropdown>
			</Listbox>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
