import React from 'react';
import PropTypes from 'prop-types';
import { deprecateProp } from '../utils';
import { Modal } from './index';
import { LegacyModalContent, v6ImportHelpText } from './legacy-utils';
import { ModalContent } from './modal-content';

/**
 * Modal with flexible contents. See also: SimpleModal
 */
export const LegacyModal = React.forwardRef(
	(
		{
			isOpen,
			container,
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
		},
		ref,
	) => {
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

		deprecateProp(
			styleOverrides,
			`[Modal] the styleOverrides prop is deprecated. The v6 Modal component accepts a zIndex prop if you need it.\n${v6ImportHelpText}`,
		);

		deprecateProp(
			theme,
			`[Modal] the theme prop is deprecated. The v6 Modal component accepts the styled-system backgroundColor prop if you need it.\n${v6ImportHelpText}`,
		);

		const doesChildrenIncludeModalContent =
			React.isValidElement(children) &&
			(children.type === ModalContent ||
				children.type === LegacyModalContent ||
				children.type === Modal.Content);

		return (
			<Modal
				ref={ref}
				isOpen={isOpen}
				onClose={onClose}
				container={container}
				zIndex={styleOverrides && styleOverrides.zIndex ? styleOverrides.zIndex : 1050}
				backgroundColor={theme && theme.background ? theme.background : 'white'}
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
			</Modal>
		);
	},
);

LegacyModal.displayName = 'LegacyModal';

LegacyModal.propTypes = {
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
