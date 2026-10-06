import React, { createRef } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../DefaultThemeProvider';
import { AsyncCreatableSelect, AsyncSelect, CreatableSelect, Select } from '../';

const options = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
];

const selectVariants = [
	{ name: 'Select', Component: Select, props: { options } },
	{ name: 'CreatableSelect', Component: CreatableSelect, props: { options } },
	{
		name: 'AsyncSelect',
		Component: AsyncSelect,
		props: { loadOptions: () => Promise.resolve(options) },
	},
	{
		name: 'AsyncCreatableSelect',
		Component: AsyncCreatableSelect,
		props: { loadOptions: () => Promise.resolve(options) },
	},
];

const asyncSelectVariants = [
	{ name: 'AsyncSelect', Component: AsyncSelect },
	{ name: 'AsyncCreatableSelect', Component: AsyncCreatableSelect },
];

function renderSelect(select) {
	return render(<DefaultThemeProvider>{select}</DefaultThemeProvider>);
}

function getClearIndicator(container) {
	const clearIndicator = container.querySelector('.fl-select__clear-indicator');
	expect(clearIndicator).toBeInTheDocument();
	return clearIndicator;
}

describe.each(selectVariants)('$name', ({ Component, props }) => {
	it('renders an accessible combobox', () => {
		expect.hasAssertions();

		renderSelect(<Component {...props} aria-label="Fruit" />);

		expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
	});

	it('exposes focus and blur methods through its ref', () => {
		expect.hasAssertions();

		const ref = createRef();
		renderSelect(<Component {...props} aria-label="Fruit" ref={ref} />);

		const input = screen.getByRole('combobox', { name: 'Fruit' });
		expect(ref.current).toBeTruthy();

		act(() => ref.current.focus());
		expect(input).toHaveFocus();

		act(() => ref.current.blur());
		expect(input).not.toHaveFocus();
	});
});

describe('clearable values', () => {
	it('does not change a controlled value until its owner updates it', async () => {
		expect.hasAssertions();

		const onChange = jest.fn();
		const controlledSelect = value => (
			<DefaultThemeProvider>
				<Select
					aria-label="Fruit"
					options={options}
					value={value}
					isClearable
					onChange={onChange}
				/>
			</DefaultThemeProvider>
		);
		const { container, rerender } = render(controlledSelect(options[0]));

		await userEvent.click(getClearIndicator(container));

		expect(onChange).toHaveBeenCalledWith(null, expect.objectContaining({ action: 'clear' }));
		expect(screen.getByText('Apple')).toBeInTheDocument();

		rerender(controlledSelect(null));
		expect(screen.queryByText('Apple')).not.toBeInTheDocument();
	});

	it('clears an uncontrolled value when the clear indicator is activated', async () => {
		expect.hasAssertions();

		const onChange = jest.fn();
		const { container } = renderSelect(
			<Select
				aria-label="Fruit"
				options={options}
				defaultValue={options[0]}
				isClearable
				onChange={onChange}
			/>,
		);

		await userEvent.click(getClearIndicator(container));

		expect(onChange).toHaveBeenCalledWith(null, expect.objectContaining({ action: 'clear' }));
		expect(screen.queryByText('Apple')).not.toBeInTheDocument();
	});

	it('clears an uncontrolled clearable value when the user types', async () => {
		expect.hasAssertions();

		const onChange = jest.fn();
		renderSelect(
			<Select
				aria-label="Fruit"
				options={options}
				defaultValue={options[0]}
				isClearable
				onChange={onChange}
			/>,
		);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'b');

		expect(onChange).toHaveBeenCalledWith(null, expect.objectContaining({ action: 'set-value' }));
	});

	it('reports null when the last multi-value is removed', async () => {
		expect.hasAssertions();

		const onChange = jest.fn();
		const { container } = renderSelect(
			<Select
				aria-label="Fruit"
				options={options}
				defaultValue={[options[0]]}
				isClearable
				isMulti
				onChange={onChange}
			/>,
		);
		const removeIndicator = container.querySelector('.fl-select__multi-value__remove');
		expect(removeIndicator).toBeInTheDocument();

		await userEvent.click(removeIndicator);

		expect(onChange).toHaveBeenCalledWith(
			null,
			expect.objectContaining({ action: 'remove-value' }),
		);
		expect(screen.queryByText('Apple')).not.toBeInTheDocument();
	});

	it('reports null when all multi-values are cleared', async () => {
		expect.hasAssertions();

		const onChange = jest.fn();
		const { container } = renderSelect(
			<Select
				aria-label="Fruit"
				options={options}
				defaultValue={options}
				isClearable
				isMulti
				onChange={onChange}
			/>,
		);

		await userEvent.click(getClearIndicator(container));

		expect(onChange).toHaveBeenCalledWith(null, expect.objectContaining({ action: 'clear' }));
		expect(screen.queryByText('Apple')).not.toBeInTheDocument();
		expect(screen.queryByText('Banana')).not.toBeInTheDocument();
	});
});

