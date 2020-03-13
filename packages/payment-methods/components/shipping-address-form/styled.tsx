import styled from 'styled-components';
import { Input as UnstyledInput, Checkbox as UnstyledCheckbox } from '@faithlife/styled-ui';

export const ShippingAddressContainer = styled.div`
	font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
	max-width: 327px;
	overflow-y: auto;
	overflow-x: hidden;
	border: 1px solid ${({ theme }) => theme.shade10};
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
`;

export const Form = styled.div`
	padding: ${props => props.theme.thickness4};
`;

export const Row = styled.div`
	display: flex;
	padding-bottom: 12px;
`;

export const Label = styled.label`
	&&& {
		font-size: 16px;
		font-weight: normal;
		color: ${({ theme }) => theme.shade70};
		width: 100%;
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

export const Checkbox = styled(UnstyledCheckbox)`
	margin: ${({ theme }) => theme.thickness2} 0;
`;

export const LabelText = styled.p`
	&&& {
		padding-bottom: 6px;
		margin: 0;
	}
`;

export const ButtonContainer = styled.div`
	padding-top: 12px;
	display: flex;
	justify-content: flex-end;
`;
