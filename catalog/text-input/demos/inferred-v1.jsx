import React, { Component, createRef } from 'react';
import { InferredTypeahead, InferredText } from '../../../components/text-input';
import { Button } from '../../../components/main';

export class InferredTypeaheadFocusDemo extends Component {
	inputRef = createRef();

	state = { value: 'California', confirmed: false };

	render() {
		return (
			<div>
				<div>
					<Button primary medium onClick={() => this.inputRef.current.getInstance().focus()}>
						Focus input
					</Button>
				</div>
				<div>
					<InferredTypeahead
						confidence={this.state.confirmed ? null : 0.9}
						onChange={value => this.setState({ value, confirmed: true })}
						options={['Washington', 'California', 'Texas']}
						onConfirm={() => this.setState({ confirmed: true })}
						defaultInputValue={this.state.value}
						innerRef={this.inputRef}
					/>
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
					<Button primary medium onClick={() => this.inputRef.current.focus()}>
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
			</div>
		);
	}
}
