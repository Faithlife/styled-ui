import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../button';
import { Checkbox } from '../check-box';
import { HelpBox } from '../help-box';
import { ImageWell } from '../image-well';
import { LoadingSpinner } from '../loading-spinner';
import { Menu } from '../menu';
import { Modal } from '../modal';
import { ParameterSentence } from '../parameter-sentence';
import { Radio } from '../radio';
import { Switch } from '../Switch';
import { Tab } from '../tabs';
import { ThemedBox } from '../ThemedBox';
import { NumberInput } from '../input';

describe('function-component defaults', () => {
	it('defaults Button to the primary variant and accepts an override', () => {
		const { rerender } = render(<Button>Save</Button>);
		const button = screen.getByRole('button', { name: 'Save' });

		expect(button).toHaveStyle({
			backgroundColor: 'rgb(30, 145, 214)',
			color: 'rgb(255, 255, 255)',
		});

		rerender(<Button variant="secondary">Save</Button>);
		expect(button).toHaveStyle({
			backgroundColor: 'rgb(255, 255, 255)',
			color: 'rgb(30, 145, 214)',
		});
	});

	it('defaults Checkbox to a button type and accepts an override', () => {
		const onClick = () => {};
		const { rerender } = render(<Checkbox onClick={onClick} />);

		expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'button');

		rerender(<Checkbox onClick={onClick} type="submit" />);
		expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'submit');
	});

	it('defaults Radio to a button type and accepts an override', () => {
		const onClick = () => {};
		const { rerender } = render(<Radio onClick={onClick} />);

		expect(screen.getByRole('radio')).toHaveAttribute('type', 'button');

		rerender(<Radio onClick={onClick} type="submit" />);
		expect(screen.getByRole('radio')).toHaveAttribute('type', 'submit');
	});

	it('uses default ImageWell select copy and accepts localized copy', () => {
		const props = { onSelectImage: () => {} };
		const { rerender } = render(<ImageWell {...props} />);

		expect(screen.getByText('+ Add Image')).toBeInTheDocument();

		rerender(<ImageWell {...props} localizedResources={{ selectText: 'Choose an image' }} />);
		expect(screen.getByText('Choose an image')).toBeInTheDocument();
		expect(screen.queryByText('+ Add Image')).not.toBeInTheDocument();
	});

	it('defaults HelpBox to primary and accepts a non-primary variant', () => {
		const { rerender } = render(<HelpBox data-testid="help-box">Helpful alert</HelpBox>);
		const helpBox = screen.getByTestId('help-box');

		expect(helpBox).toHaveStyle({ backgroundColor: 'rgb(235, 247, 255)' });

		rerender(
			<HelpBox data-testid="help-box" variant="success">
				Helpful alert
			</HelpBox>,
		);
		expect(helpBox).toHaveStyle({ backgroundColor: 'rgb(233, 248, 225)' });
	});

	it('defaults LoadingSpinner to small and accepts an override', () => {
		const { rerender } = render(<LoadingSpinner data-testid="spinner" />);
		const spinner = screen.getByTestId('spinner');

		expect(spinner).toHaveStyle({ width: '20px', height: '20px' });

		rerender(<LoadingSpinner data-testid="spinner" variant="large" />);
		expect(spinner).toHaveStyle({ width: '120px', height: '120px' });
	});

	it('defaults MenuToggle size and variant and accepts overrides', () => {
		const menu = toggleProps => (
			<Menu isOpen={false} onToggleMenu={() => {}}>
				<Menu.Toggle {...toggleProps}>Open menu</Menu.Toggle>
			</Menu>
		);
		const { rerender } = render(menu({}));
		const toggle = screen.getByRole('button');

		expect(toggle).toHaveStyle({
			height: '32px',
			backgroundColor: 'rgb(30, 145, 214)',
		});

		rerender(menu({ size: 'large', variant: 'secondary' }));
		expect(toggle).toHaveStyle({
			height: '48px',
			backgroundColor: 'rgb(255, 255, 255)',
			color: 'rgb(30, 145, 214)',
		});
	});

	it('defaults MenuItemIcon to the icon variant and accepts another variant', () => {
		const { rerender } = render(<Menu.ItemIcon>Menu icon</Menu.ItemIcon>);
		const icon = screen.getByText('Menu icon');

		expect(icon).toHaveStyle({ width: '40px', height: '40px' });

		rerender(<Menu.ItemIcon variant="thumbnail">Menu icon</Menu.ItemIcon>);
		expect(icon).toHaveStyle({ width: '76px', height: '56px' });
	});

	it('defaults ParameterSelect width and accepts an override', () => {
		const props = {
			options: { first: 'First' },
			selectedId: 'first',
			onItemSelect: () => {},
			useNativeSelect: true,
		};
		const { rerender } = render(<ParameterSentence.Select {...props} />);
		const select = screen.getByRole('combobox');

		expect(select).toHaveStyle({ width: '180px' });

		rerender(<ParameterSentence.Select {...props} width="240px" />);
		expect(select).toHaveStyle({ width: '240px' });
	});

	it('defaults Modal content padding and z-index and accepts overrides', () => {
		const modal = props => (
			<Modal isOpen onClose={() => {}} allowBackgroundScrolling {...props}>
				<Modal.Header title="Dialog title" />
				<Modal.Content>Dialog content</Modal.Content>
			</Modal>
		);
		const { rerender } = render(modal({}));
		const content = screen.getByText('Dialog content');

		expect(content).toHaveStyle({ paddingLeft: '16px', paddingRight: '16px' });
		expect(content.parentElement).toHaveStyle({ paddingTop: '16px', paddingBottom: '16px' });
		expect(screen.getByRole('dialog').parentElement).toHaveStyle({ zIndex: '1050' });

		rerender(modal({ contentPadding: 2, zIndex: 1200 }));
		expect(content).toHaveStyle({ paddingLeft: '4px', paddingRight: '4px' });
		expect(content.parentElement).toHaveStyle({ paddingTop: '4px', paddingBottom: '4px' });
		expect(screen.getByRole('dialog').parentElement).toHaveStyle({ zIndex: '1200' });
	});

	it('defaults ModalHeader text style and accepts an override', () => {
		const modal = headerProps => (
			<Modal isOpen onClose={() => {}} allowBackgroundScrolling>
				<Modal.Header title="Dialog title" {...headerProps} />
				<Modal.Content>Dialog content</Modal.Content>
			</Modal>
		);
		const { rerender } = render(modal({}));
		const title = screen.getByText('Dialog title');

		expect(title).toHaveStyle({ fontSize: '18px' });

		rerender(modal({ textStyle: 'h.22' }));
		expect(title).toHaveStyle({ fontSize: '22px' });
	});

	it('defaults TabManager to the modal variant and accepts page', () => {
		const tabs = props => (
			<Tab.Manager {...props}>
				<Tab.List>
					<Tab>First tab</Tab>
				</Tab.List>
			</Tab.Manager>
		);
		const { rerender } = render(tabs({}));
		const tab = screen.getByRole('tab', { name: 'First tab' });

		expect(tab).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });

		rerender(tabs({ variant: 'page' }));
		expect(tab).toHaveStyle({ backgroundColor: 'rgb(235, 247, 255)' });
	});

	it('selects NumberInput contents on focus by default and can disable it', () => {
		const select = jest.spyOn(HTMLInputElement.prototype, 'select');
		const props = { value: 123, onChange: () => {} };

		try {
			const { rerender } = render(<NumberInput {...props} />);
			fireEvent.focus(screen.getByRole('spinbutton'));
			expect(select).toHaveBeenCalledTimes(1);

			select.mockClear();
			rerender(<NumberInput {...props} selectOnFocus={false} />);
			fireEvent.focus(screen.getByRole('spinbutton'));
			expect(select).not.toHaveBeenCalled();
		} finally {
			select.mockRestore();
		}
	});

	it('defaults Switch to the switch variant and accepts binaryChoice', () => {
		const props = { onClick: () => {}, isChecked: false };
		const { rerender } = render(<Switch {...props} />);
		const toggle = screen.getByRole('switch');

		expect(toggle).toHaveStyle({ backgroundColor: 'rgb(168, 168, 168)' });

		rerender(<Switch {...props} variant="binaryChoice" />);
		expect(toggle).toHaveStyle({ backgroundColor: 'rgb(30, 145, 214)' });
	});

	it('defaults ThemedBox to the primary foreground color and accepts an override', () => {
		const { rerender } = render(<ThemedBox>Theme color</ThemedBox>);
		const box = screen.getByText('Theme color');

		expect(box).toHaveStyle({ color: 'rgb(61, 61, 61)' });

		rerender(<ThemedBox color="red4">Theme color</ThemedBox>);
		expect(box).toHaveStyle({ color: 'rgb(217, 72, 72)' });
	});
});
