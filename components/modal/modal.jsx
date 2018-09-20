import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { debouncedResize } from '../utils';
import { ModalBackdrop } from '../modal-backdrop/component.jsx';
import { ModalHeader } from './modal-header.jsx';
import { DefaultModalFooter } from './default-modal-footer.jsx';
import * as Styled from './styled.jsx';

/**
 * Modal
 */
export class Modal extends React.Component {
	static propTypes = {
		/** Controls state of modal */
		isOpen: PropTypes.bool.isRequired,
		/** Title of the modal */
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
		/** Any explaining text to include in the modal header */
		subtitle: PropTypes.string,
		/** Callback function for when the modal is close  */
		onClose: PropTypes.func.isRequired,
		/** Contents of the modal */
		children: PropTypes.node.isRequired,
		/** Customizable theme properties */
		theme: PropTypes.object,
		/** Values for rendering an FL standard footer */
		footerProps: PropTypes.shape({
			commitButton: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
			}),
			cancelButton: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
			}),
			deleteButton: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
			}),
		}),
		/** A default footer will be rendered if you don't supply a renderFooter function */
		renderFooter: PropTypes.func,
		/** No footer will be rendered if withoutFooter is true */
		withoutFooter: PropTypes.bool,
	};

	static defaultProps = {
		theme: {
			background: 'white',
		},
	};

	state = {
		modalWidth: null,
	};

	componentDidMount() {
		const { cancel } = debouncedResize(this.handleResize);
		this.cancelResizeListener = cancel;
	}

	componentWillUnmount() {
		if (this.cancelResizeListener) this.cancelResizeListener();
	}

	handleResize = () => {
		if (this._modal) {
			this.setState({ modalWidth: this._modal.clientWidth });
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
			withoutFooter,
		} = this.props;

		if (!isOpen) {
			return null;
		}

		const { modalWidth } = this.state;

		const verticalButtons =
			modalWidth &&
			!renderFooter &&
			(modalWidth < 220 ||
				(modalWidth < 320 && footerProps && Object.keys(footerProps).length === 3));

		return (
			<ThemeProvider theme={{ ...theme, verticalButtons }}>
				<ModalBackdrop onClose={onClose}>
					<Styled.Modal
						innerRef={modal => {
							this._modal = modal;
							if (modal && modalWidth === null) this.setState({ modalWidth: modal.clientWidth });
						}}
					>
						<ModalHeader title={title} subtitle={subtitle} onClose={onClose} />
						<Styled.ModalContent> {children} </Styled.ModalContent>
						{withoutFooter ? null : renderFooter ? (
							renderFooter()
						) : (
							<DefaultModalFooter useFullWidthButtons={verticalButtons} {...footerProps} />
						)}
					</Styled.Modal>
				</ModalBackdrop>
			</ThemeProvider>
		);
	}
}
