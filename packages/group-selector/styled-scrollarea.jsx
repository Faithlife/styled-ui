import styled from 'styled-components';
import WrappedScrollArea from 'react-scrollbar/dist/no-css';

// These styles were imported from https://github.com/souhe/reactScrollbar/blob/a2edd9915d16df2b0a7a4448379526b25cca4ea3/src/less/scrollArea.less
export const ScrollArea = styled(WrappedScrollArea)`
	position: relative;
	overflow: hidden;

	.scrollarea-content {
		margin: 0;
		padding: 0;
		overflow: hidden;
		position: relative;

		&:focus {
			outline: 0;
		}
	}

	.scrollbar-container {
		&.horizontal {
			width: 100%;
			height: 10px;
			left: 0;
			bottom: 0;

			.scrollbar {
				width: 20px;
				height: 8px;
				background: black;
				margin-top: 1px;
			}
		}

		&.vertical {
			width: 10px;
			height: 100%;
			right: 0;
			top: 0;

			.scrollbar {
				width: 8px;
				height: 20px;
				background: black;
				margin-left: 1px;
			}
		}

		position: absolute;
		background: none;
		opacity: 0.1;
		z-index: 9999;

		transition: all 0.4s;

		&:hover {
			background: gray;
			opacity: 0.6 !important;
		}

		&.active {
			background: gray;
			opacity: 0.6 !important;
		}
	}

	&:hover .scrollbar-container {
		opacity: 0.3;
	}
`;
