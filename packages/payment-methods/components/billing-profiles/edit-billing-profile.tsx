import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { components } from 'react-select';

import { Button } from '@faithlife/styled-ui';
import { Select } from '@faithlife/styled-ui/dist/text-input-v2';
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
import ISelectOption from '../../typings/ISelectOption';
import * as Styled from './styled';
import IUsageInfoDto from '../../clients/typings/orders/UsageInfoDto';
import IAddressFormatItem from '../../clients/typings/locations/IAddressFormatItem';

interface IEditBillingProfileProps {
	billingProfile?: IEditBillingProfile;
	onCommitBillingProfile: Function;
	onCancelEditingBillingProfile: Function;
	serverValidationErrors: IError[];
	countries: ICountryDto[];
	statesByCountryId: Record<string, IStateDto[]>;
	onSelectedCountryChanged: Function;
	usageInfo?: IUsageInfoDto;
	addressFormatItems: IAddressFormatItem[];
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
}) => {
	const commitButtonRef = useRef<Button>(null);
	const [shouldCloseStateSelect, setShouldCloseStateSelect] = useState<boolean>(false);
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
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const initialStateOption =
		billingProfile &&
		statesByCountryId &&
		Object.prototype.hasOwnProperty.call(
			statesByCountryId,
			uncommittedBillingProfile.countryId as string
		)
			? statesByCountryId[uncommittedBillingProfile.countryId as string]
					.map(mapStateToOption)
					.find(stateDto => stateDto.value === uncommittedBillingProfile.stateId)
			: { label: '', value: '' };

	const [stateOption, setStateOption] = useState<{ label: string; value: string }>(
		initialStateOption || { label: '', value: '' }
	);

	useEffect(() => {
		if (shouldCloseStateSelect) {
			setShouldCloseStateSelect(false);
			commitButtonRef.current.focus();
		}
	}, [shouldCloseStateSelect]);

	const countryOptions = useMemo<ISelectOption[]>(
		() =>
			countries
				.map(c => ({ label: c.name, value: c.countryId }))
				.sort((a, b) => a.label.localeCompare(b.label)),
		[countries]
	);

	const stateOptions = useMemo(
		() =>
			Object.prototype.hasOwnProperty.call(
				statesByCountryId,
				uncommittedBillingProfile.countryId as string
			)
				? statesByCountryId[uncommittedBillingProfile.countryId as string]
						.map(mapStateToOption)
						.sort((a, b) => a.label.localeCompare(b.label))
				: [],
		[statesByCountryId, uncommittedBillingProfile.countryId]
	);

	const optionByState = useMemo(
		() =>
			Object.prototype.hasOwnProperty.call(
				statesByCountryId,
				uncommittedBillingProfile.countryId as string
			)
				? statesByCountryId[uncommittedBillingProfile.countryId as string].reduce((acc, cur) => {
						const option = mapStateToOption(cur);
						acc[cur.abbreviation.toLowerCase()] = option;
						acc[cur.name.toLowerCase()] = option;
						return acc;
				  }, {})
				: {},
		[statesByCountryId, uncommittedBillingProfile.countryId]
	);

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

	const getUncommittedBillingProfileValueOrDefault = (propertyName: keyof IEditBillingProfile) => {
		return (uncommittedBillingProfile && uncommittedBillingProfile[propertyName]) || '';
	};

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

	const useStateSelector =
		Object.prototype.hasOwnProperty.call(
			statesByCountryId,
			uncommittedBillingProfile.countryId as string
		) && statesByCountryId[uncommittedBillingProfile.countryId as string].length > 0;

	const stateAddressFormat = addressFormatItems.find(
		item => item.kind === 'State' || item.kind === 'Suburb'
	) as IAddressFormatItem;

	const postalCodeAddressFormat = addressFormatItems.find(
		item => item.kind === 'PostalCode'
	) as IAddressFormatItem;

	const strings = useLocalization();

	return (
		<Styled.EditBillingProfileSection>
			<div>
				<Styled.CreditCardInfoRow>
					<Styled.Label>
						<Styled.LabelText>{strings.cardNumber}</Styled.LabelText>
						<Styled.Cleave
							name={nameof<IEditCardInfo>('cardNumber')}
							autoComplete="cc-number"
							pattern={isEditingExistingProfile ? 'x*[0-9]*' : '[0-9]*'}
							isValid={isValidField('cardNumber')}
							placeholder="0000 0000 0000 0000"
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
					title={strings.movePrepubOrders}
					type="button"
				></Styled.Checkbox>
			)}
			<Styled.BillingAddressInfoSection>
				<Styled.Title>{strings.billingAddress}</Styled.Title>
				<Styled.CreditCardInfoRow data-test-id="country-selector-container">
					<Styled.Label>
						<Styled.LabelText>{strings.country}</Styled.LabelText>
						<Select
							name={nameof<IEditBillingProfile>('countryId')}
							autoComplete="country-name"
							placeholder={strings.country}
							onChange={(option, { action, name }) => {
								if (action === 'select-option') {
									onSelectedCountryChanged(option.value);
									updateBillingProfile({
										target: {
											name,
											value: option.value,
										},
									});

									updateBillingProfile({
										target: {
											name: nameof<IEditBillingProfile>('stateId'),
											value: '',
										},
									});
								}
							}}
							options={countryOptions}
							defaultValue={defaultCountryOption}
							styles={countrySelectStyles}
						/>
					</Styled.Label>
				</Styled.CreditCardInfoRow>
				<Styled.CreditCardInfoRow>
					<Styled.Label>
						<Styled.LabelText>{strings.streetAddress}</Styled.LabelText>
						<Styled.Input
							name={nameof<IEditBillingProfile>('addressLine1')}
							autoComplete="address-line1"
							isValid={isValidField('addressLine1')}
							onChange={updateBillingProfile}
							value={getUncommittedBillingProfileValueOrDefault('addressLine1')}
							border={'1px solid #a8a8a8'}
						/>
					</Styled.Label>
				</Styled.CreditCardInfoRow>
				<Styled.CreditCardInfoRow data-test-id="address-line-2">
					<Styled.Input
						name={nameof<IEditBillingProfile>('addressLine2')}
						autoComplete="address-line2"
						isValid={isValidField('addressLine2')}
						onChange={updateBillingProfile}
						value={getUncommittedBillingProfileValueOrDefault('addressLine2')}
						border={'1px solid #a8a8a8'}
					/>
				</Styled.CreditCardInfoRow>

				<Styled.CityStateInfoRow>
					<Styled.CityContainer>
						<Styled.Label>
							<Styled.LabelText>{strings.city}</Styled.LabelText>
							<Styled.Input
								name={nameof<IEditBillingProfile>('city')}
								autoComplete="address-level2"
								placeholder={strings.city}
								isValid={isValidField('city')}
								onChange={updateBillingProfile}
								value={getUncommittedBillingProfileValueOrDefault('city')}
								border={'1px solid #a8a8a8'}
							/>
						</Styled.Label>
					</Styled.CityContainer>
					{useStateSelector ? (
						<Styled.StateContainer data-test-id="state-selector-container">
							<Styled.Label>
								<Styled.LabelText>{strings[toCamelCase(stateAddressFormat.name)]}</Styled.LabelText>
								<Select
									name={nameof<IEditBillingProfile>('stateId')}
									components={{
										Input: StateInput,
									}}
									placeholder="—"
									menuIsOpen={isMenuOpen}
									onInputChange={(value, { action }) => {
										// HACK: close the menu after the browser auto-fills the address
										// see https://github.com/JedWatson/react-select/issues/765
										if (action === 'input-change') {
											if (optionByState[value.toLowerCase()]) {
												setStateOption(optionByState[value.toLowerCase()]);
												setIsMenuOpen(false);
											} else {
												if (!isMenuOpen) {
													setIsMenuOpen(true);
												}
											}
										}
									}}
									onMenuOpen={() => {
										/* HACK: don't let auto-fill open the menu */
									}}
									onMenuClose={() => {
										setIsMenuOpen(false);
									}}
									onChange={(option, { action, name }) => {
										if (action === 'select-option') {
											setStateOption(option);
											updateBillingProfile({
												target: {
													name,
													value: option.value,
												},
											});
										}
									}}
									onBlur={e => {
										setIsMenuOpen(false);
										const selectedOption = optionByState[e.target.value.toLowerCase()];

										if (selectedOption) {
											setStateOption(selectedOption);
											updateBillingProfile({
												target: {
													name: nameof<IEditBillingProfile>('stateId'),
													value: selectedOption.value,
												},
											});
										}
									}}
									onFocus={() => setIsMenuOpen(true)}
									options={stateOptions}
									value={stateOption}
									styles={stateSelectStyles(
										!Object.prototype.hasOwnProperty.call(
											errorByFieldName,
											nameof<IEditBillingProfile>('stateId')
										)
									)}
								/>
							</Styled.Label>
						</Styled.StateContainer>
					) : (
						stateAddressFormat &&
						!stateAddressFormat.isOptional && (
							<Styled.StateContainer>
								<Styled.Label>
									<Styled.LabelText>
										{strings[toCamelCase(stateAddressFormat.name)]}
									</Styled.LabelText>
									<Styled.Input
										name={nameof<IEditBillingProfile>('suburb')}
										autoComplete="suburb"
										placeholder={stateAddressFormat.name}
										isValid={isValidField('suburb')}
										onChange={updateBillingProfile}
										value={getUncommittedBillingProfileValueOrDefault('suburb')}
										border={'1px solid #a8a8a8'}
									></Styled.Input>
								</Styled.Label>
							</Styled.StateContainer>
						)
					)}
					{postalCodeAddressFormat && !postalCodeAddressFormat.isOptional && (
						<Styled.PostalCodeContainer>
							<Styled.Label>
								<Styled.LabelText>
									{strings[toCamelCase(postalCodeAddressFormat.name)]}
								</Styled.LabelText>
								<Styled.Cleave
									name={nameof<IEditCardInfo>('postalCode')}
									autoComplete="postal-code"
									isValid={isValidField('postalCode')}
									placeholder={strings.placeholders.postalCode}
									onChange={updateCardInfo}
									options={{ blocks: [10] }}
									value={getUncommittedCardInfoValueOrDefault('postalCode')}
								/>
							</Styled.Label>
						</Styled.PostalCodeContainer>
					)}
				</Styled.CityStateInfoRow>
			</Styled.BillingAddressInfoSection>
			<Styled.NewProfileButtons>
				<Button minor medium onClick={onCancelEditingBillingProfile}>
					{'Cancel'}
				</Button>
				<div data-test-id="create-billing-profile-button">
					<Button
						primary
						medium
						onClick={onCommitClicked}
						ref={commitButtonRef}
						disabled={isProcessing}
					>
						{isEditingExistingProfile ? strings.save : strings.create}
					</Button>
				</div>
			</Styled.NewProfileButtons>
		</Styled.EditBillingProfileSection>
	);
};

const StateInput = ({ ...props }) => <components.Input {...props} autoComplete="address-level1" />;

const countrySelectStyles = {
	dropdownIndicator: base => {
		return {
			...base,
			paddingLeft: '6px',
			paddingRight: '6px',
		};
	},
};

const stateSelectStyles = isValid => {
	return {
		control: (base, state) => {
			return isValid
				? { ...base }
				: {
						...base,
						border: '1px solid #db4818',
						boxShadow: '0 0 0 2px #f6d0d3',
						'&:hover': {
							boxShadow: '0 0 0 2px #f6d0d3',
						},
						outline: state.isFocused ? '1px auto #d94848' : 'none',
				  };
		},
		dropdownIndicator: base => ({
			...base,
			paddingLeft: '5px',
			paddingRight: '5px',
		}),
		option: base => ({
			...base,
			paddingLeft: '6px',
		}),
	};
};

const mapStateToOption = (state: IStateDto) => ({
	label: state.abbreviation.toUpperCase(),
	value: state.stateId,
});

const toCamelCase = (source: string) => source.charAt(0).toLowerCase() + source.slice(1);

export default EditBillingProfile;
