import React, { createRef, useState } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../DefaultThemeProvider';
import {
	AsyncCreatableSelect,
	AsyncSelect,
	CreatableSelect,
	reactSelectComponents,
	Select,
} from '../';

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

it('supports custom Inputs built from the matching public components', async () => {
	const Input = props => <reactSelectComponents.Input {...props} autoComplete="country-name" />;
	const onChange = jest.fn();
	renderSelect(
		<Select aria-label="Fruit" options={options} components={{ Input }} onChange={onChange} />,
	);
	const input = screen.getByRole('combobox', { name: 'Fruit' });

	expect(input).toHaveAttribute('autocomplete', 'country-name');
	await userEvent.type(input, 'ap{arrowdown}{enter}');

	expect(onChange).toHaveBeenCalledWith(
		options[0],
		expect.objectContaining({ action: 'select-option' }),
	);
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
	afterEach(() => jest.restoreAllMocks());

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

	it.each(asyncSelectVariants)(
		'$name tolerates inline loaders with controlled input',
		async ({ Component }) => {
			const loadOptions = jest.fn((_inputValue, callback) => callback(options));

			function Consumer() {
				const [inputValue, setInputValue] = useState('');
				return (
					<Component
						aria-label="Fruit"
						inputValue={inputValue}
						onInputChange={setInputValue}
						debounceInterval={100}
						loadOptions={(value, callback) => loadOptions(value, callback)}
					/>
				);
			}

			renderSelect(<Consumer />);
			await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'ap');

			expect(loadOptions).not.toHaveBeenCalled();
			expect(await screen.findByText('Apple')).toBeVisible();
			expect(loadOptions).toHaveBeenCalledTimes(1);
			expect(loadOptions).toHaveBeenCalledWith('ap', expect.any(Function));
		},
	);

	it('uses the latest loader and its data for pending debounced work', async () => {
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

		await act(async () => userEvent.type(input, 'a'));
		expect(initialLoadOptions).not.toHaveBeenCalled();
		expect(await screen.findByText('Loading...')).toBeVisible();

		rerender(selectWithLoader(updatedLoadOptions));
		expect(await screen.findByText('Apple')).toBeVisible();
		expect(updatedLoadOptions).toHaveBeenCalledTimes(1);
		expect(updatedLoadOptions).toHaveBeenCalledWith('a', expect.any(Function));
		await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

		await userEvent.type(input, 'b');
		await waitFor(() => expect(updatedLoadOptions).toHaveBeenCalledTimes(2));
		expect(updatedLoadOptions.mock.calls[1][0]).toBe('ab');
		expect(initialLoadOptions).not.toHaveBeenCalled();
	});

	it.each(asyncSelectVariants)(
		'$name retains an in-flight default load across parent renders',
		async ({ Component }) => {
			let resolveOptions;
			const loadOptions = jest.fn(() => new Promise(resolve => (resolveOptions = resolve)));
			const select = () => (
				<DefaultThemeProvider>
					<Component
						aria-label="Fruit"
						defaultOptions
						loadOptions={(value, callback) => loadOptions(value, callback)}
					/>
				</DefaultThemeProvider>
			);
			const { rerender } = render(select());
			expect(loadOptions).toHaveBeenCalledTimes(1);

			rerender(select());
			await act(async () => resolveOptions(options));
			await userEvent.click(screen.getByRole('combobox', { name: 'Fruit' }));

			expect(await screen.findByText('Apple')).toBeVisible();
			expect(loadOptions).toHaveBeenCalledTimes(1);
		},
	);

	it('retains a query result when its loader triggers a parent render', async () => {
		let resolveOptions;

		function Consumer() {
			const [isLoading, setIsLoading] = useState(false);
			return (
				<>
					<span>{isLoading ? 'Fetching fruit' : 'Ready'}</span>
					<AsyncSelect
						aria-label="Fruit"
						loadOptions={() => {
							setIsLoading(true);
							return new Promise(resolve => (resolveOptions = resolve));
						}}
					/>
				</>
			);
		}

		renderSelect(<Consumer />);
		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'a');
		expect(screen.getByText('Fetching fruit')).toBeInTheDocument();

		await act(async () => resolveOptions(options));
		expect(await screen.findByText('Apple')).toBeVisible();
	});

	it.each(['', 'a'])('retains late default options with initial input "%s"', async initialInput => {
		const pending = new Map();
		const loadOptions = input => new Promise(resolve => pending.set(input, resolve));
		renderSelect(
			<AsyncSelect
				aria-label="Fruit"
				defaultOptions
				defaultInputValue={initialInput}
				loadOptions={loadOptions}
			/>,
		);
		const input = screen.getByRole('combobox', { name: 'Fruit' });
		await userEvent.type(input, 'b');

		await act(async () => pending.get(`${initialInput}b`)([options[1]]));
		expect(await screen.findByText('Banana')).toBeVisible();
		await act(async () => pending.get(initialInput)([options[0]]));
		expect(screen.queryByText('Apple')).not.toBeInTheDocument();

		await userEvent.clear(input);
		expect(await screen.findByText('Apple')).toBeVisible();
	});

	it('settles pending work when the debounce interval changes', async () => {
		const loadOptions = jest.fn((_inputValue, callback) => callback(options));
		const select = debounceInterval => (
			<DefaultThemeProvider>
				<AsyncSelect
					aria-label="Fruit"
					loadOptions={loadOptions}
					debounceInterval={debounceInterval}
				/>
			</DefaultThemeProvider>
		);
		const { rerender } = render(select(100));
		const input = screen.getByRole('combobox', { name: 'Fruit' });
		await userEvent.type(input, 'a');

		rerender(select(0));
		await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
		await new Promise(resolve => setTimeout(resolve, 125));
		expect(loadOptions).not.toHaveBeenCalled();

		await act(async () => userEvent.type(input, 'p'));
		expect(loadOptions).toHaveBeenCalledWith('ap', expect.any(Function));
		expect(await screen.findByText('Apple')).toBeVisible();
	});

	it('settles only once when a callback loader also returns a promise', async () => {
		const loadOptions = (_input, callback) => {
			callback(options);
			return Promise.resolve();
		};
		renderSelect(<AsyncSelect aria-label="Fruit" loadOptions={loadOptions} />);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'a');

		expect(await screen.findByText('Apple')).toBeVisible();
		expect(screen.queryByText('No options')).not.toBeInTheDocument();
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

	it('does not replace a cached query with an obsolete result', async () => {
		const pending = new Map();
		const loadOptions = input => new Promise(resolve => pending.set(input, resolve));
		renderSelect(<AsyncSelect aria-label="Fruit" cacheOptions loadOptions={loadOptions} />);
		const input = screen.getByRole('combobox', { name: 'Fruit' });
		await userEvent.type(input, 'a');
		await act(async () => pending.get('a')([options[0]]));
		expect(await screen.findByText('Apple')).toBeVisible();

		await userEvent.type(input, 'b{backspace}');
		expect(screen.getByText('Apple')).toBeVisible();
		await act(async () => pending.get('ab')([options[1]]));

		expect(screen.getByText('Apple')).toBeVisible();
		expect(screen.queryByText('Banana')).not.toBeInTheDocument();
	});

	it.each(asyncSelectVariants)(
		'$name reports rejected loads, settles loading, and can retry',
		async ({ Component }) => {
			const failure = new Error('Option loading failed');
			const reportError = jest.spyOn(console, 'error').mockImplementation(() => {});
			const loadOptions = jest
				.fn()
				.mockImplementationOnce(() => Promise.reject(failure))
				.mockImplementation(() => Promise.resolve(options));
			renderSelect(<Component aria-label="Fruit" loadOptions={loadOptions} />);
			const input = screen.getByRole('combobox', { name: 'Fruit' });

			await act(async () => userEvent.type(input, 'a'));

			await waitFor(() => expect(reportError).toHaveBeenCalledWith(failure));
			expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
			expect(loadOptions).toHaveBeenCalledTimes(1);

			await act(async () => userEvent.type(input, 'p'));
			expect(await screen.findByText('Apple')).toBeVisible();
			expect(reportError).toHaveBeenCalledTimes(1);
		},
	);

	it('reports synchronous loader failures through onLoadError and settles loading', async () => {
		const failure = new Error('Synchronous option failure');
		const reportError = jest.spyOn(console, 'error').mockImplementation(() => {});
		const onLoadError = jest.fn();
		renderSelect(
			<AsyncSelect
				aria-label="Fruit"
				onLoadError={onLoadError}
				loadOptions={() => {
					throw failure;
				}}
			/>,
		);

		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'a');

		expect(onLoadError).toHaveBeenCalledWith(failure, 'a');
		expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
		expect(reportError).not.toHaveBeenCalled();
	});

	it('reports rejected default loads without leaving loading unsettled', async () => {
		const failure = new Error('Default options failed');
		const reportError = jest.spyOn(console, 'error').mockImplementation(() => {});
		await act(async () =>
			renderSelect(
				<AsyncSelect
					aria-label="Fruit"
					defaultOptions
					loadOptions={() => Promise.reject(failure)}
				/>,
			),
		);
		await userEvent.click(screen.getByRole('combobox', { name: 'Fruit' }));

		expect(reportError).toHaveBeenCalledWith(failure);
		expect(reportError).toHaveBeenCalledTimes(1);
		expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
	});

	it('uses the current error handler without discarding the request', async () => {
		const failure = new Error('Option loading failed');
		let rejectOptions;
		const loadOptions = () => new Promise((_resolve, reject) => (rejectOptions = reject));
		const initialHandler = jest.fn();
		const currentHandler = jest.fn();
		const select = onLoadError => (
			<DefaultThemeProvider>
				<AsyncSelect aria-label="Fruit" loadOptions={loadOptions} onLoadError={onLoadError} />
			</DefaultThemeProvider>
		);
		const { rerender } = render(select(initialHandler));
		await userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'a');

		rerender(select(currentHandler));
		await act(async () => rejectOptions(failure));

		expect(currentHandler).toHaveBeenCalledWith(failure, 'a');
		expect(initialHandler).not.toHaveBeenCalled();
		expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
	});

	it('settles loading even when an error reporter throws', async () => {
		const failure = new Error('Option loading failed');
		const reportingFailure = new Error('Error reporter failed');
		const reportError = jest.spyOn(console, 'error').mockImplementation(() => {});
		renderSelect(
			<AsyncSelect
				aria-label="Fruit"
				loadOptions={() => Promise.reject(failure)}
				onLoadError={() => {
					throw reportingFailure;
				}}
			/>,
		);

		await act(async () => userEvent.type(screen.getByRole('combobox', { name: 'Fruit' }), 'a'));

		expect(reportError).toHaveBeenCalledWith(failure);
		expect(reportError).toHaveBeenCalledWith(reportingFailure);
		expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
	});

	it.each(['new query', 'clear', 'unmount'])(
		'ignores obsolete rejections after %s',
		async action => {
			const failure = new Error('Obsolete failure');
			let rejectOptions;
			const onLoadError = jest.fn();
			const reportError = jest.spyOn(console, 'error').mockImplementation(() => {});
			const loadOptions = jest
				.fn()
				.mockImplementationOnce(() => new Promise((_resolve, reject) => (rejectOptions = reject)))
				.mockImplementation(() => Promise.resolve(options));
			const { unmount } = renderSelect(
				<AsyncSelect aria-label="Fruit" loadOptions={loadOptions} onLoadError={onLoadError} />,
			);
			const input = screen.getByRole('combobox', { name: 'Fruit' });
			await userEvent.type(input, 'a');

			if (action === 'new query') {
				await act(async () => userEvent.type(input, 'p'));
				expect(await screen.findByText('Apple')).toBeVisible();
			} else if (action === 'clear') {
				await userEvent.clear(input);
			} else {
				unmount();
			}

			await act(async () => rejectOptions(failure));

			expect(onLoadError).not.toHaveBeenCalled();
			expect(reportError).not.toHaveBeenCalled();
			expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
		},
	);

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
