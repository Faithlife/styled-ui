import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../components';
import ValidatedInput from './validated-input.jsx';

const Demos = styled.div`
	width: 300px;
	font-family: sans-serif;
`;

const DemoRow = styled.div`
	padding: 8px;
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
						title="Location"
						help={<span>Try typing 'error'</span>}
						theme={this.props.theme}
						placeholder="Bellingham"
						isRequiredField
						validationDelay={this.props.validationDelay}
						validationErrorString="Sorry, that location could not be validated."
					/>
				</DemoRow>
				<DemoRow>
					<Button disabled={this.state.hasError} primary medium>
						Save
					</Button>
				</DemoRow>
			</Demos>
		);
	}
}
