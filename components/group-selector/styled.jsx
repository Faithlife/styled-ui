import styled from 'styled-components';
import { Bootstrap } from '../../components/main.js';

const { Button, Input, InputGroup, InputGroupAddon, Label } = Bootstrap;

export const GroupSelector = styled.div`
	max-width: 100%;
	max-height: 800px;
	text-align: center;
	position: relative;
	padding-bottom: 6px;
`;

export const GroupSelectorButton = styled.div`
	background-color: #1e91d6;
	color: white;
	display: inline-block;
	vertical-align: middle;
	margin-left: 32px;
	margin-bottom: 8px;
	min-width: 120px;
	border-radius: 3px;

	&:hover {
		background-color: #0174b9;
		border-color: #0174b9;
	}
`;

export const GroupSelectorSignInButton = styled.div`
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

export const Select = styled.div`
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

export const SelectedGroupText = styled.div`
	font-size: 12px;
	line-height: 44px;
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
	max-height: 210px;
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

export const Search = styled.div`
	width: 400px;
	height: 85vh;
	max-width: 100%;
	max-height: 100%;
	padding: 32px 16px 16px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
	background-image: linear-gradient(to bottom, #ffffff, #f5f5f5);
	border-radius: 3px;
`;

export const SearchGlass = styled.div`
	height: 12px;
	width: 12px;
	background-image: url(/images/search-icon.gif);
	margin-top: 3px;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	display: inline-block;
	vertical-align: middle;
`;

export const SearchGlassHasText = styled.div`
	cursor: pointer;
	height: 12px;
	width: 12px;
	margin-top: 4px;
	margin-right: 2px;
	background-image: url(/images/x-icon.png);
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	display: inline-block;
	vertical-align: middle;
`;

export const SearchResult = styled.div`
	height: 90px;
	background-color: white;
	margin-bottom: 8px;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.12);
	border-radius: 3px;
`;

export const SearchResultAvatar = styled.div`
	width: 40px;
	height: 40px;
	float: left;
	margin: 6px;
`;

export const SearchNoResults = styled.p`
	font-style: italic;
	text-align: center;
`;

export const CloseButton = styled(Button)`
	position: absolute;
	right: 0;
	top: 0;
	padding: 8px;
	margin: 16px;
	min-width: 0;
`;

export const ModalTitle = styled.p`
	font-size: 32px;
	line-height: 1.2em;
	padding: 24px 0 16px;
	font-weight: 800;
	color: #575251;
	text-align: center;
`;

export const ModalSubtitle = styled.p`
	font-size: 16px;
	text-align: center;
	padding-bottom: 22px;
	line-height: 1.2;
`;

export const ModalCloseButtonContainer = styled.div`
	float: right;
`;

export const SearchResultsContainer = styled.div`
	height: 60%;
	max-height: 1000px;
	overflow-y: auto;
	padding-bottom: 85px;
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

export const SearchInputAddon = styled(InputGroupAddon)`
	float: left;
	z-index: 1000;
`;

export const SearchInputGroup = styled(InputGroup)`
	margin-bottom: 22px;
`;

export const CreateGroupWrapper = styled.div`
	transition: 0.2s ease-in-out;
	bottom: ${props => props.property};
	position: absolute;
	left: 0;
	right: 0;
	background-color: white;
`;

export const CreateGroup = styled.div`
	background-color: white;
	padding: 16px;
	border-top: 1px solid #a8a8a8;
	z-index: 11;
`;

export const CreateGroupActive = styled.div`
	transition: 0.2s ease-in-out;
`;

export const CreateGroupTitle = styled.p`
	composes: search__subtitle;
	padding-bottom: 16px;
	text-align: center;
	font-size: 16;
	padding: 0;
	margin-bottom: 12;
`;

export const CreateGroupButton = styled.div`
	float: right;
	padding: 8px 0 8px 0;
`;

export const CreateGroupLabel = styled(Label)`
	padding: 16px 0 6px 0;
`;

export const GroupSelectorModalContainer = styled.div`
	width: 30%;
	padding: 45px 0 24px 0;
	position: absolute;
	bottom: 60px;
	display: block;
`;

export const GroupSelectorModalText = styled.p`
	padding: 0 32px;
	text-align: left;
	color: #3d3d3d;
	font-size: 16px;
	line-height: normal;
	margin-top: 8px;
`;

export const GroupSelectorModalButtonContainer = styled.div`
	margin-top: 24px;
	text-align: center;
`;

export const SearchResultNameText = styled.div`
	font-weight: bold;
	color: #575251;
	padding-top: 8px;
	margin-right: 0px;
	margin-left: 56px;
`;

export const SearchResultText = styled.div`
	padding-top: 2px;
	padding-bottom: 12px;
	color: #a8a8a8;
	width: 50%;
	margin-right: 0px;
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
	margin-top: 4px;
	margin-left: 56px;
`;

export const SearchResultButtonContainer = styled.div`
	float: right;
	margin-right: 8px;
	margin-top: -33px;
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
