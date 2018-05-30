import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, TextInput } from '../../components';
import ValidatedInput from './validated-input.jsx';

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

export default class Container extends Component {
	static propTypes = {
		theme: PropTypes.object,
		validationDelay: PropTypes.number,
		demoValidation: PropTypes.bool,
		demoSlowNetwork: PropTypes.bool,
		demoFailedApiValidation: PropTypes.bool,
	};

	state = {
		inputValue: '',
		hasError: false,
	};

	onChange = newState => {
		if (newState.hasError != null) {
			this.setState({ hasError: newState.hasError });
		}
		if (newState.inputValue != null) {
			this.setState({ inputValue: newState.inputValue });
		}
	};

	render() {
		return (
			<Demos>
				<DemoRow>
					<ValidatedInput
						value={this.state.inputValue}
						onChange={this.onChange}
						getIsValidInput={
							this.props.demoValidation
								? value =>
										delayPromise(this.props.demoSlowNetwork ? 500 : 1).then(
											() =>
												this.props.demoFailedApiValidation
													? Promise.reject()
													: Promise.resolve(value !== 'error'),
										)
								: null
						}
						isRequiredField
						validationDelay={this.props.validationDelay}
						validationErrorString="Sorry, that location could not be validated."
						renderInput={props => (
							<TextInput
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
				</DemoRow>
				<DemoRow>
					<ButtonPadding>
						<Button disabled={this.state.hasError} primary medium>
							Save
						</Button>
					</ButtonPadding>
					<ButtonPadding>
						<Button
							primaryOutline
							medium
							onClick={() => this.setState({ inputValue: Math.random() })}
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
