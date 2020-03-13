import React from 'react';
import { IBillingProfileDto } from '../../clients/typings/orders';
import { useLocalization } from '../../Localization';
import { cardToSVG } from '../billing-profiles/billing-profile';
import { PayPal } from '../../sprites/svg';
import * as Styled from './styled';

interface IBillingSummaryProps {
	billingProfile: IBillingProfileDto;
}
const BillingSummary: React.FunctionComponent<IBillingSummaryProps> = ({ billingProfile }) => {
	const now = new Date();
	const strings = useLocalization();

	const isExpired =
		billingProfile.cardInfo &&
		(billingProfile.cardInfo.expirationYear < now.getFullYear() ||
			(billingProfile.cardInfo.expirationYear === now.getFullYear() &&
				billingProfile.cardInfo.expirationMonth <= now.getMonth() + 1));

	if (billingProfile.type.toLowerCase() === 'paypal') {
		return (
			<Styled.CreditCardRow data-testid="billing-summary">
				<Styled.CardLogoContainer>
					<PayPal />
				</Styled.CardLogoContainer>
				<Styled.Name>{billingProfile.nameOnCard}</Styled.Name>
			</Styled.CreditCardRow>
		);
	}

	return (
		<Styled.CreditCardRow data-testid="billing-summary">
			<Styled.CardLogoContainer>
				{cardToSVG[billingProfile.cardInfo.creditCardProvider.toLowerCase()]}
			</Styled.CardLogoContainer>
			<Styled.CardInfoContainer>
				<Styled.CardNumberContainer>
					<div>{'••••'}</div>
					<Styled.CardNumber>{billingProfile.cardInfo.creditCardNumber}</Styled.CardNumber>
				</Styled.CardNumberContainer>
				{isExpired ? (
					<Styled.ExpiredCardWarning data-testid="expired-label">
						{strings.expired}
					</Styled.ExpiredCardWarning>
				) : (
					<Styled.Expiration>
						{strings.expires} {billingProfile.cardInfo.expirationMonth.toString()}
						{'/'}
						{billingProfile.cardInfo.expirationYear.toString().slice(-2)}
					</Styled.Expiration>
				)}
			</Styled.CardInfoContainer>
		</Styled.CreditCardRow>
	);
};

export default BillingSummary;
