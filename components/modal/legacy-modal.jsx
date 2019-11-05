import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Box } from '../Box';
import { debouncedResize, deprecateProp } from '../utils';
import { ModalBackdrop } from '../modal-backdrop';
import { Modal } from './index';
import { LegacyModalContent, v6ImportHelpText } from './legacy-utils';
import { ModalContent } from './modal-content';
import { ModalContextProvider } from './use-modal-context';

/**
 * Modal with flexible contents. See also: SimpleModal
 */
export class LegacyModal extends React.Component {
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
		/** Values for rendering an FL standard footer */
		footerProps: PropTypes.shape({
			commitButton: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
				disabled: PropTypes.bool,
			}),
			cancelButton: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
				disabled: PropTypes.bool,
			}),
			deleteButton: PropTypes.shape({
				onClick: PropTypes.func.isRequired,
				text: PropTypes.string.isRequired,
				disabled: PropTypes.bool,
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
			theme,
			styleOverrides,
			...props
		} = this.props;

		deprecateProp(
			title,
			`[Modal] the title prop is being moved to the new <Modal.Header /> component.\n${v6ImportHelpText}`,
		);

		deprecateProp(
			subtitle,
			`[Modal] the subtitle prop is being moved to the new <Modal.Header /> component.\n${v6ImportHelpText}`,
		);

		deprecateProp(
			headerBottomBorder,
			`[Modal] the headerBottomBorder prop is deprecated. The default modal styles no longer have a bottom-border on the modal header, but if you need one you can supply a borderBottom prop to the <Modal.Header /> component.\n${v6ImportHelpText}`,
		);

		deprecateProp(
			renderFooter,
			`[Modal] the renderFooter prop is deprecated. Please use the new <Modal.Footer /> component.\n${v6ImportHelpText}`,
		);

		deprecateProp(
			withoutFooter,
			`[Modal] the withoutFooter prop is deprecated and no longer needed. If you do not need a <Modal.Footer /> component, you don't have to supply one.\n${v6ImportHelpText}`,
		);

		deprecateProp(
			footerProps,
			`[Modal] the footerProps prop is deprecated. Please use the new <Modal.Footer /> component. The <Modal.FooterButtons /> component accepts the same props that were included in the footerProps object.\n${v6ImportHelpText}`,
		);

		const { modalWidth } = this.state;

		const doesChildrenIncludeModalContent =
			React.Children.count(children) === 1 &&
			(React.Children.only(children).type === ModalContent ||
				React.Children.only(children).type === LegacyModalContent ||
				React.Children.only(children).type === Modal.Content);

		return (
			<ModalBackdrop onClose={onClose} zIndex={(styleOverrides && styleOverrides.zIndex) || 1050}>
				<ModalContextProvider value={5}>
					<Box
						ref={modal => {
							this._modal = modal;
							if (modal && modalWidth === null) {
								this.setState({ modalWidth: modal.clientWidth });
							}
						}}
						display="flex"
						flexDirection="column"
						justifyContent={'center'}
						alignItems="center"
						width={['100vw', 'fit-content']}
						height={'fit-content'}
						maxWidth={['100%', 'calc(100% - 32px)']}
						maxHeight={['100%', 'calc(100% - 32px)']}
						margin="auto"
						borderRadius={1}
						backgroundColor={(theme && theme.background) || 'white'}
						{...props}
					>
						<Modal.Header title={title} subtitle={subtitle} />
						{doesChildrenIncludeModalContent ? children : <Modal.Content>{children}</Modal.Content>}
						{!withoutFooter &&
							(renderFooter ? (
								renderFooter()
							) : (
								<Modal.Footer>
									<Modal.FooterButtons {...footerProps} />
								</Modal.Footer>
							))}
					</Box>
				</ModalContextProvider>
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
