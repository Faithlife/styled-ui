import styled from 'styled-components';

export const CreditCardRow = styled.div`
	font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
	display: flex;
	align-items: center;

	height: 45px;

	font-size: 16px;
	line-height: 1.25;
	letter-spacing: 0.16px;
	color: ${props => props.theme.shade80};
`;

export const CardLogoContainer = styled.div`
	width: 38px;
	height: 26px;
`;

export const CardInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: ${props => props.theme.thickness2};
`;

export const CardNumberContainer = styled.div`
	display: flex;
`;

export const CardNumber = styled.div`
	padding-left: 6px;
`;

export const Name = styled.div`
	padding-left: ${props => props.theme.thickness2};
`;

export const ExpiredCardWarning = styled.div`
	color: ${({ theme }) => theme.red};
	font-weight: ${({ theme }) => theme.semibold};
	font-size: 14px;
	letter-spacing: 0.16px;
	line-height: 1.43;
`;

export const Expiration = styled.div`
	font-size: 12px;
	color: ${props => props.theme.shade60};
`;
