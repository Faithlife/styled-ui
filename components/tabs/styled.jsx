import styled, { css } from 'styled-components';
import { resetStyles } from '../utils';
import { colors, thickness } from '../shared-styles';

const borderRadius = '3px 3px 0 0';

const selectedTab = css`
	font-weight: 600;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background-color: ${({ theme }) => theme.tabHighlightColor || colors.blueBase};

		border-right: 1px solid ${({ theme }) => theme.tabHighlightColor || colors.blueBase};
		border-left: 1px solid ${({ theme }) => theme.tabHighlightColor || colors.blueBase};
		border-radius: ${borderRadius};
	}

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 1px;
		width: calc(100% - 2px);
		height: 1px;
		background-color: ${({ theme }) => theme.activeBackgroundColor || 'white'};
	}

	background-color: ${({ theme }) => theme.activeBackgroundColor || 'white'};
	border-right: 1px solid ${colors.gray14};
	border-left: 1px solid ${colors.gray14};
`;

export const Tab = styled.button`
	${resetStyles};

	box-shadow: none;
	outline: none;
	background: white;
	border: none;
	display: inline-block;
	padding: 0;
	transition: all 0.25s ease 0s;
	border: 0;
	border-radius: ${borderRadius};

	position: relative;

	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		outline: none;
	}
`;

export const TabContent = styled.span.attrs({ tabIndex: -1 })`
	border-radius: ${borderRadius};
	cursor: pointer;
	white-space: nowrap;
	min-height: fit-content;
	display: inline-block;
	font-size: ${({ styleOverrides }) => styleOverrides.fontSize || thickness.sixteen};
	width: ${({ styleOverrides }) => styleOverrides.width};
	padding: ${({ styleOverrides }) =>
		styleOverrides.padding || `${thickness.eight} ${thickness.sixteen}`};
	background-color: ${({ theme }) => theme.inactiveBackgroundColor || colors.gray4};

	&:focus {
		outline: none;
	}

	${({ selected }) => selected && selectedTab};
`;

export const TabGroup = styled.div`
	border-bottom: 1px solid ${colors.gray14};
	display: flex;
	flex-direction: row;

	& > *:not(:last-child) {
		margin-right: ${thickness.eight};
	}
`;

export const TabBody = styled.div`
	position: relative;
	padding: ${thickness.eight};
	${({ selected }) => !selected && 'display: none'};
`;
