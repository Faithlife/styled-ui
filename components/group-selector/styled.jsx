import styled from 'styled-components';
import { resetStyles } from '../utils';
import { ScrollArea } from './styled-scrollarea';

export const GroupSelector = styled.div`
	${resetStyles};
	max-width: 100%;
	max-height: 800px;
	text-align: center;
	position: relative;
	padding-bottom: 6px;
	font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
`;

export const GroupSelectorInputContainer = styled.input`
	font-size: 12px;
	line-height: 44px;
	margin-left: 16px;
	width: 100%;
	text-align: left;
	border: 0px;
	border-radius: 6px;
`;

export const GroupInputButton = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

export const DownArrow = styled.svg`
	position: absolute;
	right: 8px;
`;

export const SelectedGroup = styled.button`
	width: 100%;
	height: 44px;
	position: relative;
	cursor: pointer;
	border-radius: 6px;
	padding: 0px;
	background-color: white;
	border-radius: 3px;
	border: 0;
	cursor: pointer;
	color: black;
	display: flex;
	align-items: center;
`;

export const AvatarWrapper = styled.div`
	border-radius: 3px;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	overflow: hidden;
`;

export const AvatarImage = styled.img`
	display: block;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
`;

export const SimpleGroup = styled.div`
	text-align: left;
	padding: 6px;
	background-color: ${props => props.color};
	cursor: pointer;
	display: flex;
	align-items: center;
	${props =>
		!props.disableHover &&
		`&:hover {
		background-color: #ebf7ff;
	}`};
`;

export const SimpleGroupAvatar = styled.div`
	width: 32px;
	height: 32px;
	margin-right: 6px;
	border-radius: 3px;
`;

export const SimpleGroupName = styled.div`
	font-size: 13px;
	color: #585250;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-family: 'Source Sans Pro';
`;

export const SelectedSimpleGroupWrapper = styled.div`
	padding-right: 20px;
	width: 100%;
`;

export const DropdownGroupsContainer = styled.div`
	max-height: 205px;
	overflow: auto;
	padding-top: 6px;
	padding-bottom: 6px;
	background-color: white;
	border-radius: 3px;
`;

export const DropdownContainer = styled.div`
	position: relative;
	height: 44px;
`;

export const DropdownWrapper = styled.div`
	border-radius: 6px;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 4px 4px rgba(0, 0, 0, 0.12);
`;

export const DropdownButtonContainer = styled.div`
	width: 100%;
	background-color: white;
	padding-top: 16px;
	padding-bottom: 16px;
	display: flex;
	justify-content: center;
`;

export const LargeGroupSelector = styled.div`
	${resetStyles};
`;

export const LargeScrollViewContentClass = 'modal-scroll-view-content';
export const LargeScrollView = styled(ScrollArea)`
	position: relative;
	height: ${props => (props.showInPlace ? 'auto' : '60vh')};
	width: 375px;
	background: white;
	border-radius: 4px;

	.${LargeScrollViewContentClass} {
		padding-top: ${props => (props.hideTitle ? '0' : '30px')};
		padding-bottom: 4px;
		position: unset;
	}
`;

export const LargeTopGradient = styled.div`
	box-sizing: border-box;
	padding-left: 24px;
	padding-right: 24px;
	padding-top: 24px;
	height: 100%;
	background: white;
	position: absolute;
	top: 0px;
	width: 100%;
	height: 30px;
	z-index: 2;
	box-shadow: 0px 5px 10px -4px white;
`;

export const LargeTopGradientWrapper = styled.div`
	position: absolute;
	top: 0px;
	width: 100%;
	height: 40px;
	z-index: 2;
`;

export const LargeTitle = styled.div`
	font-size: 28px;
	margin: 5px 0 0 0;
	font-weight: 800;
	color: #575251;
	text-align: center;
`;

export const LargeSubtitle = styled.div`
	margin-top: 4px;
	font-size: 16px;
	text-align: center;
	line-height: 1.2;
`;

export const CreateGroupWrapper = styled.div`
	position: ${props => (props.fixed ? 'absolute' : 'relative')};
	width: 100%;
	z-index: 1;

	${props =>
		props.fixed &&
		`
		top: 14px;
		`};
`;

export const CreateGroupBackground = styled.div`
	background-color: white;
	padding-left: 24px;
	padding-right: 24px;
	margin-right: ${props => props.scrollWidthDelta}px;
	box-shadow: 0px 10px 8px -4px white;
`;

export const SearchResultsContainer = styled.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	padding-left: 12px;
	padding-right: 12px;
	z-index: ${props => (props.fixed ? 0 : 2)};
	height: 100%;
`;

export const CreateGroup = styled.div`
	background-color: white;
`;

export const InputWrapper = styled.div`
	& > * {
		width: 100%;
	}
`;

export const CreateGroupButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin: 16px 0 16px 0;
`;

export const CreateGroupButtonText = styled.div`
	font-size: 16px;
	margin: 16px 0 16px 0;
	color: #575251;
`;

export const CreateGroupLabel = styled.div`
	display: block;
	margin: 16px 0 4px 0;
	transition: 0.2s ease-in-out;
	font-size: 14px;
	color: #575251;
`;

export const CreateGroupRequiredStar = styled.div`
	display: inline;
	color: #d94848;
`;

export const SearchResult = styled.div`
	height: auto;
	min-height: 100px;
	background-color: white;
	margin-bottom: 7px;
	padding: 12px;
	box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.12), 0 0 18px 0 rgba(0, 0, 0, 0.12);
	border-radius: 3px;
	display: flex;
`;

export const SearchResultAvatar = styled.div`
	width: 40px;
	height: 40px;
	margin-right: 12px;
`;

export const SearchResultContent = styled.div`
	display: flex;
	flex-grow: 1;
	min-width: 100px;
	flex-direction: column;
	justify-content: space-between;
`;

export const SearchResultNameText = styled.div`
	font-weight: bold;
	color: #575251;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const SearchResultInfoButtonRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

export const SearchResultMessage = styled.div`
	color: #a8a8a8;
	font-size: 12px;
	padding-top: 4px;
	padding-right: 4px;
`;

export const UnderlinedSearchResultMessage = styled(SearchResultMessage)`
	border-bottom: 1px dashed #a8a8a8;
`;

export const SearchResultHightlightText = styled.span`
	font-weight: 600;
	font-size: 12px;
	color: #bd2929;
`;

export const SearchResultMembershipLine = styled.div`
	color: #a8a8a8;
	font-size: 12px;
`;

export const SearchResultBoldText = styled.span`
	font-weight: bold;
	font-size: 12px;
	color: #575251;
`;

export const SearchResultGroupKind = styled.div`
	padding: 4px 0;
	color: #a8a8a8;
	font-size: 12px;
	line-height: 1em;
`;

export const TooltipContentBlock = styled.p`
	text-align: left;
	margin: 0 16px 16px 16px;
	font-size: 14px;

	&:first-of-type {
		margin-top: 16px;
	}
`;
