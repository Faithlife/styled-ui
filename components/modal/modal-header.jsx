import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '../icons';
import * as Styled from './styled.jsx';

export const ModalHeader = ({ title, subtitle, onClose, style }) => (
	<Styled.ModalHeader style={style}>
		<Styled.ModalTitleBar>
			<Styled.ModalTitle>{title}</Styled.ModalTitle>
			<Styled.ModalClose onClick={onClose}>
				<Close />
			</Styled.ModalClose>
		</Styled.ModalTitleBar>
		{subtitle && <Styled.ModalSubtitle>{subtitle}</Styled.ModalSubtitle>}
	</Styled.ModalHeader>
);

ModalHeader.propTypes = {
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	subtitle: PropTypes.string,
	style: PropTypes.object,
};
