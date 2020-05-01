import React, { useCallback, useState } from 'react';
import { Button, Radio, LoadingSpinner } from '@faithlife/styled-ui';
import { useLocalization } from '../../Localization';
import IBillingProfileDto from '../../clients/typings/orders/IBillingProfileDto';
import { Amex, Discover, Mastercard, Visa, PayPal, ArrowCycle, Trash } from '../../sprites/svg';
import * as Styled from './styled';

interface IBillingProfileProps {
	billingProfile: IBillingProfileDto;
	onDelete: Function;
	onUpdate: Function;
	isSelected: boolean;
	onSelected: Function;
	index: number;
	isEditing: boolean;
	isCalledPreorder: boolean;
}

const BillingProfile: React.FunctionComponent<IBillingProfileProps> = ({
	billingProfile,
	onDelete,
	onUpdate,
	isSelected,
	onSelected,
	index,
	isEditing,
	isCalledPreorder,
}) => {
	const now = new Date();
	const strings = useLocalization();

	const [isEditDisabled, setIsEditDisabled] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [trashDisabled, setTrashDisabled] = useState(
		billingProfile.usageInfo &&
			(billingProfile.usageInfo.activeSubscriptionCount > 0 ||
				billingProfile.usageInfo.outstandingPaymentPlansCount > 0 ||
				billingProfile.usageInfo.pendingPrepubCount > 0)
	);

	// Date.getMonth() is zero-indexed
	const isExpired =
		billingProfile.cardInfo &&
		(billingProfile.cardInfo.expirationYear < now.getFullYear() ||
			(billingProfile.cardInfo.expirationYear === now.getFullYear() &&
				billingProfile.cardInfo.expirationMonth <= now.getMonth() + 1));

	const isHalfProfile = billingProfile.type === 'PayFacCreditCard';

	const supportedProfileTypes = ['PayFacCreditCard', 'CreditCard', 'Paypal'];

	const deleteBillingProfile = useCallback(() => {
		setTrashDisabled(true);
		setIsEditDisabled(true);
		setIsDeleting(true);
		onDelete(billingProfile.profileId);
		setIsEditDisabled(false);
	}, [billingProfile.profileId, onDelete]);

	if (!supportedProfileTypes.includes(billingProfile.type)) {
		return null;
	}

	if (billingProfile.type.toLowerCase() === 'paypal') {
		return (
			<Styled.CreditCardRow data-testid="credit-card-row" data-test-index={index}>
				<Radio onClick={onSelected} isChecked={isSelected} disabled type="button" />
				<Styled.CardLogoContainer>
					<PayPal />
				</Styled.CardLogoContainer>
				<Styled.Name>{billingProfile.nameOnCard}</Styled.Name>
				<Styled.PayPalDelete data-testid="delete-button-container">
					<Button
						minorTransparent
						condensed
						size="small"
						icon={isDeleting ? <LoadingSpinner height={18} /> : <Trash />}
						onClick={deleteBillingProfile}
						disabled={trashDisabled}
					/>
				</Styled.PayPalDelete>
			</Styled.CreditCardRow>
		);
	}

	return (
		<Styled.CreditCardRow data-testid="credit-card-row" data-test-index={index}>
			{isExpired || isHalfProfile ? (
				<div data-testid="update-billing-profile-button">
					<Button
						primaryTransparent
						condensed
						size="small"
						icon={<ArrowCycle className={''} />}
						onClick={() => onUpdate(billingProfile)}
						styleOverrides={{ padding: '0 2px 0 0' }}
						border={'0'}
					/>
				</div>
			) : (
				<Radio onClick={onSelected} isChecked={isSelected} type="button" />
			)}
			<Styled.CardLogoContainer>
				{cardToSVG[billingProfile.cardInfo.creditCardProvider.toLowerCase()]}
			</Styled.CardLogoContainer>
			<Styled.Dots>{'••••'}</Styled.Dots>
			<Styled.CardNumber>{billingProfile.cardInfo.creditCardNumber}</Styled.CardNumber>
			<Styled.ExpiredCardWarning data-testid="expired-label">
				{isExpired ? 'Expired' : null}
			</Styled.ExpiredCardWarning>
			{!isEditing && (
				<Styled.Edit data-testid="edit-button-container">
					<Button
						primaryTransparent
						condensed
						size="small"
						onClick={() => onUpdate(billingProfile)}
						disabled={isEditDisabled}
					>
						<Styled.EditText>{strings.edit}</Styled.EditText>
					</Button>
				</Styled.Edit>
			)}
		</Styled.CreditCardRow>
	);
};

export const cardToSVG = {
	mastercard: <Mastercard className={''} />,
	visa: <Visa className={''} />,
	amex: <Amex className={''} />,
	discover: <Discover className={''} />,
};

export default BillingProfile;
