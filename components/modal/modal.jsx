import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Box } from '../Box';
import { useElementSize } from '../shared-hooks/useElementSize';
import { ModalBackdrop } from '../modal-backdrop';
import { ModalContextProvider } from './use-modal-context';

/** A flexible component built on styled-system primitives. */
export const Modal = ({
	isOpen,
	container,
	onClose,
	children,
	theme,
	styleOverrides,
	contentPadding,
	fullscreen,
	...props
}) => {
	const [size, containerRef] = useElementSize();
	const [canUseDom, setCanUseDom] = useState(false);
	const targetContainer = useRef(null);

	useEffect(() => {
		if (container) {
			if (typeof container === 'string') {
				// must be an id or body
				targetContainer.current =
					container === 'body' ? document.body : document.getElementById(container);
			} else {
				// must be a ref
				targetContainer.current = typeof container === 'object' ? container.current : container();
			}
		}
		setCanUseDom(true);
	}, [container]);

	const modalContext = useMemo(
		() => ({
			contentPadding,
			modalWidth: size ? size.width : null,
		}),
		[contentPadding, size],
	);

	if (!isOpen || !canUseDom) {
		return null;
	}

	const modal = (
		<ModalBackdrop onClose={onClose} zIndex={(styleOverrides && styleOverrides.zIndex) || 1050}>
			<ModalContextProvider value={modalContext}>
				<Box
					ref={containerRef}
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
			</ModalContextProvider>
		</ModalBackdrop>
	);

	if (targetContainer && targetContainer.current) {
		return createPortal(modal, targetContainer.current);
	}

	return modal;
};

Modal.propTypes = {
	/** Controls state of modal. */
	isOpen: PropTypes.bool.isRequired,
	/** Callback function for when the modal is closed.  */
	onClose: PropTypes.func.isRequired,
	/** Consider using the Modal.Header, Modal.Content, and Modal.Footer components as children. */
	children: PropTypes.node.isRequired,
	/** Set to 'body' to attach the modal to body, otherwise will attach as a child element. */
	container: PropTypes.string,
	/** Will apply padding to Modal.Header, Modal.Content, and Modal.Footer child components. Uses the spacing scale from the theme. */
	contentPadding: PropTypes.number,
	/** Intended for modals with lots of functionality, such as media galleries or editors. */
	fullscreen: PropTypes.bool,
};

Modal.defaultProps = {
	contentPadding: 5,
};
