import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Button } from '../button';
import { ModalFooter } from './modal-footer';

export const DefaultModalFooter = props => (
	<ModalFooter>
		<Box
			display="flex"
			flexDirection={props.useFullWidthButtons ? 'column-reverse' : 'row-reverse'}
			justifyContent="flex-start"
			alignItems="center"
			width="100%"
		>
			{props.commitButton && (
				<Button
					primary
					medium
					tabIndex={props.commitButton.tabindex}
					onClick={props.commitButton.onClick}
					width={props.useFullWidthButtons ? '100%' : null}
				>
					{props.commitButton.text}
				</Button>
			)}
			{props.cancelButton && (
				<Box
					width={props.useFullWidthButtons && '100%'}
					marginBottom={props.useFullWidthButtons ? 5 : ''}
					marginRight={props.useFullWidthButtons ? '' : 5}
				>
					<Button
						primaryOutline
						medium
						tabIndex={props.cancelButton.tabindex}
						onClick={props.cancelButton.onClick}
						width={props.useFullWidthButtons ? '100%' : null}
					>
						{props.cancelButton.text}
					</Button>
				</Box>
			)}
			{props.deleteButton && (
				<Box
					width={props.useFullWidthButtons && '100%'}
					marginBottom={props.useFullWidthButtons && 5}
					marginRight={props.useFullWidthButtons || 'auto'}
				>
					<Button
						primaryOutline
						medium
						onClick={props.deleteButton.onClick}
						defaultColor="red4"
						hoverColor="red3"
						activeColor="red5"
						disabledColor="red1"
						width={props.useFullWidthButtons ? '100%' : null}
					>
						{props.deleteButton.text}
					</Button>
				</Box>
			)}
		</Box>
	</ModalFooter>
);

DefaultModalFooter.propTypes = {
	commitButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		tabindex: PropTypes.string,
	}),
	cancelButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		tabindex: PropTypes.string,
	}),
	deleteButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
	}),
	useFullWidthButtons: PropTypes.bool,
};
