import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

export class DropZone extends PureComponent {
	static propTypes = {
		onDrop: PropTypes.func.isRequired,
		children: PropTypes.node,
	};

	state = {
		showHighlight: false,
	};

	// maintain count since drag enter/leave events happen when the cursor moves over child elements
	dropTargets = 0;

	// preventing default behavior on drag events is necessary for onDrop to fire
	handleDragEnter = e => {
		e.preventDefault();

		this.dropTargets++;
		this.setState({ showHighlight: true });
	};

	handleDragLeave = e => {
		e.preventDefault();

		this.dropTargets--;
		this.setState(() => ({ showHighlight: this.dropTargets > 0 }));
	};

	handleDragOver = e => {
		e.preventDefault();
	};

	handleDrop = e => {
		this.dropTargets = 0;
		this.setState({ showHighlight: false });
		this.props.onDrop(e);
	};

	render() {
		const { children } = this.props;
		const { showHighlight } = this.state;

		return (
			<Styled.DropZone
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
				onDragOver={this.handleDragOver}
				onDrop={this.handleDrop}
				showHighlight={showHighlight}
			>
				{children}
			</Styled.DropZone>
		);
	}
}
