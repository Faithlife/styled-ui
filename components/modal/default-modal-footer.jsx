import React from 'react';
import PropTypes from 'prop-types';
import Button from '../demo-button/component.jsx';
import { colors } from '../shared-styles';
import ModalFooter from './modal-footer.jsx';
import * as Styled from './styled.jsx';

const DefaultModalFooter = ({ commitButton, cancelButton, deleteButton, useFullWidthButtons }) => {
	return (
		<ModalFooter>
			<Styled.FooterContainer>
				{deleteButton && (
					<Styled.DeleteContainer>
						<Button
							primaryOutline
							medium
							theme={{
								defaultColor: colors.redBase,
								hoverColor: colors.redLight,
								activeColor: colors.redDark,
								disabledColor: colors.redTint,
								width: useFullWidthButtons ? '100%' : null,
							}}
							onClick={deleteButton.onClick}
						>
							{deleteButton.text}
						</Button>
					</Styled.DeleteContainer>
				)}
				{cancelButton && (
					<Styled.CancelContainer>
						<Button
							primaryOutline
							medium
							theme={{ width: useFullWidthButtons ? '100%' : null }}
							onClick={cancelButton.onClick}
						>
							{cancelButton.text}
						</Button>
					</Styled.CancelContainer>
				)}
				{commitButton && (
					<Button
						primary
						medium
						theme={{ width: useFullWidthButtons ? '100%' : null }}
						onClick={commitButton.onClick}
					>
						{commitButton.text}
					</Button>
				)}
			</Styled.FooterContainer>
		</ModalFooter>
	);
};

export default DefaultModalFooter;

/* eslint-disable react/no-unused-prop-types */
DefaultModalFooter.propTypes = {
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
};
/* eslint-enable react/no-unused-prop-types */
