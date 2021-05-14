import React from 'react';
import { render, axe, userEvent, screen } from '../../../test-utils';

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

	// TODO: fix act warnings with popovers
	it('will toggle', () => {
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
				<Listbox.Toggle>{'FireFox'}</Listbox.Toggle>
				<Listbox.Dropdown>
					<Listbox.Option id={'f'}>{'Firefox Choice'}</Listbox.Option>
					<Listbox.Option id="ie" disabled>
						Internet Explorer
					</Listbox.Option>
				</Listbox.Dropdown>
			</Listbox>,
		);

		expect(screen.queryByText('Firefox Choice')).toBeFalsy();
		userEvent.click(screen.getByText('FireFox'));
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
		userEvent.click(screen.getByText('FireFox'));
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it('handles selecting a value', () => {
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
		userEvent.click(screen.getByText('Firefox Choice'));
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
