import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { InferredSelect, InferredText, Select } from '../../../components/text-input-v2';
import { Button } from '../../../components/main';

const DemoContainer = styled.div`
	&& > * {
		margin: 8px;
	}
`;

export class InferredSelectFocusDemo extends Component {
	inputRef = createRef();

	state = { selected: { value: 'washington', label: 'Washington' }, confirmed: false };

	render() {
		return (
			<DemoContainer>
				<div>{this.state.selected.value}</div>
				<div>
					<Button primary small onClick={() => this.inputRef.current.getInstance().focus()}>
						Focus input
					</Button>
				</div>
				<div>
					<InferredSelect
						confidence={this.state.confirmed ? null : 0.9}
						renderSelect={({ DropdownIndicator }) => (
							<Select
								components={{ DropdownIndicator }}
								inputRef={this.inputRef}
								onChange={selected => {
									this.setState({ selected, confirmed: true });
								}}
								options={[
									{ value: 'washington', label: 'Washington' },
									{ value: 'california', label: 'California' },
									{ value: 'Texas', label: 'Texas' },
								]}
								placeholder="Choose a state..."
								defaultValue={this.state.selected}
							/>
						)}
						onConfirm={() => this.setState({ confirmed: true })}
					/>
				</div>
			</DemoContainer>
		);
	}
}

export class InferredTextFocusDemo extends Component {
	inputRef = createRef();

	state = { value: 'This value was guessed', confirmed: false };

	render() {
		return (
			<DemoContainer>
				<div>
					<Button primary small onClick={() => this.inputRef.current.focus()}>
						Focus input
					</Button>
				</div>
				<div>
					<InferredText
						confidence={this.state.confirmed ? null : 0.9}
						onChange={value => this.setState({ value, confirmed: true })}
						onConfirm={() => this.setState({ confirmed: true })}
						value={this.state.value}
						innerRef={this.inputRef}
					/>
				</div>
			</DemoContainer>
		);
	}
}
