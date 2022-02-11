import React, { useMemo, Children } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Box } from '../Box';
import { usePortalContainer } from '../shared-hooks/usePortalContainer';
import { ModalBackdrop } from '../modal-backdrop';
import { ModalContextProvider } from './useModalContext';

let nextLabelId = 0;

/** A flexible component built on styled-system primitives. */
export const Modal = ({
	isOpen,
	container: containerProp,
	onClose,
	children,
	contentPadding,
	fullscreen,
	zIndex,
	allowBackgroundScrolling,
	ignoreClickOnBackdrop,
	...props
}) => {
	const container = usePortalContainer(containerProp);
	const labelId = useMemo(() => nextLabelId++, []);

	const titleChild = useMemo(
		() => Children.toArray(children).find(x => x && x.type.isModalHeader),
		[children],
	);

	const labeledById = useMemo(() => {
		if (titleChild) {
			return `styled-ui-modal-label-${labelId}`;
		}
	}, [titleChild, labelId]);

	const describedById = useMemo(() => {
		if (titleChild && titleChild.props.subtitle) {
			return `styled-ui-modal-description-${labelId}`;
		}
	}, [titleChild, labelId]);

	const modalContext = useMemo(
		() => ({
			contentPadding,
			onClose,
			fullscreen,
			labeledById,
			describedById,
		}),
		[contentPadding, fullscreen, onClose, labeledById, describedById],
	);

	if (!isOpen) {
		return null;
	}

	const modal = (
		<ModalBackdrop
			onClose={onClose}
			zIndex={zIndex}
			allowBackgroundScrolling={allowBackgroundScrolling}
			ignoreClickOnBackdrop={ignoreClickOnBackdrop}
		>
			<ModalContextProvider value={modalContext}>
				<Box
					display="grid"
					gridTemplateRows="auto 1fr"
					justifyContent="stretch"
					alignItems="stretch"
					width={fullscreen ? ['100vw', '90vw'] : ['100vw', 'fit-content']}
					height={fullscreen ? ['100vh', '90vh'] : 'fit-content'}
					maxWidth={['100%', 'calc(100% - 32px)']}
					minHeight={0}
					maxHeight={fullscreen ? ['100vh', '90vh'] : ['100%', 'calc(100% - 32px)']}
					margin="auto"
					borderRadius={1}
					backgroundColor="white"
					role="dialog"
					aria-labelledby={labeledById}
					aria-describedby={describedById}
					aria-modal="true"
					{...props}
				>
					{children}
				</Box>
			</ModalContextProvider>
		</ModalBackdrop>
	);

	if (container) {
		return createPortal(modal, container);
	}

	return modal;
};

Modal.propTypes = {
	/** Controls state of modal. */
	isOpen: PropTypes.bool.isRequired,
	/** Callback function for when the modal is closed. */
	onClose: PropTypes.func.isRequired,
	/** Consider using the Modal.Header, Modal.Content, and Modal.Footer components as children. */
	children: PropTypes.node.isRequired,
	/** Set to 'body' to attach the modal to body, otherwise will attach as a child element. */
	container: PropTypes.string,
	/** Will apply padding to Modal.Header, Modal.Content, and Modal.Footer child components. Uses the spacing scale from the theme. */
	contentPadding: PropTypes.number,
	/** Will apply to the Modal Backdrop. */
	zIndex: PropTypes.number,
	/** Intended for modals with lots of functionality, such as media galleries or editors. */
	fullscreen: PropTypes.bool,
	/** Whether background page scrolling is allowed while modal is open. */
	allowBackgroundScrolling: PropTypes.bool,
	/** Prevents modal close on backdrop click. */
	ignoreClickOnBackdrop: PropTypes.bool,
};

Modal.defaultProps = {
	contentPadding: 5,
	zIndex: 1050,
};
