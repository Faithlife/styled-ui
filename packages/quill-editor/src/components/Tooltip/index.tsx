import React from 'react';
import styled, { css } from 'styled-components';

export const TooltipTitle = styled.div`
	padding: 3px 8px;
	margin-top: 7px;
	background-color: #000;
	color: #fff;
	font-family: Arial, sans-serif;
	font-size: 12px;
	line-height: 1.4em;
	text-align: center;
	border-radius: 4px;
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	transition: opacity 0.5s;
	opacity: 0;
	height: 0;
	white-space: nowrap;
	user-select: none;
	z-index: 1000;
	visibility: hidden;

	&:before {
		content: '';
		width: 0;
		height: 0;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
		border-bottom: 7px solid black;
		position: absolute;
		top: -7px;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const TooltipWrapper = styled.div<{ hideTooltip?: boolean }>`
	position: relative;
	overflow: hidden;
	display: inline-block;

	&:hover {
		overflow: visible;
		${({ hideTooltip }) =>
			!hideTooltip &&
			css`
				${TooltipTitle} {
					opacity: 1;
					height: auto;
					visibility: visible;
				}
			`}
`;

export const Tooltip: React.FunctionComponent<{
	title: string;
	hideTooltip?: boolean;
}> = ({ title, hideTooltip, children }) => {
	return (
		<TooltipWrapper hideTooltip={hideTooltip}>
			{children}
			<TooltipTitle>{title}</TooltipTitle>
		</TooltipWrapper>
	);
};
