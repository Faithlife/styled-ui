import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Box } from '../Box';
import { debouncedResize } from '../utils';
import { ModalBackdrop } from '../modal-backdrop';
import { ModalHeader } from './modal-header';
import { DefaultModalFooter } from './default-modal-footer';

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
		headerBottomBorder: PropTypes.string,
		/** A default footer will be rendered if you don't supply a renderFooter function */
		renderFooter: PropTypes.func,
		/** No footer will be rendered if withoutFooter is true */
		withoutFooter: PropTypes.bool,
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
		const {
			title,
			subtitle,
			onClose,
			children,
			headerBottomBorder,
			renderFooter,
			footerProps,
			withoutFooter,
			...props
		} = this.props;

		const { modalWidth } = this.state;

		const verticalButtons =
			modalWidth &&
			!renderFooter &&
			(modalWidth < 220 ||
				(modalWidth < 320 && footerProps && Object.keys(footerProps).length === 3));

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
					width="fit-content"
					height="fit-content"
					maxWidth="calc(100% - 16px)"
					maxHeight={['calc(100% - 16px)', null, '80%']}
					margin="auto"
					padding={6}
					borderRadius={1}
					backgroundColor="white"
					{...props}
				>
					<ModalHeader
						title={title}
						subtitle={subtitle}
						onClose={onClose}
						headerBottomBorder={headerBottomBorder}
					/>
					<Box
						maxWidth="100%"
						maxHeight="80%"
						css={{ overflowX: 'hidden', overflowY: 'auto', overflowWrap: 'break-word' }}
					>
						{' '}
						{children}{' '}
					</Box>
					{!withoutFooter &&
						(renderFooter ? (
							renderFooter()
						) : (
							<DefaultModalFooter useFullWidthButtons={verticalButtons} {...footerProps} />
						))}
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
