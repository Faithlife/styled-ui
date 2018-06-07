import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Button, TextInput } from '../../components';

const Demos = styled.div`
	width: 300px;
	font-family: sans-serif;
`;

const DemoRow = styled.div`
	padding: 8px;
`;

const ButtonPadding = styled.div`
	display: inline-block;
	padding: 0 8px 8px 0;

	:last-child {
		padding: 0;
	}
`;

function delayPromise(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

export default function() {
	storiesOf('Text input', module)
		.add(
			'with debounced validation',
			withInfo({
				propTables: [TextInput.Validation, TextInput.Input],
				propTablesExclude: [DemoContainer],
				source: false,
				inline: true,
				text: `
#### With validation:

~~~jsx
<TextInput.Validation
	value={this.state.inputValue}
	onChange={this.onChange}
	getIsValidInput={this.getIsValidInput}
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
~~~

#### Without validation:

~~~js
<TextInput.Input
	value={this.state.inputValue}
	onChange={this.onChange}
	placeholder="Bellingham"
	title="Location"
	help={<span>Try typing 'error'</span>}
/>
~~~`,
			})(() => (
				<div>
					<DemoContainer demoValidation validationDelay={200} />
				</div>
			)),
		)
		.add('with no validation', () => <DemoContainer />)
		.add('with offline network', () => (
			<DemoContainer demoValidation demoFailedApiValidation validationDelay={200} />
		))
		.add('with slow API validation', () => (
			<DemoContainer demoValidation demoSlowNetwork validationDelay={200} />
		))
		.add('with alternate theme', () => (
			<DemoContainer demoValidation theme={{ background: '#393939', text: 'white' }} />
		));
}

class DemoContainer extends Component {
	static propTypes = {
		theme: PropTypes.object,
		validationDelay: PropTypes.number,
		demoValidation: PropTypes.bool,
		demoSlowNetwork: PropTypes.bool,
		demoFailedApiValidation: PropTypes.bool,
	};

	state = {
		inputValue: '',
		isValid: false,
	};

	onChange = newState => {
		if (newState.isValid != null) {
			this.setState({ isValid: newState.isValid });
		}
		if (newState.inputValue != null) {
			this.setState({ inputValue: newState.inputValue });
		}
	};

	getIsValidInput = () =>
		this.props.demoValidation
			? value =>
					this.props.demoSlowNetwork
						? delayPromise(500).then(
								() =>
									this.props.demoFailedApiValidation
										? Promise.reject()
										: Promise.resolve({
												isValid: value !== 'error',
												validationErrorString: 'This is a custom error message',
										  }),
						  )
						: {
								isValid: value !== 'error',
								validationErrorString: 'This is a custom error message',
						  }
			: null;

	render() {
		return (
			<Demos>
				<DemoRow>
					{this.props.demoValidation ? (
						<TextInput.Validation
							value={this.state.inputValue}
							onChange={this.onChange}
							getIsValidInput={this.getIsValidInput}
							validationDelay={this.props.validationDelay}
							renderInput={props => (
								<TextInput.Input
									{...props}
									placeholder="Bellingham"
									title="Location"
									help={<span>Try typing 'error'</span>}
									theme={this.props.theme}
									ref={input => {
										this.input = input;
									}}
								/>
							)}
						/>
					) : (
						<TextInput.Input
							value={this.state.inputValue}
							onChange={event => this.setState({ inputValue: event.target.value, isValid: true })}
							placeholder="Bellingham"
							title="Location"
							help={<span>Try typing 'error'</span>}
							theme={this.props.theme}
							ref={input => {
								this.input = input;
							}}
						/>
					)}
				</DemoRow>
				<DemoRow>
					<ButtonPadding>
						<Button disabled={!this.state.isValid} primary medium>
							Save
						</Button>
					</ButtonPadding>
					<ButtonPadding>
						<Button
							primaryOutline
							medium
							onClick={() => this.setState({ inputValue: Math.random().toString() })}
						>
							Random input value
						</Button>
					</ButtonPadding>
					<ButtonPadding>
						<Button
							primaryOutline
							medium
							onClick={() => {
								this.input.focus();
							}}
						>
							Set focus
						</Button>
					</ButtonPadding>
				</DemoRow>
			</Demos>
		);
	}
}
