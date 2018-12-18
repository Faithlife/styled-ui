import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

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
		styleOverrides: PropTypes.shape({
			zIndex: PropTypes.number,
		}),
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
		const { children, styleOverrides } = this.props;

		return (
			<Styled.Backdrop
				innerRef={backdrop => {
					this._backdrop = backdrop;
				}}
				onMouseDown={this.handleBackdropCloseEventStart}
				onMouseUp={this.handleBackdropCloseEventEnd}
				onTouchStart={this.handleBackdropCloseEventStart}
				onTouchEnd={this.handleBackdropCloseEventEnd}
				styleOverrides={styleOverrides}
			>
				{children}
			</Styled.Backdrop>
		);
	}
}
