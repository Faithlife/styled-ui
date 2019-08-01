import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

/** A bordered drop zone that makes drag & drop easy. */
export class DropZone extends PureComponent {
	static propTypes = {
		/**
		 * An event handler that will be invoked on the drop event.
		 * Signature: (dropEvent: React.SyntheticEvent) => void;
		 */
		onDrop: PropTypes.func.isRequired,
		/** The contents of the drop zone. Children will be rendered into a flex container with align-items set to center. */
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
