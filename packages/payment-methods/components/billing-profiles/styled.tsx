import styled from 'styled-components';
import { Box, Input as UnstyledInput, Checkbox as UnstyledCheckbox } from '@faithlife/styled-ui';
import { Button } from '@faithlife/styled-ui/v6';
import CleaveUnstyled from 'cleave.js/react';

export const BillingProfilesContainer = styled.div`
	font-family: 'Source Sans Pro';
`;
export const BillingProfilesSection = styled.div`
	padding-top: 14px;
`;

export const BillingProfiles = styled(Box)`
	overflow-y: auto;
	overflow-x: hidden;
	border: 1px solid ${({ theme }) => theme.shade10};
	border-radius: 3px;
`;

export const CreditCardRow = styled.div`
	display: flex;
	align-items: center;

	border-bottom: 1px solid ${({ theme }) => theme.shade10};

	height: 45px;

	font-size: 16px;
	line-height: 1.25;
	letter-spacing: 0.16px;
	color: ${props => props.theme.shade80};

	padding: 0 16px;
`;

export const CardLogoContainer = styled.div`
	width: 38px;
	height: 26px;
	margin-left: 16px;
`;

export const EditText = styled.div`
	padding-left: 8px;
`;

export const NewCardLabel = styled.div`
	padding-left: ${props => props.theme.thickness2};
	font-size: 16px;
`;

export const Dots = styled.div`
	padding-left: 8px;
`;

export const CardNumber = styled.div`
	padding-left: 6px;
`;

export const ExpiredCardWarning = styled.div`
	color: ${({ theme }) => theme.red};
	font-weight: ${({ theme }) => theme.semibold};
	font-size: 14px;
	letter-spacing: 0.16px;
	line-height: 1.43;
	margin-left: auto;
`;

export const Delete = styled.div`
	padding-left: ${props => (props.isDeleting ? '11px' : '16px')};
`;

export const PayPalDelete = styled(Delete)`
	margin-left: auto;
`;

export const Name = styled.div`
	padding-left: ${props => props.theme.thickness2};
`;

export const EditBillingProfileSection = styled.div`
	display: flex;
	flex-direction: column;
	font-family: 'Source Sans Pro';
	padding: ${({ theme }) => theme.thickness4};
	background-color: #f5f5f5;
`;

export const Title = styled.div`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.semibold};
	line-height: 1.33;
	color: ${({ theme }) => theme.shade70};
	padding: ${props => props.theme.thickness3} ${props => props.theme.thickness5}
		${props => props.theme.thickness1} 0;
	text-align: center;
	text-transform: uppercase;
`;

export const CreditCardInfoRow = styled.div`
	display: flex;
	padding-bottom: 12px;
`;

export const CityStateInfoRow = styled(CreditCardInfoRow)`
	flex-wrap: wrap;
`;

export const Label = styled.label`
	&&& {
		font-size: 16px;
		font-weight: normal;
		color: ${({ theme }) => theme.shade70};
		width: 100%;
	}
`;

export const LabelText = styled.p`
	&&& {
		padding-bottom: 6px;
		margin: 0;
	}
`;

export const Input = styled(UnstyledInput)`
	&&& {
		display: block;
		font-size: 16px;
		line-height: 1.2;
		letter-spacing: 0.2px;
		color: ${({ theme }) => theme.shade90};
		border: 1px solid ${({ theme }) => theme.shade50};
		border-radius: 3px;
		box-sizing: border-box;
		height: 32px;
		width: 100%;
		margin: 0;
		padding: 0 ${({ theme }) => theme.thickness2};
		font-family: 'Source Sans Pro';

		&::placeholder {
			color: @shade50;
		}

		${({ isValid }) =>
			isValid
				? ''
				: `
	border-color: #db4818 !important;
	box-shadow: 0 0 0 2px #f6d0d3 !important;

	&:focus {
		outline: 1px auto @red;
	}`}
	}
`;

// TODO don't copy paste this from above
export const Cleave = styled(CleaveUnstyled)`
	&&& {
		display: block;
		font-size: 16px;
		line-height: 1.2;
		letter-spacing: 0.2px;
		color: ${({ theme }) => theme.shade90};
		border: 1px solid ${({ theme }) => theme.shade50};
		border-radius: 3px;
		box-sizing: border-box;
		height: 32px;
		width: 100%;
		margin: 0;
		padding: 0 ${({ theme }) => theme.thickness2};
		font-family: 'Source Sans Pro';

		&::placeholder {
			color: @shade50;
		}

		${({ isValid }) =>
			isValid
				? ''
				: `
	border-color: #db4818 !important;
	box-shadow: 0 0 0 2px #f6d0d3 !important;

	&:focus {
		outline: 1px auto @red;
	}`}
	}
`;

export const ExpirationContainer = styled.div`
	width: 81px;
`;

export const SecurityCodeContainer = styled.div`
	width: 105px;
	padding-left: 8px;
`;

export const BillingAddressInfoSection = styled.div`
	padding-top: 8px;
`;

export const CityContainer = styled.div`
	flex: 2 1 100px;
`;

export const StateContainer = styled.div`
	flex: 1 1 50px;
	margin-left: ${({ theme }) => theme.thickness1};
`;

export const PostalCodeContainer = styled.div`
	flex: 1 1 80px;
	margin-left: ${({ theme }) => theme.thickness1};
`;

export const Checkbox = styled(UnstyledCheckbox)`
	margin: ${({ theme }) => theme.thickness2} 0;
`;

export const Edit = styled.div`
	margin-left: auto;
`;

export const NewProfileButtons = styled.div`
	padding-top: 12px;
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
`;

export const DeleteButton = styled.div`
	order: 3;
`;

export const CancelButton = styled(Button)`
	order: 2;
	margin-left: auto;
	margin-right: 16px;
`;

export const CreateButton = styled.div`
	order: 1;
`;
