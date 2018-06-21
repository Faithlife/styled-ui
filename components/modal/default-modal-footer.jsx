import React from 'react';
import PropTypes from 'prop-types';
import Button from '../demo-button/component.jsx';
import { colors } from '../shared-styles';
import ModalFooter from './modal-footer.jsx';
import * as Styled from './styled.jsx';

const DefaultModalFooter = ({ commit, cancel, delete: deletion }) => {
	return (
		<ModalFooter>
			<Styled.FooterContainer>
				{deletion && (
					<Styled.DeleteContainer>
						<Button
							primaryOutline
							medium
							theme={{
								defaultColor: colors.redBase,
								hoverColor: colors.redLight,
								activeColor: colors.redDark,
								disabledColor: colors.redTint,
							}}
							onClick={deletion.onClick}
						>
							{deletion.text}
						</Button>
					</Styled.DeleteContainer>
				)}
				{cancel && (
					<Styled.CancelContainer>
						<Button primaryOutline medium onClick={cancel.onClick}>
							{cancel.text}
						</Button>
					</Styled.CancelContainer>
				)}
				{commit && (
					<Button primary medium onClick={commit.onClick}>
						{commit.text}
					</Button>
				)}
			</Styled.FooterContainer>
		</ModalFooter>
	);
};

export default DefaultModalFooter;

DefaultModalFooter.propTypes = {
	commit: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
	}),
	cancel: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
	}),
	delete: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
	}),
};
