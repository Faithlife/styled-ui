import React, { Component, createRef } from 'react';
import { InferredTypeahead, InferredText } from '../../components/text-input/index.js';
import { Bootstrap } from '../../components/main.ts';

const { FormGroup, Button } = Bootstrap;

export class InferredTypeaheadFocusDemo extends Component {
	inputRef = createRef();

	state = { value: 'California', confirmed: false };

	render() {
		return (
			<div>
				<div>
					<Button
						className="mb-3"
						size="md"
						color="primary"
						onClick={() => this.inputRef.current.getInstance().focus()}
					>
						Focus input
					</Button>
				</div>
				<div>
					<FormGroup>
						<InferredTypeahead
							confidence={this.state.confirmed ? null : 0.9}
							onChange={value => this.setState({ value, confirmed: true })}
							options={['Washington', 'California', 'Texas']}
							onConfirm={() => this.setState({ confirmed: true })}
							defaultInputValue={this.state.value}
							innerRef={this.inputRef}
						/>
					</FormGroup>
				</div>
			</div>
		);
	}
}

export class InferredTextFocusDemo extends Component {
	inputRef = createRef();

	state = { value: 'This value was guessed', confirmed: false };

	render() {
		return (
			<div>
				<div>
					<Button
						className="mb-3"
						size="md"
						color="primary"
						onClick={() => this.inputRef.current.focus()}
					>
						Focus input
					</Button>
				</div>
				<div>
					<FormGroup>
						<InferredText
							confidence={this.state.confirmed ? null : 0.9}
							onChange={value => this.setState({ value, confirmed: true })}
							onConfirm={() => this.setState({ confirmed: true })}
							value={this.state.value}
							innerRef={this.inputRef}
						/>
					</FormGroup>
				</div>
			</div>
		);
	}
}
