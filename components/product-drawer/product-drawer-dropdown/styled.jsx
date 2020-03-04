import styled, { keyframes } from 'styled-components';
import { mediaSizes } from '../../shared-styles';

const dropdownSlideDownFadeIn = keyframes`
	0% {
		top: 10px;
		opacity: 0.6;
	}

	66% {
		opacity: 1;
	}

	100% {
		top: 20px;
	}
`;

export const ProductDrawerDropdown = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: ${({ styleOverrides }) => styleOverrides.mobileTopOffset || '0'};
	overflow-y: scroll;

	&:focus {
		outline: none;
	}

	@media (min-width: ${mediaSizes.tablet}) {
		position: absolute;
		left: auto;
		bottom: auto;
		top: auto;
		right: ${({ styleOverrides }) => styleOverrides.tabletRightOffset || '0'};
		overflow-y: auto;
		animation-duration: 300ms;
		animation-timing-function: cubic-bezier(0.33, 0, 0, 1);
		animation-fill-mode: forwards;
		animation-name: ${dropdownSlideDownFadeIn};
	}

	@media (min-width: ${mediaSizes.desktop}) {
		right: 0;
	}

	white-space: nowrap;
	border-radius: 4px;
	background-color: white;
	z-index: 999;
	box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.23);
`;

export const DropdownClose = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	border: none;
	background-color: transparent;
`;

export const DropdownColumns = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: ${mediaSizes.tablet}) {
		flex-direction: row;
	}
`;

export const DropdownColumn = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	@media (min-width: ${mediaSizes.tablet}) {
		width: 358px;
	}

	&:first-of-type {
		border-right: 1px solid #ebebeb;
	}
`;

export const DropdownHeader = styled.div`
	padding: 20px 0 10px;
	background-color: #f5f5f5;
	text-align: center;

	img {
		height: 30px;
		width: 30px;
	}

	h1 {
		margin: -8px 0 0;
		font-size: 16px;
		font-weight: 900;
		line-height: 1.56;
		letter-spacing: 0.2px;
		color: #585250;
		font-family: 'Gotham A', 'Gotham B', sans-serif;
	}

	@media (min-width: ${mediaSizes.tablet}) {
		padding: 15px 0;
	}

	@media (min-width: ${mediaSizes.tablet}) and (max-height: @screen-xs-max) {
		img {
			display: none;
		}

		h1 {
			margin: 0;
		}
	}

	@media (min-width: ${mediaSizes.tablet}) and (min-height: ${mediaSizes.tablet}) {
		padding: 36px 0 22px;

		img {
			height: auto;
			width: auto;
		}

		h1 {
			margin: 0;
			font-size: 18px;
		}
	}
`;

export const DropdownBody = styled.div`
	padding: 16px 0;

	@media (min-width: ${mediaSizes.tablet}) {
		padding: 11px 0;
	}

	@media (min-width: ${mediaSizes.tablet}) and (min-height: ${mediaSizes.tablet}) {
		padding: 22px 0;
	}
`;

export const DropdownFooter = styled.div`
	margin-top: auto;
	padding: 0 0 20px;
	text-align: center;
	color: #a8a8a8;

	h1 {
		margin: 0;
		font-size: 18px;
		font-weight: bold;
		line-height: normal;
		color: #585250;
	}

	p {
		margin-top: 0;
		font-size: 14px;
		line-height: 1.5;
	}
`;

export const DropdownSeeMore = styled.div`
	border-radius: 0 0 4px 4px;
	text-align: center;
`;

export const DropdownSeeMoreLink = styled.a`
	text-decoration: none;
	display: block;
	padding: 14px;
	font-size: 14px;
	line-height: 1;
	color: #575251;
	background-color: #ebebeb;

	&:hover {
		background-color: #d2d2d2;
	}

	&:focus,
	&:hover {
		text-decoration: none;
	}

	@media (min-width: ${mediaSizes.tablet}) {
		padding: 9px;
	}

	@media (min-width: ${mediaSizes.tablet}) and (min-height: ${mediaSizes.tablet}) {
		padding: 14px;
	}
`;

export const FooterDivider = styled.hr`
	margin: 0 40px 12px;
	border: 0;
	border-bottom: 1px solid #ebebeb;

	@media (min-width: ${mediaSizes.tablet}) and (min-height: ${mediaSizes.tablet}) {
		margin-bottom: 20px;
	}
`;

export const FooterComingSoon = styled.div`
	font-family: 'Gotham A', 'Gotham B', sans-serif;
	font-size: 18px;
	font-weight: 900;
	letter-spacing: 0.2px;
	color: #585250;
`;

export const LearnMoreLink = styled.a`
	text-decoration: none;
	background-color: #5fbc39;
	color: white;
	border-radius: 4px;
	padding: 5px 21px;
	font-size: 16px;
	font-weight: bold;
	line-height: 1;

	&:hover {
		background-color: #42991d;
	}

	&:active,
	&:hover {
		color: white;
	}
`;
