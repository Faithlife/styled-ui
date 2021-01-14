import React from 'react';
import styled from 'styled-components';
import { Camera as UnstyledCamera } from '../icons/18px';
import { X as UnstyledX } from '../icons/12px';

const IconContainerBase = styled.div`
	background-color: rgba(0, 0, 0, 0.3);
	position: absolute;
	top: 6px;
	right: 6px;
	cursor: pointer;
`;

const RemoveIconContainer = styled(IconContainerBase)`
	width: 16px;
	height: 16px;
	padding: 3px;
	border-radius: 50%;
`;

const CameraIconContainer = styled(IconContainerBase)`
	width: 20px;
	height: 20px;
	padding: 8px;
	border-radius: 6px;
`;

export const SelectCamera = styled(UnstyledCamera)`
	margin-bottom: 8px;
`;

const EditCamera = styled(SelectCamera)`
	& path {
		fill: ${({ theme }) => theme.colors.gray4};
	}
`;

const X = styled(UnstyledX)`
	& path {
		fill: ${({ theme }) => theme.colors.gray4};
	}
`;

export const RemoveIcon = ({ onClick = () => {} }) => {
	const handleClick = e => {
		e.stopPropagation();
		onClick();
	};

	return (
		<RemoveIconContainer onClick={handleClick}>
			<X />
		</RemoveIconContainer>
	);
};

export const CameraIcon = ({ onClick = () => {} }) => {
	const handleClick = e => {
		e.stopPropagation();
		onClick();
	};

	return (
		<CameraIconContainer onClick={handleClick}>
			<EditCamera />
		</CameraIconContainer>
	);
};
