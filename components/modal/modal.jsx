import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ModalHeader from './modal-header.jsx';
import DefaultModalFooter from './default-modal-footer.jsx';
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
		/** values for rendering an FL standard footer */
		footerProps: PropTypes.shape({
			commit: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
			}),
			cancel: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
			}),
			delete: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
			}),
		}),
		/**  */
		renderFooter: PropTypes.func,
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
		const {
			theme,
			title,
			subtitle,
			onClose,
			isOpen,
			children,
			renderFooter,
			footerProps,
		} = this.props;

		if (!isOpen) {
			return null;
		}

		return (
			<ThemeProvider theme={theme}>
				<Styled.Backdrop
					innerRef={backdrop => {
						this.backdrop = backdrop;
					}}
					onClick={this.handleBackdropClick}
				>
					<Styled.Modal>
						<ModalHeader title={title} subtitle={subtitle} onClose={onClose} />
						{children}
						{renderFooter ? renderFooter() : <DefaultModalFooter {...footerProps} />}
					</Styled.Modal>
				</Styled.Backdrop>
			</ThemeProvider>
		);
	}
}
