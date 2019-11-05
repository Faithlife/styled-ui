import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Box } from '../Box';
import { debouncedResize } from '../utils';
import { ModalBackdrop } from '../modal-backdrop';
import { ModalSpacingContextProvider } from './use-modal-spacing';

/** A flexible component built on styled-system primitives. */
export class Modal extends React.Component {
	static propTypes = {
		/** Controls state of modal. */
		isOpen: PropTypes.bool.isRequired,
		/** Callback function for when the modal is closed.  */
		onClose: PropTypes.func.isRequired,
		/** Consider using the Modal.Header, Modal.Content, and Modal.Footer components as children. */
		children: PropTypes.node.isRequired,
		/** Set to 'body' to attach the modal to body, otherwise will attach as a child element. */
		container: PropTypes.string,
		/** Will apply padding to Modal.Header, Modal.Content, and Modal.Footer child components. Uses the spacing scale from the theme. */
		contentSpacing: PropTypes.number,
		/** Intended for modals with lots of functionality, such as media galleries or editors. */
		fullscreen: PropTypes.bool,
	};

	static defaultProps = {
		contentSpacing: 5,
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
		if (container) {
			if (typeof container === 'string') {
				// must be an id or body
				this.targetContainer =
					container === 'body' ? document.body : document.getElementById(container);
			} else {
				// must be a ref
				this.targetContainer = typeof container === 'object' ? container.current : container();
			}
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
			onClose,
			children,
			theme,
			styleOverrides,
			contentSpacing,
			fullscreen,
			...props
		} = this.props;

		const { modalWidth } = this.state;

		return (
			<ModalBackdrop onClose={onClose} zIndex={(styleOverrides && styleOverrides.zIndex) || 1050}>
				<ModalSpacingContextProvider value={contentSpacing}>
					<Box
						ref={modal => {
							this._modal = modal;
							if (modal && modalWidth === null) {
								this.setState({ modalWidth: modal.clientWidth });
							}
						}}
						display="flex"
						flexDirection="column"
						justifyContent={fullscreen ? 'flex-start' : 'center'}
						alignItems="center"
						width={fullscreen ? ['100vw', '90vw'] : ['100vw', 'fit-content']}
						height={fullscreen ? ['100vh', '90vh'] : 'fit-content'}
						maxWidth={['100%', 'calc(100% - 32px)']}
						maxHeight={fullscreen ? '100%' : ['100%', 'calc(100% - 32px)']}
						margin="auto"
						borderRadius={1}
						backgroundColor={(theme && theme.background) || 'white'}
						{...props}
					>
						{children}
					</Box>
				</ModalSpacingContextProvider>
			</ModalBackdrop>
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
