import React, { Component, createRef } from 'react';
import { InferredText } from '../../components/text-input/index.js';
import { Bootstrap } from '../../components/main.js';

const { FormGroup, Button } = Bootstrap;

export class FocusDemo extends Component {
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
							onChange={e => this.setState({ value: e.target.value, confirmed: true })}
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
