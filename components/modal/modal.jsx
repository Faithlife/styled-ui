import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { debouncedResize } from '../utils';
import { ModalBackdrop } from '../modal-backdrop';
import { ModalHeader } from './modal-header';
import { DefaultModalFooter } from './default-modal-footer';
import * as Styled from './styled';

/**
 * Modal with flexible contents. See also: SimpleModal
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
		/** Style overrides, the z-index is applied to the backdrop */
		styleOverrides: PropTypes.shape({
			bottomBorder: PropTypes.string,
			zIndex: PropTypes.number,
		}),
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
		/** Set to 'body' to attach the modal to body, otherwise will attach as a child element */
		container: PropTypes.string,
	};

	static defaultProps = {
		theme: {
			background: 'white',
		},
		styleOverrides: {
			zIndex: 1050,
		},
	};

	state = {
		modalWidth: null,
		canUseDom: false,
	};

	componentDidMount() {
		const { cancel } = debouncedResize(this.handleResize);
		this.cancelResizeListener = cancel;
		this.setState({ canUseDom: true }); // eslint-disable-line

		const { container } = this.props;
		if (container === undefined || container === 'body') {
			this.targetContainer = document.body;
		} else if (typeof container === 'string') {
			// must be an id or body
			this.targetContainer = document.getElementById(container);
		} else {
			// must be a ref
			this.targetContainer = typeof container === 'object' ? container.current : container();
		}
	}

	componentWillUnmount() {
		if (this.cancelResizeListener) {
			this.cancelResizeListener();
		}
	}

	handleResize = () => {
		if (this._modal) {
			this.setState({ modalWidth: this._modal.clientWidth });
		}
	};

	renderModal() {
		const {
			theme,
			title,
			subtitle,
			onClose,
			children,
			renderFooter,
			footerProps,
			withoutFooter,
			styleOverrides,
		} = this.props;

		const { modalWidth } = this.state;

		const verticalButtons =
			modalWidth &&
			!renderFooter &&
			(modalWidth < 220 ||
				(modalWidth < 320 && footerProps && Object.keys(footerProps).length === 3));

		const backdropStyleOverrides = {
			zIndex: styleOverrides.zIndex,
		};

		return (
			<ThemeProvider theme={{ ...theme, verticalButtons }}>
				<ModalBackdrop onClose={onClose} styleOverrides={backdropStyleOverrides}>
					<Styled.Modal
						ref={modal => {
							this._modal = modal;
							if (modal && modalWidth === null) {
								this.setState({ modalWidth: modal.clientWidth });
							}
						}}
					>
						<ModalHeader
							title={title}
							subtitle={subtitle}
							onClose={onClose}
							styleOverrides={styleOverrides}
						/>
						<Styled.ModalContent> {children} </Styled.ModalContent>
						{!withoutFooter &&
							(renderFooter ? (
								renderFooter()
							) : (
								<DefaultModalFooter useFullWidthButtons={verticalButtons} {...footerProps} />
							))}
					</Styled.Modal>
				</ModalBackdrop>
			</ThemeProvider>
		);
	}

	render() {
		if (!this.props.isOpen || !this.state.canUseDom) {
			return null;
		}

		if (this.targetContainer) {
			return createPortal(this.renderModal(), this.targetContainer);
		}

		return this.renderModal();
	}
}
