import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'focus-visible';
import { UtilityButton } from '../button';
import { Camera as UnstyledCamera } from '../icons/18px';
import { X as UnstyledX } from '../icons/12px';

const IconContainerBase = styled(UtilityButton)`
	background-color: ${({ theme }) => theme.colors.gray14};
	position: absolute;
	top: 6px;
	right: 6px;
	cursor: pointer;

	&:hover,
	&.focus-visible {
		background-color: ${({ theme }) => theme.colors.gray22};
	}
`;

const RemoveIconContainer = styled(IconContainerBase)`
	width: 20px;
	height: 20px;
	padding: 3px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CameraIconContainer = styled(IconContainerBase)`
	width: 32px;
	height: 32px;
	padding: 4px;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SelectCamera = styled(UnstyledCamera)`
	margin-bottom: 8px;
`;

const EditCamera = styled(UnstyledCamera)`
	& path {
		fill: ${({ theme }) => theme.colors.gray4};
	}
`;

const X = styled(UnstyledX)`
	& path {
		fill: ${({ theme }) => theme.colors.gray4};
	}
`;

export const RemoveIcon = ({ onClick }) => (
	<RemoveIconContainer onClick={onClick}>
		<X />
	</RemoveIconContainer>
);

RemoveIcon.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export const CameraIcon = ({ onClick }) => (
	<CameraIconContainer onClick={onClick}>
		<EditCamera />
	</CameraIconContainer>
);

CameraIcon.propTypes = {
	onClick: PropTypes.func.isRequired,
};
