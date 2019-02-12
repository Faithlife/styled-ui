import styled, { keyframes } from 'styled-components';
import { mediaSizes } from '../../shared-styles';

const reveal = keyframes`
	100% {
		top: 0;
		opacity: 1;
	}
`;

export const ProductLinkInfo = styled.div`
	display: inline-block;
	white-space: initial;
`;

export const ProductLink = styled.a`
	display: flex;
	padding: 9px 20px 9px 58px;
	align-items: center;
	text-decoration: none;

	@media (min-width: ${mediaSizes.tablet}) {
		padding: 7px 27px 7px 46px;
		align-items: flex-start;
	}

	@media (min-width: ${mediaSizes.tablet}) and (min-height: ${mediaSizes.tablet}) {
		padding: 11px 27px 11px 46px;
	}

	// eslint-disable-next-line no-dupe-keys
	${ProductLinkInfo} {
		padding-left: ${props => (props.productLinkNoIcon ? '35px' : '')};
	}

	&:focus {
		outline: none;
	}
`;

export const ProductLinkTitle = styled.div`
	color: #575251;
	font-size: 16px;
	line-height: 1.06;
`;

export const ProductLinkDescription = styled.div`
	display: none;
	font-size: 13px;
	color: #a8a8a8;
	line-height: 1.31;

	@media (min-width: ${mediaSizes.tablet}) {
		display: block;
	}
`;

export const ProductLinkListItem = styled.li`
	position: relative;
	top: 5px;
	opacity: 0;
	animation-duration: 400ms;
	animation-timing-function: cubic-bezier(0.33, 0, 0, 1);
	animation-fill-mode: forwards;

	&:hover {
		background-color: #f5f5f5;

		// eslint-disable-next-line no-dupe-keys
		${ProductLink} {
			// eslint-disable-next-line no-dupe-keys
			${ProductLinkTitle} {
				color: #1e91d6;
			}

			// eslint-disable-next-line no-dupe-keys $ProductLinkDescription
			${ProductLinkDescription} {
				color: #7a7a7a;
			}
		}
	}

	&:nth-of-type(2) {
		top: 10px;
	}

	&:nth-of-type(3) {
		top: 15px;
	}

	&:nth-of-type(4) {
		top: 20px;
	}

	&:nth-of-type(5) {
		top: 25px;
	}

	&:nth-of-type(6) {
		top: 30px;
	}

	&:nth-of-type(7) {
		top: 35px;
	}

	&:nth-of-type(8) {
		top: 40px;
	}
`;

export const ProductLinkList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	// eslint-disable-next-line no-dupe-keys
	${ProductLinkListItem} {
		animation-name: ${props => (props.isVisible ? reveal : '')};
	}
`;

export const ProductLinkIconContainer = styled.div`
	width: 23px;
	margin-right: 12px;
	text-align: center;
`;