describe('async options', () => {
	it('supports callback-style option loaders', async () => {
		expect.hasAssertions();

		const loadOptions = jest.fn((_inputValue, callback) => callback(options));
		renderSelect(<AsyncSelect aria-label="Fruit" loadOptions={loadOptions} />);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'ap');

		expect(await screen.findByText('Apple')).toBeVisible();
		expect(loadOptions).toHaveBeenLastCalledWith('ap', expect.any(Function));
	});

	it('supports promise-style option loaders', async () => {
		expect.hasAssertions();

		const loadOptions = jest.fn(() => Promise.resolve(options));
		renderSelect(<AsyncCreatableSelect aria-label="Fruit" loadOptions={loadOptions} />);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'ban');

		expect(await screen.findByText('Banana')).toBeVisible();
		expect(loadOptions.mock.calls.map(call => call[0])).toContain('ban');
	});

	it('does not debounce option loading when the interval is zero', async () => {
		expect.hasAssertions();

		const loadOptions = jest.fn((_inputValue, callback) => callback(options));
		renderSelect(<AsyncSelect aria-label="Fruit" debounceInterval={0} loadOptions={loadOptions} />);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'a');

		expect(loadOptions).toHaveBeenCalledTimes(1);
		expect(loadOptions).toHaveBeenLastCalledWith('a', expect.any(Function));
	});

	it.each(asyncSelectVariants)('$name loads default options on mount', async ({ Component }) => {
		expect.hasAssertions();

		const loadOptions = jest.fn((_inputValue, callback) => callback(options));
		renderSelect(<Component aria-label="Fruit" defaultOptions loadOptions={loadOptions} />);

		await waitFor(() => expect(loadOptions).toHaveBeenCalledWith('', expect.any(Function)));
		await userEvent.click(screen.getByRole('combobox', { name: 'Fruit' }));

		expect(await screen.findByText('Apple')).toBeVisible();
	});

	it('debounces option loading until the user pauses typing', async () => {
		expect.hasAssertions();

		const loadOptions = jest.fn((_inputValue, callback) => callback(options));
		renderSelect(
			<AsyncSelect aria-label="Fruit" debounceInterval={100} loadOptions={loadOptions} />,
		);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'ap');

		expect(loadOptions).not.toHaveBeenCalled();
		await waitFor(() => expect(loadOptions).toHaveBeenCalledTimes(1));
		expect(loadOptions.mock.calls[0][0]).toBe('ap');
		expect(await screen.findByText('Apple')).toBeVisible();
	});

	it('cancels pending debounced work when the loader changes', async () => {
		expect.hasAssertions();

		const initialLoadOptions = jest.fn();
		const updatedLoadOptions = jest.fn((_inputValue, callback) => callback(options));
		const selectWithLoader = loadOptions => (
			<DefaultThemeProvider>
				<AsyncSelect aria-label="Fruit" debounceInterval={100} loadOptions={loadOptions} />
			</DefaultThemeProvider>
		);
		const { rerender } = render(selectWithLoader(initialLoadOptions));
		const input = screen.getByRole('combobox', { name: 'Fruit' });

		await userEvent.type(input, 'a');
		expect(initialLoadOptions).not.toHaveBeenCalled();
		expect(await screen.findByText('Loading...')).toBeVisible();

		rerender(selectWithLoader(updatedLoadOptions));
		await new Promise(resolve => setTimeout(resolve, 125));
		expect(initialLoadOptions).not.toHaveBeenCalled();
		expect(updatedLoadOptions).not.toHaveBeenCalled();
		await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

		await userEvent.type(input, 'b');
		await waitFor(() => expect(updatedLoadOptions).toHaveBeenCalledTimes(1));
		expect(updatedLoadOptions.mock.calls[0][0]).toBe('ab');
		expect(initialLoadOptions).not.toHaveBeenCalled();
		expect(await screen.findByText('Apple')).toBeVisible();
	});

	it('ignores stale results when a newer query resolves first', async () => {
		expect.hasAssertions();

		const pending = new Map();
		const loadOptions = jest.fn(
			inputValue => new Promise(resolve => pending.set(inputValue, resolve)),
		);
		renderSelect(<AsyncSelect aria-label="Fruit" filterOption={null} loadOptions={loadOptions} />);
		const input = screen.getByRole('combobox', { name: 'Fruit' });

		await userEvent.type(input, 'a');
		await waitFor(() => expect(pending.get('a')).toEqual(expect.any(Function)));
		await userEvent.type(input, 'b');
		await waitFor(() => expect(pending.get('ab')).toEqual(expect.any(Function)));

		await act(async () => {
			pending.get('ab')([{ value: 'latest', label: 'Latest result' }]);
			await Promise.resolve();
		});
		expect(await screen.findByText('Latest result')).toBeVisible();

		await act(async () => {
			pending.get('a')([{ value: 'stale', label: 'Stale result' }]);
			await Promise.resolve();
		});
		expect(screen.queryByText('Stale result')).not.toBeInTheDocument();
		expect(screen.getByText('Latest result')).toBeInTheDocument();
	});

	it('does not treat a rejected load as a successful empty result', async () => {
		expect.hasAssertions();

		const failure = new Error('Option loading failed');
		let observedFailure;
		const rejectedPromise = Promise.reject(failure);
		// Catch the adapter's rethrown failure so Jest can assert the select's loading state.
		const originalThen = rejectedPromise.then.bind(rejectedPromise);
		rejectedPromise.then = (onFulfilled, onRejected) =>
			originalThen(onFulfilled, onRejected).catch(error => {
				observedFailure = error;
			});
		const loadOptions = jest.fn(() => rejectedPromise);
		renderSelect(<AsyncSelect aria-label="Fruit" loadOptions={loadOptions} />);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'x');
		await waitFor(() => expect(observedFailure).toBe(failure));

		expect(screen.getByText('Loading...')).toBeVisible();
		expect(screen.queryByText('No options')).not.toBeInTheDocument();
	});

	it('cancels a pending debounced load when unmounted', async () => {
		expect.hasAssertions();

		const loadOptions = jest.fn((_inputValue, callback) => callback(options));
		const { unmount } = renderSelect(
			<AsyncSelect aria-label="Fruit" debounceInterval={250} loadOptions={loadOptions} />,
		);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'a');
		expect(loadOptions).not.toHaveBeenCalled();

		unmount();
		await new Promise(resolve => setTimeout(resolve, 275));

		expect(loadOptions).not.toHaveBeenCalled();
	});
});
