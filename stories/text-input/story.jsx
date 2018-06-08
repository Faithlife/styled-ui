import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { State, Store } from '@sambego/storybook-state';
import { Button, TextInput } from '../../components';

const Demos = styled.div`
	width: 300px;
	font-family: sans-serif;
`;

const ButtonMargin = styled.div`
	margin-top: 8px;
`;

function delayPromise(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

export default function() {
	const info = {
		propTables: [TextInput.Validation, TextInput.Input],
		propTablesExclude: [State, Demos, Button, ButtonMargin],
		inline: true,
	};
	const store = new Store({
		value: '',
		isValid: false,
	});

	storiesOf('Text input', module)
		.add(
			'with debounce',
			withInfo({
				...info,
				text: `
A standard text input control with local validation. \`TextInput.Input\` is used as a render prop so that additional input properties can be set, such as \`placeholder\`.
~~~
renderInput={props => (
	<TextInput.Input
		{...props}
		placeholder="Bellingham"
		title="Location"
		help={<span>Try typing 'error'</span>}
	/>
)}
~~~`,
			})(() => (
				<Demos>
					<State store={store} parseState={state => ({ value: state.value })}>
						<TextInput.Validation
							onChange={newState => {
								if (newState.isValid != null) {
									store.set({ isValid: newState.isValid });
								}
								if (newState.inputValue != null) {
									store.set({ value: newState.inputValue });
								}
							}}
							getIsValidInput={value => ({
								isValid: value !== 'error',
								validationErrorString: 'This is a custom error message',
							})}
							validationDelay={200}
							renderInput={props => (
								<TextInput.Input
									{...props}
									placeholder="Bellingham"
									title="Location"
									help={<span>Try typing 'error'</span>}
								/>
							)}
						/>
					</State>
					<ButtonMargin>
						<State store={store} parseState={state => ({ disabled: !state.isValid })}>
							<Button primary medium>
								Save
							</Button>
						</State>
					</ButtonMargin>
				</Demos>
			)),
		)
		.add(
			'with offline network',
			withInfo({
				...info,
				text: `
Simulates a rejected promise due to an offline network connection
~~~
getIsValidInput={() => delayPromise(500).then(Promise.reject)}
~~~
`,
			})(() => (
				<Demos>
					<State store={store} parseState={state => ({ value: state.value })}>
						<TextInput.Validation
							onChange={newState => {
								if (newState.isValid != null) {
									store.set({ isValid: newState.isValid });
								}
								if (newState.inputValue != null) {
									store.set({ value: newState.inputValue });
								}
							}}
							getIsValidInput={() => delayPromise(500).then(Promise.reject)}
							validationDelay={200}
							renderInput={props => (
								<TextInput.Input
									{...props}
									placeholder="Bellingham"
									title="Location"
									help={<span>Try typing 'error'</span>}
								/>
							)}
						/>
					</State>
					<ButtonMargin>
						<State store={store} parseState={state => ({ disabled: !state.isValid })}>
							<Button primary medium>
								Save
							</Button>
						</State>
					</ButtonMargin>
				</Demos>
			)),
		)
		.add(
			'with slow API validation',
			withInfo({
				...info,
				text: `
~~~
getIsValidInput={value =>
	delayPromise(500).then(
		Promise.resolve({
			isValid: value !== 'error',
			validationErrorString: 'This is a custom error message',
		}),
	)
}
~~~`,
			})(() => (
				<Demos>
					<State store={store} parseState={state => ({ value: state.value })}>
						<TextInput.Validation
							onChange={newState => {
								if (newState.isValid != null) {
									store.set({ isValid: newState.isValid });
								}
								if (newState.inputValue != null) {
									store.set({ value: newState.inputValue });
								}
							}}
							getIsValidInput={value =>
								delayPromise(500).then(() =>
									Promise.resolve({
										isValid: value !== 'error',
										validationErrorString: 'This is a custom error message',
									}),
								)
							}
							validationDelay={100}
							renderInput={props => (
								<TextInput.Input
									{...props}
									placeholder="Bellingham"
									title="Location"
									help={<span>Try typing 'error'</span>}
								/>
							)}
						/>
					</State>
					<ButtonMargin>
						<State store={store} parseState={state => ({ disabled: !state.isValid })}>
							<Button primary medium>
								Save
							</Button>
						</State>
					</ButtonMargin>
				</Demos>
			)),
		);

	storiesOf('Text input', module)
		.add(
			'with no validation',
			withInfo({
				...info,
				text: `
~~~
getIsValidInput={value =>
delayPromise(500).then(
	Promise.resolve({
		isValid: value !== 'error',
		validationErrorString: 'This is a custom error message',
	}),
)
}
~~~`,
			})(() => (
				<Demos>
					<State store={store} parseState={state => ({ value: state.value })}>
						<TextInput.Input
							onChange={event => store.set({ value: event.target.value, isValid: true })}
							placeholder="Bellingham"
							title="Location"
						/>
					</State>
					<ButtonMargin>
						<State store={store} parseState={state => ({ disabled: !state.isValid })}>
							<Button primary medium>
								Save
							</Button>
						</State>
					</ButtonMargin>
				</Demos>
			)),
		)
		.add(
			'with alternate theme',
			withInfo({
				...info,
				text: `
Theme properties are expected to be valid CSS color names
`,
			})(() => (
				<Demos>
					<State store={store} parseState={state => ({ value: state.value })}>
						<TextInput.Input
							onChange={event => store.set({ value: event.target.value, isValid: true })}
							placeholder="Bellingham"
							title="Location"
							theme={{ background: '#393939', text: 'white' }}
						/>
					</State>
					<ButtonMargin>
						<State store={store} parseState={state => ({ disabled: !state.isValid })}>
							<Button primary medium>
								Save
							</Button>
						</State>
					</ButtonMargin>
				</Demos>
			)),
		);
}
