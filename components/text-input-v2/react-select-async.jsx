// Forked from https://github.com/JedWatson/react-select/pull/3254

// @flow

/* eslint-disable */

import React, { Component, type ComponentType, type ElementRef } from 'react';
import Select, { type Props as SelectProps } from 'react-select/lib/Select';
import { handleInputChange } from 'react-select/lib/utils';
import { makeCreatableSelect } from 'react-select/lib/Creatable';
import { debounce } from './react-select-utils';
import manageState from 'react-select/lib/stateManager';
import type { OptionsType, InputActionMeta } from 'react-select/lib/types';

export type AsyncProps = {
	/* The default set of options to show before the user starts searching. When
	 set to `true`, the results for loadOptions('') will be autoloaded. */
	defaultOptions: OptionsType | boolean,
	/* Function that returns a promise, which is the set of options to be used
	 once the promise resolves. */
	loadOptions: (string, (OptionsType) => void) => Promise<*> | void,
	/* If cacheOptions is truthy, then the loaded data will be cached. The cache
	 will remain until `cacheOptions` changes value. */
	cacheOptions: any,
	/* Debounce interval in milliseconds on input change. */
	debounceInterval: number,
};

export type Props = SelectProps & AsyncProps;

export const defaultProps = {
	cacheOptions: false,
	defaultOptions: false,
	debounceInterval: 200,
};

type State = {
	defaultOptions?: OptionsType,
	inputValue: string,
	isLoading: boolean,
	loadedInputValue?: string,
	loadedOptions: OptionsType,
	passEmptyOptions: boolean,
};

export const makeAsyncSelect = (SelectComponent: ComponentType<*>) =>
	class Async extends Component<Props, State> {
		static defaultProps = defaultProps;
		select: ElementRef<*>;
		lastRequest: {};
		mounted: boolean = false;
		optionsCache: { [string]: OptionsType } = {};
		constructor(props: Props) {
			super();
			this.state = {
				defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
				inputValue: props.inputValue,
				isLoading: props.defaultOptions === true ? true : false,
				loadedOptions: [],
				passEmptyOptions: false,
			};
			this.loadOptions = props.debounceInterval
				? debounce(this.handleLoadOptions, props.debounceInterval)
				: this.handleLoadOptions;
		}
		componentDidMount() {
			this.mounted = true;
			const { defaultOptions } = this.props;
			const { inputValue } = this.state;
			if (defaultOptions === true) {
				this.handleLoadOptions(inputValue, options => {
					if (!this.mounted) return;
					const isLoading = !!this.lastRequest;
					this.setState({ defaultOptions: options || [], isLoading });
				});
			}
		}
		componentWillReceiveProps(nextProps: Props) {
			// if the cacheOptions prop changes, clear the cache
			if (nextProps.cacheOptions !== this.props.cacheOptions) {
				this.optionsCache = {};
			}
			if (nextProps.defaultOptions !== this.props.defaultOptions) {
				this.setState({
					defaultOptions: Array.isArray(nextProps.defaultOptions)
						? nextProps.defaultOptions
						: undefined,
				});
			}
		}
		componentWillUnmount() {
			this.mounted = false;
		}
		focus() {
			this.select.focus();
		}
		blur() {
			this.select.blur();
		}
		handleLoadOptions = (inputValue: string, callback: (?Array<*>) => void) => {
			if (!this.mounted) return;
			const { loadOptions } = this.props;
			if (!loadOptions) return callback();
			const loader = loadOptions(inputValue, callback);
			if (loader && typeof loader.then === 'function') {
				loader.then(callback, () => callback());
			}
		};
		handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
			const { cacheOptions, onInputChange } = this.props;
			// TODO
			const inputValue = handleInputChange(newValue, actionMeta, onInputChange);
			if (!inputValue) {
				delete this.lastRequest;
				this.setState({
					inputValue: '',
					loadedInputValue: '',
					loadedOptions: [],
					isLoading: false,
					passEmptyOptions: false,
				});
				return;
			}
			if (cacheOptions && this.optionsCache[inputValue]) {
				this.setState({
					inputValue,
					loadedInputValue: inputValue,
					loadedOptions: this.optionsCache[inputValue],
					isLoading: false,
					passEmptyOptions: false,
				});
			} else {
				const request = (this.lastRequest = {});
				this.setState(
					{
						inputValue,
						isLoading: true,
						passEmptyOptions: !this.state.loadedInputValue,
					},
					() => {
						this.loadOptions(inputValue, options => {
							if (!this.mounted) return;
							if (options) {
								this.optionsCache[inputValue] = options;
							}
							if (request !== this.lastRequest) return;
							delete this.lastRequest;
							this.setState({
								isLoading: false,
								loadedInputValue: inputValue,
								loadedOptions: options || [],
								passEmptyOptions: false,
							});
						});
					},
				);
			}
			return inputValue;
		};
		render() {
			const { loadOptions, debounceInterval, ...props } = this.props;
			const {
				defaultOptions,
				inputValue,
				isLoading,
				loadedInputValue,
				loadedOptions,
				passEmptyOptions,
			} = this.state;
			const options = passEmptyOptions
				? []
				: inputValue && loadedInputValue
					? loadedOptions
					: defaultOptions || [];
			return (
				// $FlowFixMe
				<SelectComponent
					{...props}
					filterOption={this.props.filterOption || null}
					ref={ref => {
						this.select = ref;
					}}
					options={options}
					isLoading={isLoading}
					onInputChange={
						this.handleInputChange
					}
				/>
			);
		}
	};

export const ReactSelectAsync = makeAsyncSelect(manageState(Select));
export const ReactSelectAsyncCreatable = makeAsyncSelect(manageState(makeCreatableSelect(Select)));
