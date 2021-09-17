import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

/**
 * Modal Backdrop
 */
export class ModalBackdrop extends React.Component {
	static propTypes = {
		/** Callback function to tell modal to close due to clicking the backdrop */
		onClose: PropTypes.func.isRequired,
		/** The z-index of the backdrop */
		zIndex: PropTypes.number,
		/** Contents of the modal */
		children: PropTypes.node.isRequired,
		/** Whether background page scrolling is allowed while modal is open. */
		allowBackgroundScrolling: PropTypes.bool,
		/** Flag to prevent closing modal on backdrop click */
		ignoreClickOnBackdrop: PropTypes.bool,
	};

	inPotentialCloseEvent = false;

	componentDidMount() {
		if (!this.props.allowBackgroundScrolling) {
			document.body.style.overflow = 'hidden';
		}
	}

	componentWillUnmount() {
		if (!this.props.allowBackgroundScrolling) {
			document.body.style.overflow = '';
		}
	}

	handleBackdropCloseEventStart = event => {
		if (event.target === this._backdrop) {
			this.inPotentialCloseEvent = true;
		}
	};

	handleBackdropCloseEventEnd = event => {
		if (
			!this.props.ignoreClickOnBackdrop &&
			event.target === this._backdrop &&
			this.inPotentialCloseEvent
		) {
			this.props.onClose();
		}

		this.inPotentialCloseEvent = false;
	};

	render() {
		const { children, ...props } = this.props;

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
				{...props}
			>
				{children}
			</Box>
		);
	}
}
