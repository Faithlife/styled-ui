import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

/**
 * Modal Backdrop
 */
export class ModalBackdrop extends React.Component {
	static propTypes = {
		/** Callback function to tell modal to close due to clicking the backdrop  */
		onClose: PropTypes.func.isRequired,
		/** Contents of the modal */
		children: PropTypes.node.isRequired,
	};

	componentDidMount() {
		document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		document.body.style.overflow = '';
	}

	handleBackdropClick = backdrop => {
		if (backdrop.target === this._backdrop) {
			this.props.onClose();
		}
	};

	render() {
		const { children } = this.props;

		return (
			<Styled.Backdrop
				innerRef={backdrop => {
					this._backdrop = backdrop;
				}}
				onClick={this.handleBackdropClick}
			>
				{children}
			</Styled.Backdrop>
		);
	}
}
