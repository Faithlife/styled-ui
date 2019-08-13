import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

/**
 * Modal Backdrop
 */
export class ModalBackdrop extends React.Component {
	static propTypes = {
		/** Callback function to tell modal to close due to clicking the backdrop  */
		onClose: PropTypes.func.isRequired,
		/** Contents of the modal */
		children: PropTypes.node.isRequired,
		/** Style overrides */
	};

	inPotentialCloseEvent = false;

	componentDidMount() {
		document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		document.body.style.overflow = '';
	}

	handleBackdropCloseEventStart = event => {
		if (event.target === this._backdrop) {
			this.inPotentialCloseEvent = true;
		}
	};

	handleBackdropCloseEventEnd = event => {
		if (event.target === this._backdrop && this.inPotentialCloseEvent) {
			this.props.onClose();
		}

		this.inPotentialCloseEvent = false;
	};

	render() {
		const { children } = this.props;

		return (
			<Box
				ref={backdrop => {
					this._backdrop = backdrop;
				}}
				onMouseDown={this.handleBackdropCloseEventStart}
				onMouseUp={this.handleBackdropCloseEventEnd}
				onTouchStart={this.handleBackdropCloseEventStart}
				onTouchEnd={this.handleBackdropCloseEventEnd}
				display="flex"
				justifyContent="center"
				alignItems="center"
				position="fixed"
				top="0"
				right="0"
				bottom="0"
				left="0"
				overflow="hidden"
				background="rgba(0, 0, 0, 0.7)"
			>
				{children}
			</Box>
		);
	}
}
