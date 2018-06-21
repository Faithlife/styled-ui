import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ModalHeader from './modal-header.jsx';
import * as Styled from './styled.jsx';

/**
 * Modal
 */
export default class Modal extends React.Component {
	static propTypes = {
		/** controls state of modal */
		isOpen: PropTypes.bool.isRequired,
		/** Title of the modal */
		title: PropTypes.oneOfType(PropTypes.string, PropTypes.node).isRequired,
		/** Any explaining text to include in the modal header */
		subtitle: PropTypes.string,
		/** Callback function for when the modal is close  */
		onClose: PropTypes.func.isRequired,
		/** Contents of the modal */
		children: PropTypes.node.isRequired,
		/** Customizable theme properties */
		theme: PropTypes.object,
	};

	static defaultProps = {
		theme: {
			background: 'white',
		},
	};

	handleBackdropClick = backdrop => {
		if (backdrop.target === this.backdrop) {
			this.props.onClose();
		}
	};

	render() {
		const { theme, title, subtitle, onClose, isOpen, children } = this.props;

		if (!isOpen) {
			return null;
		}

		return (
			<ThemeProvider theme={theme}>
				<Styled.Backdrop
					ref={backdrop => {
						this.backdrop = backdrop;
					}}
					onClick={this.handleBackdropClick}
				>
					<Styled.Modal>
						<ModalHeader title={title} subtitle={subtitle} onClose={onClose} />
						{children}
					</Styled.Modal>
				</Styled.Backdrop>
			</ThemeProvider>
		);
	}
}
