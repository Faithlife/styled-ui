import React, { useCallback, useState, useRef } from 'react';

import { Button } from '@faithlife/styled-ui';
import { useLocalization } from '../../Localization';
import IError from '../../clients/typings/orders/IError';
import ICountryDto from '../../clients/typings/locations/ICountryDto';
import IStateDto from '../../clients/typings/locations/IStateDto';
import nameof from '../../utilities/nameof';
import {
	isExpirationValid,
	normalizeExpiration,
	areExpirationDatesValid,
	formatMaskedCardNumber,
	mapOrdersPropertyToEditProperty,
	validateBillingProfile,
} from '../../utilities/credit-card-utils';
import IEditBillingProfile from '../../typings/IEditBillingProfile';
import IEditCardInfo from '../../typings/IEditCardInfo';
import * as Styled from './styled';
import IUsageInfoDto from '../../clients/typings/orders/UsageInfoDto';
import IAddressFormatItem from '../../clients/typings/locations/IAddressFormatItem';
import AddressForm from './address-form';

interface IEditBillingProfileProps {
	billingProfile?: IEditBillingProfile;
	onCommitBillingProfile: Function;
	onCancelEditingBillingProfile?: Function;
	serverValidationErrors: IError[];
	countries: ICountryDto[];
	statesByCountryId: Record<string, IStateDto[]>;
	onSelectedCountryChanged: Function;
	usageInfo?: IUsageInfoDto;
	addressFormatItems: IAddressFormatItem[];
	isCalledPreorder: boolean;
	handleSaveForLaterChange?: Function;
	saveForLater?: boolean;
	createButtonText?: string;
}

const usaCountryId = '840';
const defaultCountryOption = { label: 'United States', value: usaCountryId };

