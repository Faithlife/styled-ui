import styled from 'styled-components';
import { Bootstrap, HelpBox } from '../main.js';
import { SimpleModal } from '../simple-modal/component.jsx';
import { resetStyles } from '../utils/index.js';

const { Label } = Bootstrap;

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

export const SimpleGroup = styled.div`
	text-align: left;
	padding: 4px 6px 4px 6px;
	background-color: ${props => props.color};
	cursor: pointer;

	&:hover {
		background-color: #ebf7ff;
	}
`;

export const SelectedGroupAvatar = styled.div`
	width: 32px;
	height: 32px;
	float: left;
	margin: 5px 0 6px 1px;
	border-radius: 3px;
`;

export const SimpleGroupAvatar = styled.div`
	width: 32px;
	height: 32px;
	display: inline-block;
	vertical-align: middle;
	margin-right: 6px;
	border-radius: 3px;
`;

export const SimpleGroupInfo = styled.div`
	display: inline-block;
	vertical-align: middle;
	max-width: 200px;
	width: 76%;
`;

export const SimpleGroupName = styled.div`
	font-size: 13px;
	color: #585250;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-family: 'Source Sans Pro';
`;

export const SimpleGroupMembershipLine = styled.div`
	font-size: 10px;
	color: #95908f;
`;

export const SelectedGroupContainer = styled.div`
	position: relative;
	height: 44px;
	cursor: pointer;
	border-radius: 6px;
`;

export const DownArrow = styled.svg`
	position: absolute;
	float: right;
	top: 15px;
	right: 8px;
`;

export const SelectedGroup = styled.button`
	width: 100%;
	height: 100%;
	padding-left: 5px;
	padding-bottom: 0px;
	background-color: white;
	border-radius: 3px;
	border: 0;
	cursor: pointer;
	color: black;
`;

export const SelectedGroupText = styled.div`
	font-size: 13px;
	line-height: 18px;
	padding-top: 13px;
	float: left;
	margin-left: 6px;
	width: 64%;
	text-align: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-family: 'Source Sans Pro';
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
	margin-bottom: 8px;
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

export const GroupSelectorModal = styled(SimpleModal)`
	${resetStyles};
	position: relative;
`;

export const ModalTopGradient = styled.div`
	margin-left: 24px;
	margin-right: 24px;
	height: 100%;
	background: white;
	z-index: 2;
	box-shadow: 0px 10px 8px -4px white;
`;

export const ModalTopGradientWrapper = styled.div`
	position: absolute;
	top: 0px;
	width: 100%;
	height: 30px;
	z-index: 2;
`;

export const ModalTitle = styled.p`
	font-size: 32px;
	margin: 5px 0 0 0;
	font-weight: 800;
	color: #575251;
	text-align: center;
`;

export const ModalSubtitle = styled.p`
	margin: 4px 0 24px 0;
	font-size: 16px;
	text-align: center;
	line-height: 1.2;
`;

export const ModalAlert = styled(HelpBox)`
	padding-bottom: 6px;
	text-align: left;
`;

export const MainModalContent = styled.div`
	padding-top: 30px;
	height: 60vh;
`;

export const CreateGroupWrapper = styled.div`
	position: ${props => (props.fixed ? 'absolute' : 'relative')};
	width: 100%;
	box-sizing: border-box;
	z-index: 1;

	${props =>
		props.fixed &&
		`
		top: 20px;
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
	width: 100%;
	padding-left: 12px;
	padding-right: 12px;
	box-sizing: border-box;
	z-index: ${props => (props.fixed ? 0 : 2)};
	height: 100%;
`;

export const CreateGroup = styled.div`
	background-color: white;
`;

export const CreateGroupButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 93%;
	padding-left: 12px;
	margin: 16px 0 16px 0;
`;

export const CreateGroupButtonText = styled.p`
	font-size: 16px;
	color: #575251;
`;

export const CreateGroupLabel = styled(Label)`
	display: block;
	margin: 16px 0 0 0;
	transition: 0.2s ease-in-out;
	font-size: 14px;
	color: #575251;
`;

export const CreateGroupRequiredStar = styled.p`
	display: inline;
	color: #d94848;
`;

export const GroupSelectorModalBody = styled.div`
	border-radius: 6px;
	min-width: 375px;
	overflow-y: scroll;
`;

export const SearchResult = styled.div`
	height: 76px;
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
	width: 100%;
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
	align-items: center;
`;

export const SearchResultMessage = styled.div`
	color: #a8a8a8;
	font-size: 12px;
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
	padding-top: 4px;
	color: #a8a8a8;
	font-size: 12px;
	line-height: 1em;
`;

export const SecondaryModalContent = styled.div`
	padding-left: 12px;
	padding-right: 12px;
	padding-top: 36px;
	padding-bottom: 12px;
`;

export const SecondaryModalText = styled.p`
	font-size: 14px;
	margin: 0px;
`;

export const SecondaryModalButtonWrapper = styled.div`
	margin-left: 6px;
`;

export const SecondaryModalButtonContainer = styled.div`
	margin-top: 24px;
	display: flex;
	flex-direction: row-reverse;
	width: 100%;
	justify-content: flex-start;
`;
