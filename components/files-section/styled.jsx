import styled from 'styled-components';
import { fonts, colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';

export const FilesSection = styled.section`
	${resetStyles};
`;

export const Title = styled.div`
	font-weight: normal;
	line-height: 16px;
	font-size: ${props => props.fontSize || '16px'};
	margin-bottom: ${thickness.eight};
`;

export const CenteredIconContainer = styled.div`
	align-self: center;
	min-width: 24px;
`;

export const Divider = styled.div`
	border-bottom: solid 1px ${colors.gray14};
`;

export const FilesContainer = styled.div`
	padding-bottom: ${thickness.eight};
`;

export const FileItem = styled.div`
	display: flex;
	padding: ${thickness.eight};

	* {
		flex-shrink: 0;
	}
`;

export const FileInformation = styled.div`
	padding-left: ${thickness.twelve};
	flex-shrink: 1;
	overflow: hidden;
`;

export const FileLabel = createEllipsizedComponent(styled.div`
	${fonts.ui14};

	text-align: left;
	padding: 6px 0;
`);

export const Metadata = createEllipsizedComponent(styled.div`
	font-size: 13px;
	color: ${colors.gray34};
	padding-bottom: ${thickness.four};
`);

export const FileActionsContainer = styled.div`
	margin-left: auto;
	display: flex;
	align-items: flex-start;
`;

export const DropZoneText = styled.div`
	text-align: center;
`;

export const FileInputLabel = styled.label`
	input {
		display: none;
	}

	&& {
		margin-bottom: 0;
	}
`;

function createEllipsizedComponent(component) {
	return styled(component)`
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	`;
}
