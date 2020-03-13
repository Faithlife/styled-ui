import React, { useEffect, useCallback, useState } from 'react';
import { Button } from '@faithlife/styled-ui';
import { useLocalization } from '../../Localization';
import IShippingAddressFormProps from '../../typings/IShippingAddressFormProps';
import ICountryDto from '../../clients/typings/locations/ICountryDto';
import IStateDto from '../../clients/typings/locations/IStateDto';
import IAddressFormatItem from '../../clients/typings/locations/IAddressFormatItem';
import LocationsClient from '../../clients/locations-client';
import AddressForm from '../billing-profiles/address-form';
import IEditShippingProfile from '../../typings/IEditShippingProfile';
import { mapOrdersPropertyToEditProperty } from '../../utilities/credit-card-utils';
import IError from '../../clients/typings/orders/IError';
import * as Styled from './styled';
import IEditBillingProfile from '../../typings/IEditBillingProfile';

const unitedStatesCountryId = '840';
const defaultCountryOption = { label: 'United States', value: unitedStatesCountryId };

const ShippingAddressForm: React.FunctionComponent<IShippingAddressFormProps> = ({
	setSystemMessage,
	actAndHandleException,
	billingProfile,
	onCommitClicked,
}) => {
	const [countries, setCountries] = useState<ICountryDto[]>([]);
	const [statesByCountryId, setStatesByCountryId] = useState<Record<string, IStateDto[]>>({});
	const [useBilling, setUseBilling] = useState<boolean>(true);
	const [addressFormatItems, setAddressFormatItems] = useState<IAddressFormatItem[]>([]);
	const [clientValidationErrors] = useState<IError[]>([]);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [uncommittedShippingProfile, setUncommittedShippingProfile] = useState<
		IEditShippingProfile
	>(
		billingProfile
			? {
					name: (billingProfile.cardInfo && billingProfile.cardInfo.nameOnCard) || null,
					organization: null,
					addressLine1: billingProfile.addressLine1,
					addressLine2: billingProfile.addressLine2,
					postalCode: (billingProfile.cardInfo && billingProfile.cardInfo.postalCode) || null,
					city: billingProfile.city,
					stateId: billingProfile.stateId,
					countryId: billingProfile.countryId,
			  }
			: {
					name: null,
					organization: null,
					addressLine1: null,
					addressLine2: null,
					postalCode: null,
					city: null,
					stateId: null,
					countryId: defaultCountryOption.value,
			  }
	);

	const strings = useLocalization();
	// load list of countries for editing billing profiles
	useEffect(() => {
		const loadCountries = async () => {
			const countries = await LocationsClient.getCountries();
			setCountries(countries);
		};

		actAndHandleException(loadCountries, strings.fetchCountries);
	}, [setCountries, actAndHandleException, strings.fetchCountries]);

	const fetchStatesForCountry = useCallback(
		async (countryId: string) => {
			if (!Object.prototype.hasOwnProperty.call(statesByCountryId, countryId)) {
				const getStates = async () => {
					const states = await LocationsClient.getStatesForCountry(countryId);

					setStatesByCountryId(prev => ({
						...prev,
						[countryId]: states,
					}));
				};
				await actAndHandleException(getStates, strings.fetchStates);
			}
		},
		[statesByCountryId, actAndHandleException, strings]
	);

	const getAddressFormatForCountry = useCallback(
		async (countryId: string) => {
			const getAddressFormatForCountry = async () => {
				const addressFormatItems = await LocationsClient.getAddressFormatForCountry(countryId);

				setAddressFormatItems(addressFormatItems);
			};
			await actAndHandleException(getAddressFormatForCountry, strings.fetchAddressFormat);
		},
		[setAddressFormatItems, actAndHandleException, strings]
	);

	// load list initial address format for usa
	useEffect(() => {
		const getAddressFormat = async () => {
			await getAddressFormatForCountry(unitedStatesCountryId);
		};
		actAndHandleException(getAddressFormat, strings.fetchCountries);
	}, [getAddressFormatForCountry, actAndHandleException, strings.fetchCountries]);

	const handleCountryChanged = useCallback(
		async (countryId: string) => {
			await getAddressFormatForCountry(countryId);
			await fetchStatesForCountry(countryId);
		},
		[getAddressFormatForCountry, fetchStatesForCountry]
	);
	// load list of states for editing billing profiles
	useEffect(() => {
		const loadCountries = async () => {
			await fetchStatesForCountry(unitedStatesCountryId);
		};

		actAndHandleException(loadCountries, strings.fetchCountries);
	}, [fetchStatesForCountry, actAndHandleException, strings.fetchCountries]);

	const serverValidationErrors = [];

	// TODO: test serverValidationErrors
	const errorByFieldName = serverValidationErrors
		.map(mapOrdersPropertyToEditProperty)
		.concat(clientValidationErrors)
		.reduce((acc, cur) => {
			acc[cur.property || ''] = cur.code;
			return acc;
		}, {});

	const isValidField = useCallback(
		(fieldName: keyof IEditShippingProfile) =>
			Object.prototype.hasOwnProperty.call(errorByFieldName, fieldName) ? false : true,
		[errorByFieldName]
	);

	const updateBillingProfile = useCallback(event => {
		const name = event.target.name;
		const value = event.target.value;
		setUncommittedShippingProfile(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const updatePostalCode = useCallback((event: any) => {
		// need to make local copies in case the event gets nullified before the useState function is called
		const value = event.target.value;
		const name = event.target.name;
		setUncommittedShippingProfile(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const handleCommitClicked = useCallback(() => {
		setIsProcessing(true);

		const shippingAddress = {
			...uncommittedShippingProfile,
			countryAlpha2: countries.find(
				country => country.countryId === uncommittedShippingProfile.countryId
			)?.alpha2,
			state: statesByCountryId[uncommittedShippingProfile.countryId as string].find(
				state => state.stateId === uncommittedShippingProfile.stateId
			)?.abbreviation,
		};

		onCommitClicked(shippingAddress);
	}, [setIsProcessing, uncommittedShippingProfile, onCommitClicked, countries, statesByCountryId]);

	const getUncommittedShippingProfileValueOrDefault = (propertyName: any) => {
		return (uncommittedShippingProfile && uncommittedShippingProfile[propertyName]) || '';
	};

	const mapShippingToBillingProfile = (
		shippingProfile: IEditShippingProfile
	): IEditBillingProfile => {
		const { addressLine1, addressLine2, postalCode, city, suburb, stateId, countryId } = {
			...shippingProfile,
		};

		return {
			addressLine1,
			addressLine2,
			city,
			suburb,
			stateId,
			countryId,
			cardInfo: { postalCode },
		};
	};

	const handleUseBillingChange = useCallback(() => {
		setUncommittedShippingProfile(
			useBilling
				? {
						name: null,
						organization: null,
						addressLine1: null,
						addressLine2: null,
						postalCode: null,
						city: null,
						stateId: null,
						countryId: defaultCountryOption.value,
				  }
				: {
						name: billingProfile?.cardInfo?.nameOnCard || null,
						organization: null,
						addressLine1: billingProfile?.addressLine1 || null,
						addressLine2: billingProfile?.addressLine2 || null,
						postalCode: billingProfile?.cardInfo?.postalCode || null,
						city: billingProfile?.city || null,
						stateId: billingProfile?.stateId || null,
						countryId: billingProfile?.countryId || null,
				  }
		);
		setUseBilling(!useBilling);
	}, [useBilling, billingProfile]);

	if (!countries || addressFormatItems.length === 0) {
		return null;
	}

	if (billingProfile?.countryId && !statesByCountryId[billingProfile.countryId]) {
		return null;
	}

	return (
		<Styled.ShippingAddressContainer>
			<Styled.Form>
				{billingProfile && (
					<Styled.Row>
						<Styled.Checkbox
							onClick={handleUseBillingChange}
							isChecked={useBilling}
							title={strings.sameAsBilling}
							type="button"
						></Styled.Checkbox>
					</Styled.Row>
				)}
				<Styled.Row>
					<Styled.Label>
						<Styled.LabelText>{strings.name}</Styled.LabelText>
						<Styled.Input
							name={'name'}
							autoComplete="name"
							onChange={updateBillingProfile}
							isValid={true}
							data-testid="name"
							value={getUncommittedShippingProfileValueOrDefault('name')}
							border={'1px solid #a8a8a8'}
						/>
					</Styled.Label>
				</Styled.Row>
				<Styled.Row>
					<Styled.Label>
						<Styled.LabelText>{strings.organization}</Styled.LabelText>
						<Styled.Input
							name={'organization'}
							autoComplete="organization"
							onChange={updateBillingProfile}
							isValid={true}
							value={getUncommittedShippingProfileValueOrDefault('organization')}
							border={'1px solid #a8a8a8'}
						/>
					</Styled.Label>
				</Styled.Row>
				<AddressForm
					serverValidationErrors={[]}
					countries={countries}
					statesByCountryId={statesByCountryId}
					onSelectedCountryChanged={handleCountryChanged}
					addressFormatItems={addressFormatItems}
					billingProfile={billingProfile}
					uncommittedBillingProfile={mapShippingToBillingProfile(uncommittedShippingProfile)}
					updateBillingProfile={updateBillingProfile}
					updatePostalCode={updatePostalCode}
					isValidField={isValidField}
					errorByFieldName={errorByFieldName}
					defaultCountryOption={defaultCountryOption}
				/>
				<Styled.ButtonContainer>
					<div data-testid="submit-address-form-button">
						<Button primary medium onClick={handleCommitClicked} disabled={isProcessing}>
							{strings.next}
						</Button>
					</div>
				</Styled.ButtonContainer>
			</Styled.Form>
		</Styled.ShippingAddressContainer>
	);
};

export { ShippingAddressForm };
