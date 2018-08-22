import styled from 'styled-components';
import { Bootstrap, HelpBox, Modal } from '../../components/main.js';

const { Button, Input, Label } = Bootstrap;

export const GroupSelector = styled.div`
	max-width: 100%;
	max-height: 800px;
	text-align: center;
	position: relative;
	padding-bottom: 6px;
	font-family: Arial, Helvetica, sans-serif;
`;

export const GroupSelectorSignInAlert = styled(HelpBox)`
	padding-bottom: 6px;
	text-align: left;
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
	background-color: white;
	cursor: pointer;

	&:hover {
		background-color: #ebf7ff;
	}
`;

export const SelectedSimpleGroup = styled.div`
	text-align: left;
	padding: 4px 6px 4px 6px;
	background-color: #ebf7ff;
	cursor: pointer;
`;

export const HoveredSimpleGroup = styled.div`
	text-align: left;
	padding: 4px 6px 4px 6px;
	background-color: #ebf7ff;
	cursor: pointer;
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
	font-size: 12px;
	color: #585250;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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

export const MobileSelectedGroup = styled.button`
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
	font-size: 12px;
	line-height: 18px;
	padding-top: 13px;
	float: left;
	margin-left: 6px;
	width: 71%;
	text-align: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const LoadingText = styled.div`
	font-size: 12px;
	font-style: italic;
	color: gray;
	line-height: 44px;
	margin-left: 16px;
	width: 100%;
	text-align: left;
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
	padding-top: 8px;
	padding-bottom: 8px;
`;

export const SearchResult = styled.div`
	height: 100px;
	width: 97%;
	background-color: white;
	margin: 1px 0 7px 0;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.12);
	border-radius: 3px;
`;

export const SearchResultAvatar = styled.div`
	width: 40px;
	height: 40px;
	float: left;
	margin: 6px;
`;

export const GroupSelectorModal = styled(Modal)`
	position: relative;
`;

export const ModalTitle = styled.p`
	font-size: 32px;
	margin-bottom: 4px;
	font-weight: 800;
	color: #575251;
	text-align: center;
`;

export const ModalSubtitle = styled.p`
	font-size: 16px;
	text-align: center;
	line-height: 1.2;
`;

export const ModalAlert = styled(HelpBox)`
	padding-bottom: 6px;
	text-align: left;
`;

export const SearchResultsContainer = styled.div`
	max-height: 63%;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	width: 100%;
`;

export const SearchInput = styled(Input)`
	position: relative;
	margin-bottom: 22px;

	:before {
		content: '';
		position: absolute;
		top: 8px;
		bottom: 8px;
		width: 24px;
		z-index: 10;
		left: 8px;
	}
`;

export const SearchInputGroup = styled.div`
	margin-bottom: 22px;
	padding: 0 2px 0 2px;
`;

export const CreateGroupWrapper = styled.div`
	transition: 0.2s ease-in-out;
	top: ${props => props.position};
	position: relative;
	background-color: white;
	width: 100%;
`;

export const CreateGroup = styled.div`
	background-color: white;
	padding: 16px;
	border-top: 1px solid #a8a8a8;
	z-index: 11;
`;

export const CreateGroupTitle = styled.p`
	composes: search__subtitle;
	padding-bottom: 16px;
	text-align: center;
	font-size: 13px;
	padding: 0;
	margin-bottom: 12px;
`;

export const CreateGroupButton = styled.div`
	float: right;
	padding: 8px 0 8px 0;
`;

export const CreateGroupLabel = styled(Label)`
	padding: 16px 0 6px 0;
	transition: 0.2s ease-in-out;
`;

export const GroupSelectorModalBody = styled.div`
	overflow: hidden;
	border-radius: 6px;
	width: 32vw;
	max-width: 475px;
`;

export const MainModalContent = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const SearchResultNameText = styled.div`
	font-weight: bold;
	color: #575251;
	padding-top: 8px;
	margin-right: 0px;
	margin-left: 56px;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 157px;
	white-space: nowrap;
`;

export const SearchResultButton = styled(Button)`
	float: right;
	margin-right: 4px;
`;

export const SearchResultMessage = styled.div`
	color: #a8a8a8;
	font-size: 12;
	width: 50%;
	margin-left: 56px;
`;

export const SearchResultHightlightText = styled.span`
	font-weight: 600;
	font-size: 12;
	color: #bd2929;
`;

export const SearchResultMembershipLine = styled.div`
	color: #a8a8a8;
	font-size: 12;
	width: 50%;
	margin: 4px 160px 0 56px;
`;

export const SearchResultButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-right: 8px;
	margin-top: -40px;
	padding-bottom: 4px;
`;

export const SearchResultBoldText = styled.span`
	font-weight: bold;
	font-size: 12;
	color: #575251;
`;

export const SearchResultGroupKind = styled.div`
	padding-top: 4px;
	font-size: 12;
	padding-bottom: 12px;
	color: #a8a8a8;
	font-style: italic;
	font-size: 12px;
	line-height: 1em;
	margin-left: 56px;
`;

export const SecondaryModalContent = styled.div`
	padding-top: 16px;
`;

export const SecondaryModalText = styled.p`
	padding-top: 4px;
	font-size: 14px;
`;

export const SecondaryModalButtonContainer = styled.div`
	float: right;
	padding: 6px 6px 2px 0;
`;