const EditBillingProfile: React.FunctionComponent<IEditBillingProfileProps> = ({
	billingProfile,
	onCommitBillingProfile,
	onCancelEditingBillingProfile,
	serverValidationErrors,
	countries,
	statesByCountryId,
	onSelectedCountryChanged,
	usageInfo,
	addressFormatItems,
	isCalledPreorder,
	handleSaveForLaterChange,
	saveForLater = true,
	createButtonText,
}) => {
	const commitButtonRef = useRef<Button>(null);
	const [uncommittedBillingProfile, setUncommittedBillingProfile] = useState<IEditBillingProfile>(
		billingProfile
			? { ...billingProfile }
			: {
					addressLine1: null,
					addressLine2: null,
					cardInfo: {
						cardNumber: null,
						expiration: null,
						nameOnCard: null,
						postalCode: null,
						securityCode: null,
						provider: null,
					},
					city: null,
					stateId: null,
					countryId: defaultCountryOption.value,
			  }
	);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const [clientValidationErrors, setClientValidationErrors] = useState<IError[]>([]);

	const isEditingExistingProfile = !!billingProfile;

	const [isCardExpired, setIsCardExpired] = useState<boolean>(
		isEditingExistingProfile &&
			!isExpirationValid((billingProfile && billingProfile.cardInfo.expiration) || '')
	);

	const updateBillingProfile = useCallback(event => {
		setIsProcessing(false);
		const name = event.target.name;
		const value = event.target.value;
		setUncommittedBillingProfile(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const updateCardInfo = useCallback((event: any) => {
		// need to make local copies in case the event gets nullified before the useState function is called
		setIsProcessing(false);
		const value = event.target.value;
		const name = event.target.name;
		setUncommittedBillingProfile(prevState => ({
			...prevState,
			cardInfo: {
				...prevState.cardInfo,
				[name]: value,
			},
		}));
	}, []);

	const updateExpirationDate = useCallback(
		(event: any) => {
			const normalizedExpiration = normalizeExpiration(event.target.value);
			const exampleExpiration = '12/34';
			const [expirationMonth, expirationYear] = normalizedExpiration.split('/');
			setIsCardExpired(
				normalizedExpiration.length === exampleExpiration.length &&
					!areExpirationDatesValid(expirationMonth, expirationYear)
			);

			const normalizedEvent = {
				...event,
				target: {
					name: event.target.name,
					value: normalizedExpiration,
				},
			};

			updateCardInfo(normalizedEvent);
		},
		[updateCardInfo]
	);

	const errorByFieldName = serverValidationErrors
		.map(mapOrdersPropertyToEditProperty)
		.concat(clientValidationErrors)
		.reduce((acc, cur) => {
			acc[cur.property || ''] = cur.code;
			return acc;
		}, {});

	const isValidField = useCallback(
		(fieldName: keyof IEditBillingProfile | keyof IEditCardInfo) =>
			Object.prototype.hasOwnProperty.call(errorByFieldName, fieldName) ? false : true,
		[errorByFieldName]
	);

	const onCommitClicked = useCallback(() => {
		setIsProcessing(true);
		const errors = validateBillingProfile(
			isEditingExistingProfile,
			uncommittedBillingProfile,
			statesByCountryId
		);
		setClientValidationErrors(errors);
		if (errors.length === 0) {
			onCommitBillingProfile(uncommittedBillingProfile);
		}
	}, [
		isEditingExistingProfile,
		onCommitBillingProfile,
		statesByCountryId,
		uncommittedBillingProfile,
	]);

	const getUncommittedBillingProfileBoolOrDefault = (propertyName: keyof IEditBillingProfile) => {
		return (uncommittedBillingProfile && uncommittedBillingProfile[propertyName]) || false;
	};

	const getUncommittedCardInfoValueOrDefault = (propertyName: keyof IEditCardInfo) => {
		return (
			(uncommittedBillingProfile &&
				uncommittedBillingProfile.cardInfo &&
				uncommittedBillingProfile.cardInfo[propertyName]) ||
			''
		);
	};

	const strings = useLocalization();

	return (
		<Styled.EditBillingProfileSection>
			<div>
				{handleSaveForLaterChange && (
					<div data-testid="remember-this-card-checkbox">
						<Styled.Checkbox
							onClick={handleSaveForLaterChange}
							isChecked={saveForLater}
							title={strings.rememberThisCard}
							type="button"
						></Styled.Checkbox>
					</div>
				)}
				<Styled.CreditCardInfoRow>
					<Styled.Label>
						<Styled.LabelText>{strings.cardNumber}</Styled.LabelText>
						<Styled.Cleave
							name={nameof<IEditCardInfo>('cardNumber')}
							autoComplete="cc-number"
							pattern={isEditingExistingProfile ? 'x*[0-9]*' : '[0-9]*'}
							isValid={isValidField('cardNumber')}
							placeholder="0000 0000 0000 0000"
							data-testid="card-number"
							onChange={e =>
								updateCardInfo({
									...e,
									target: {
										name: e.target.name,
										value: e.target.value.replace(/ /g, ''),
									},
								})
							}
							options={{
								creditCard: !isEditingExistingProfile,
							}}
							disabled={isEditingExistingProfile}
							value={
								isEditingExistingProfile
									? formatMaskedCardNumber(
											(uncommittedBillingProfile.cardInfo.cardNumber || '').toString(),
											uncommittedBillingProfile.cardInfo.provider || ''
									  )
									: getUncommittedCardInfoValueOrDefault('cardNumber')
							}
						/>
					</Styled.Label>
				</Styled.CreditCardInfoRow>
				<Styled.CreditCardInfoRow>
					<Styled.Label>
						<Styled.LabelText>{strings.nameOnCard}</Styled.LabelText>
						<Styled.Input
							name={nameof<IEditCardInfo>('nameOnCard')}
							autoComplete="cc-name"
							isValid={isValidField('nameOnCard')}
							data-testid="name-on-card"
							onChange={updateCardInfo}
							value={getUncommittedCardInfoValueOrDefault('nameOnCard')}
							border={'1px solid #a8a8a8'}
						/>
					</Styled.Label>
				</Styled.CreditCardInfoRow>
				<Styled.CreditCardInfoRow>
					<Styled.ExpirationContainer>
						<Styled.Label>
							<Styled.LabelText>{strings.expiration}</Styled.LabelText>
							<Styled.Cleave
								name={nameof<IEditCardInfo>('expiration')}
								autoComplete="cc-exp"
								autoFocus={isCardExpired}
								pattern="[0-9]*"
								isValid={isCardExpired ? false : isValidField('expiration')}
								data-testid="expiration"
								title={isCardExpired ? strings.expirationDateError : ''}
								placeholder={strings.placeholders.expiration}
								onBlur={() =>
									uncommittedBillingProfile.cardInfo &&
									uncommittedBillingProfile.cardInfo.expiration &&
									setIsCardExpired(
										!isExpirationValid(uncommittedBillingProfile.cardInfo.expiration)
									)
								}
								onChange={updateExpirationDate}
								options={{ date: true, datePattern: ['m', 'Y'], delimiter: ' / ' }}
								value={getUncommittedCardInfoValueOrDefault('expiration')}
							/>
						</Styled.Label>
					</Styled.ExpirationContainer>
					<Styled.SecurityCodeContainer>
						<Styled.Label>
							<Styled.LabelText>{strings.securityCode}</Styled.LabelText>
							<Styled.Cleave
								name={nameof<IEditCardInfo>('securityCode')}
								autoComplete="cc-csc"
								pattern={isEditingExistingProfile ? 'xxxx' : '[0-9]*'}
								isValid={isValidField('securityCode')}
								data-testid="security-code"
								placeholder={strings.placeholders.securityCode}
								onChange={updateCardInfo}
								options={isEditingExistingProfile ? {} : { numericOnly: true, blocks: [4] }}
								disabled={isEditingExistingProfile}
								value={
									isEditingExistingProfile
										? 'xxxx'
										: getUncommittedCardInfoValueOrDefault('securityCode')
								}
							/>
						</Styled.Label>
					</Styled.SecurityCodeContainer>
				</Styled.CreditCardInfoRow>
			</div>
			<Styled.Checkbox
				onClick={() =>
					updateBillingProfile({
						target: {
							name: nameof<IEditBillingProfile>('makeDefault'),
							value: !getUncommittedBillingProfileBoolOrDefault('makeDefault'),
						},
					})
				}
				isChecked={getUncommittedBillingProfileBoolOrDefault('makeDefault')}
				title={strings.makeDefault}
				type="button"
			></Styled.Checkbox>
			{usageInfo && usageInfo.activeSubscriptionCount > 0 && (
				<Styled.Checkbox
					onClick={() =>
						updateBillingProfile({
							target: {
								name: nameof<IEditBillingProfile>('useOnActiveSubscriptions'),
								value: !getUncommittedBillingProfileBoolOrDefault('useOnActiveSubscriptions'),
							},
						})
					}
					isChecked={getUncommittedBillingProfileBoolOrDefault('useOnActiveSubscriptions')}
					title={strings.moveSubscriptions}
					type="button"
				></Styled.Checkbox>
			)}
			{usageInfo && usageInfo.outstandingPaymentPlansCount > 0 && (
				<Styled.Checkbox
					onClick={() =>
						updateBillingProfile({
							target: {
								name: nameof<IEditBillingProfile>('useOnOutstandingPaymentPlans'),
								value: !getUncommittedBillingProfileBoolOrDefault('useOnOutstandingPaymentPlans'),
							},
						})
					}
					isChecked={getUncommittedBillingProfileBoolOrDefault('useOnOutstandingPaymentPlans')}
					title={strings.movePaymentPlans}
					type="button"
				></Styled.Checkbox>
			)}
			{usageInfo && usageInfo.pendingPrepubCount > 0 && (
				<Styled.Checkbox
					onClick={() =>
						updateBillingProfile({
							target: {
								name: nameof<IEditBillingProfile>('useOnPendingPrepubs'),
								value: !getUncommittedBillingProfileBoolOrDefault('useOnPendingPrepubs'),
							},
						})
					}
					isChecked={getUncommittedBillingProfileBoolOrDefault('useOnPendingPrepubs')}
					title={isCalledPreorder ? strings.movePreorders : strings.movePrepubOrders}
					type="button"
				></Styled.Checkbox>
			)}
			<Styled.Title>{strings.billingAddress}</Styled.Title>
			<AddressForm
				billingProfile={billingProfile}
				uncommittedBillingProfile={uncommittedBillingProfile}
				serverValidationErrors={serverValidationErrors}
				countries={countries}
				statesByCountryId={statesByCountryId}
				onSelectedCountryChanged={onSelectedCountryChanged}
				updateBillingProfile={updateBillingProfile}
				updatePostalCode={updateCardInfo}
				addressFormatItems={addressFormatItems}
				defaultCountryOption={defaultCountryOption}
				isValidField={isValidField}
				errorByFieldName={errorByFieldName}
			/>
			<Styled.NewProfileButtons>
				<div data-testid="create-billing-profile-button">
					<Button
						primary
						medium
						onClick={onCommitClicked}
						ref={commitButtonRef}
						disabled={isProcessing}
					>
						{createButtonText || strings.save}
					</Button>
				</div>
				{onCancelEditingBillingProfile && (
					<Button minor medium onClick={onCancelEditingBillingProfile}>
						{strings.cancel}
					</Button>
				)}
			</Styled.NewProfileButtons>
		</Styled.EditBillingProfileSection>
	);
};

export default EditBillingProfile;
