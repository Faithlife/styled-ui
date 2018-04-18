import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextInput, Button } from '../../components';

const Demos = styled.div`
	width: 300px;
	font-family: 'sans-serif';
`;

const DemoRow = styled.div`
	padding: 8px;
`;
export default class Container extends Component {
	static propTypes = {
		theme: PropTypes.object,
		validationDelay: PropTypes.number,
		demoValidation: PropTypes.bool,
	};

	state = {
		inputValue: '',
		hasError: false,
	};

	onChange = newState => {
		this.setState({ inputValue: newState.inputValue, hasError: newState.hasError });
	};

	render() {
		return (
			<Demos>
				<DemoRow>
					<TextInput
						value={this.state.inputValue}
						onChange={this.onChange}
						getIsValidInput={this.props.demoValidation ? value => value !== 'error' : null}
						title="Location"
						help={<span>Try typing 'error'</span>}
						theme={this.props.theme}
						placeholder="Bellingham"
						isRequiredField
						validationDelay={this.props.validationDelay}
						errorString="Sorry, that location could not be validated."
					/>
				</DemoRow>
				<DemoRow>
					<Button
						disabled={this.state.hasError}
						variations={[Button.variations.primary, Button.variations.medium]}
					>
						Save
					</Button>
				</DemoRow>
			</Demos>
		);
	}
}
