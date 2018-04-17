import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import styled from 'styled-components';

const CheckboxDiv = styled.div`
	position: absolute;
	border: solid 1px ${props => props.theme.border};
	border-radius: 3px;
	width: 14px;
	height: 14px;
	background: transparent;
`;

const CheckboxContainer = styled.button`
	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0;
	height: 16px;
	min-width: 0;
	min-height: 16px;
	background: transparent;

	&:hover,
	&:focus {
		${CheckboxDiv} {
			border: solid 1px ${props => props.theme.primary};
		}
	}
`;

const isCheckedStyles = `&:after {
	opacity: 1;
}`;

const CheckedIndicator = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 14px;
	height: 14px;
	cursor: pointer;

	&:after {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		opacity: 0;
		transform: rotate(-45deg);
		border: 2px solid ${props => props.theme.primary};
		border-top: none;
		border-right: none;
		width: 7px;
		height: 3px;
		background: transparent;
	}

	${props => (props.isChecked ? isCheckedStyles : '')};
`;

const Label = styled.div`
	margin-left: 22px;
`;

// Ported from https://git/Logos/Sites.Admin/blob/db17162da13a47c82eea000cfdd6384e8a174874/src/Sites.Admin/Private/scripts/components/checkbox/checkbox.jsx
export default function Checkbox({ onClick, title, isChecked, theme }) {
	return (
		<CheckboxContainer theme={theme} onClick={onClick}>
			<CheckboxDiv theme={theme}>
				<CheckedIndicator theme={theme} isChecked={isChecked} />
			</CheckboxDiv>
			{title && <Label theme={theme}>{title}</Label>}
		</CheckboxContainer>
	);
}

Checkbox.propTypes = forbidExtraProps({
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string,
	isChecked: PropTypes.bool,
	theme: PropTypes.object,
});

Checkbox.defaultProps = {
	theme: {
		primary: '#1E91D6',
		border: '#95908f',
	},
};
