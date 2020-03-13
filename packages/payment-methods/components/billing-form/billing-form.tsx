import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import EditBillingProfile from '../billing-profiles/edit-billing-profile';
import ICountryDto from '../../clients/typings/locations/ICountryDto';
import IStateDto from '../../clients/typings/locations/IStateDto';
import IAddressFormatItem from '../../clients/typings/locations/IAddressFormatItem';
import LocationsClient from '../../clients/locations-client';
import { useLocalization } from '../../Localization';
import IEditBillingProfile from '../../typings/IEditBillingProfile';
import BillingProfileMapper from '../../mappers/BillingProfileMapper';
import OrdersClient from '../../clients/orders-client';
import { isErrors } from '../../clients/typings/orders/IErrors';
import IError from '../../clients/typings/orders/IError';

const unitedStatesCountryId = '840';

const BillingForm: React.FunctionComponent<any> = ({
	onCommitBillingProfile,
	actAndHandleException,
	setSystemMessage,
	getCardInfoFromSessionStorage,
	setCardInfoToSessionStorage,
}) => {
	const [countries, setCountries] = useState<ICountryDto[]>([]);
	const [statesByCountryId, setStatesByCountryId] = useState<Record<string, IStateDto[]>>({});
	const [addressFormatItems, setAddressFormatItems] = useState<IAddressFormatItem[]>([]);
	const [billingProfileValidationErrors, setBillingProfileValidationErrors] = useState<IError[]>(
		[]
	);
	const [saveForLater, setSaveForLater] = useState<boolean>(true);

	const strings = useLocalization();

	const handleSaveForLaterChange = useCallback(() => setSaveForLater(prev => !prev), [
		setSaveForLater,
	]);

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

	const handleBillingProfileCommit = useCallback(
		async (profile: IEditBillingProfile) => {
			const createProfile = async () => {
				const newOrdersBillingProfile = BillingProfileMapper.mapForCreatingInOrdersApi(
					profile,
					saveForLater
				);
				const response = await OrdersClient.createOrdersBillingProfile(newOrdersBillingProfile);

				if (isErrors(response)) {
					const fieldErrors = response.errors.filter(e => e.property !== null);
					const hasGeneralErrors = response.errors.some(e => e.message !== null);

					setBillingProfileValidationErrors(fieldErrors);
					if (hasGeneralErrors) {
						setSystemMessage({
							message: strings.billingUpdateError,
							status: 'error',
						});
					}
				} else {
					if (!saveForLater) {
						const sanitizedExpiration = (profile.cardInfo.expiration || '').replace(/ \//g, '');
						const cardInfo = {
							cardNumber: profile.cardInfo.cardNumber,
							expirationMonth: parseInt(sanitizedExpiration.slice(0, 2)),
							expirationYear: parseInt(
								new Date()
									.getFullYear()
									.toString()
									.substr(0, 2) + sanitizedExpiration.slice(-2)
							),
						};
						setCardInfoToSessionStorage(response.profileId, cardInfo);
					}
					onCommitBillingProfile(BillingProfileMapper.mapForEditing(response));
				}
			};

			await actAndHandleException(createProfile, strings.createProfile);
		},
		[
			onCommitBillingProfile,
			actAndHandleException,
			setSystemMessage,
			strings,
			saveForLater,
			setCardInfoToSessionStorage,
		]
	);

	if (!countries || addressFormatItems.length === 0 || !statesByCountryId[unitedStatesCountryId]) {
		return null;
	}

	return (
		<BillingFormStyled>
			<EditBillingProfile
				onCommitBillingProfile={handleBillingProfileCommit}
				serverValidationErrors={billingProfileValidationErrors}
				countries={countries}
				statesByCountryId={statesByCountryId}
				onSelectedCountryChanged={handleCountryChanged}
				addressFormatItems={addressFormatItems}
				isCalledPreorder={false}
				handleSaveForLaterChange={handleSaveForLaterChange}
				saveForLater={saveForLater}
				createButtonText={strings.next}
			></EditBillingProfile>
		</BillingFormStyled>
	);
};

const BillingFormStyled = styled.div`
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

export default BillingForm;
