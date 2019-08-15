import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Box } from '../Box';
import { Button } from '../button';
import { ModalBackdrop } from '../modal-backdrop';
import { Close } from '../icons';
import { debouncedResize } from '../utils';

/**
 * Simple modal with just a close icon and no padding. For a standardized modal layout, please see: Modal
 */
export class SimpleModal extends React.Component {
	static propTypes = {
		/** controls state of modal */
		isOpen: PropTypes.bool.isRequired,
		/** Callback function for when the modal is close  */
		onClose: PropTypes.func.isRequired,
		/** Contents of the modal */
		children: PropTypes.node.isRequired,
		/** Set to 'body' to attach the modal to body, otherwise will attach as a child element */
		container: PropTypes.string,
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
		const { onClose, children, ...props } = this.props;
		const { modalWidth } = this.state;

		return (
			<ModalBackdrop onClose={onClose}>
				<Box
					ref={modal => {
						this._modal = modal;
						if (modal && modalWidth === null) {
							this.setState({ modalWidth: modal.clientWidth });
						}
					}}
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					position="relative"
					width="fit-content"
					height="fit-content"
					maxHeight="80%"
					borderRadius={1}
					backgroundColor="white"
					{...props}
				>
					<Box position="absolute" top="24px" right="24px">
						<Button minorTransparent icon={<Close />} onClick={onClose} />
					</Box>
					{children}
				</Box>
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
