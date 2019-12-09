import React, { useCallback, useState } from 'react';
import { Button, Radio } from '@faithlife/styled-ui';
import IBillingProfileDto from '../../clients/typings/orders/IBillingProfileDto';
import {
	Amex,
	Discover,
	Mastercard,
	Visa,
	PayPal,
	ArrowCycle,
	Trash,
	Chevron,
} from '../../sprites/svg';
import * as Styled from './styled';

interface IBillingProfileProps {
	billingProfile: IBillingProfileDto;
	onDelete: Function;
	onUpdate: Function;
	isSelected: boolean;
	onSelected: Function;
	index: number;
	isEditing: boolean;
}

const BillingProfile: React.FunctionComponent<IBillingProfileProps> = ({
	billingProfile,
	onDelete,
	onUpdate,
	isSelected,
	onSelected,
	index,
	isEditing,
}) => {
	const now = new Date();

	// TODO: this will disable trash can/delete button if there are usages on the card. We need a screen to warn the user and help them move usage to another card.
	const [isEditDisabled, setIsEditDisabled] = useState(false);
	const [trashDisabled, setTrashDisabled] = useState(
		billingProfile.usageInfo.activeSubscriptionCount > 0 ||
			billingProfile.usageInfo.outstandingPaymentPlansCount > 0 ||
			billingProfile.usageInfo.pendingPrepubCount > 0
	);

	// Date.getMonth() is zero-indexed
	const isExpired =
		billingProfile.cardInfo &&
		(billingProfile.cardInfo.expirationYear < now.getFullYear() ||
			(billingProfile.cardInfo.expirationYear === now.getFullYear() &&
				billingProfile.cardInfo.expirationMonth <= now.getMonth() + 1));

	const deleteBillingProfile = useCallback(() => {
		setTrashDisabled(true);
		setIsEditDisabled(true);
		onDelete(billingProfile.profileId);
		setIsEditDisabled(false);
	}, [billingProfile.profileId, onDelete]);

	if (billingProfile.type.toLowerCase() === 'paypal') {
		return (
			<Styled.CreditCardRow data-test-id="credit-card-row" data-test-index={index}>
				<Radio onClick={onSelected} isChecked={isSelected} disabled type="button" />
				<Styled.CardLogoContainer>
					<PayPal />
				</Styled.CardLogoContainer>
				<Styled.Name>{billingProfile.nameOnCard}</Styled.Name>
				<Styled.PayPalDelete data-test-id="delete-button-container">
					<Button
						minorTransparent
						condensed
						size="small"
						icon={<Trash />}
						onClick={deleteBillingProfile}
						disabled={trashDisabled}
					/>
				</Styled.PayPalDelete>
			</Styled.CreditCardRow>
		);
	}

	return (
		<Styled.CreditCardRow data-test-id="credit-card-row" data-test-index={index}>
			{isExpired ? (
				<div data-test-id="update-billing-profile-button">
					<Button
						primaryTransparent
						condensed
						size="small"
						icon={<ArrowCycle className={''} />}
						onClick={onUpdate}
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
			<Styled.ExpiredCardWarning data-test-id="expired-label">
				{isExpired ? 'Expired' : null}
			</Styled.ExpiredCardWarning>
			<Styled.Edit data-test-id="edit-button-container">
				<Button
					primaryTransparent
					condensed
					size="small"
					onClick={onUpdate}
					disabled={isEditDisabled}
				>
					<Styled.ChevronContainer isEditing={isEditing}>
						<Chevron />
					</Styled.ChevronContainer>
					<Styled.EditText>{'Edit'}</Styled.EditText>
				</Button>
			</Styled.Edit>
			<Styled.Delete data-test-id="delete-button-container">
				<Button
					minorTransparent
					condensed
					size="small"
					icon={<Trash />}
					onClick={deleteBillingProfile}
					disabled={trashDisabled}
				/>
			</Styled.Delete>
		</Styled.CreditCardRow>
	);
};

const cardToSVG = {
	mastercard: <Mastercard className={''} />,
	visa: <Visa className={''} />,
	amex: <Amex className={''} />,
	discover: <Discover className={''} />,
};

export default BillingProfile;
