import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

	render() {
		return (
			<Demos>
				<DemoRow>
					{this.props.demoValidation ? (
						<TextInput.Validation
							value={this.state.inputValue}
							onChange={this.onChange}
							getIsValidInput={
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
									: null
							}
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
