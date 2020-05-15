import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Radio, Button } from '@faithlife/styled-ui';
import { useLocalization } from '../../Localization';
import OrdersClient from '../../clients/orders-client';
import LocationsClient from '../../clients/locations-client';
import IBillingProfileDto from '../../clients/typings/orders/IBillingProfileDto';
import ICountryDto from '../../clients/typings/locations/ICountryDto';
import IStateDto from '../../clients/typings/locations/IStateDto';
import BillingProfile from './billing-profile';
import BillingProfileMapper from '../../mappers/BillingProfileMapper';
import EditBillingProfile from './edit-billing-profile';
import * as Styled from './styled';
import IEditBillingProfile from '../../typings/IEditBillingProfile';
import { isErrors } from '../../clients/typings/orders/IErrors';
import IError from '../../clients/typings/orders/IError';
import IBillingProfileInfo from '../../typings/IBillingProfileInfo';
import { ISystemMessage } from '../../typings/ISystemMessage';
import IUsageInfoDto from '../../clients/typings/orders/UsageInfoDto';
import IAddressFormatItem from '../../clients/typings/locations/IAddressFormatItem';

type billingProfileChangeKind = 'selected' | 'deleted' | 'invalidated';
const unitedStatesCountryId = '840';

interface IBillingProfilesProps {
	onSelectedBillingProfileChange: (
		billingProfile: IBillingProfileInfo,
		action: billingProfileChangeKind
	) => void;
	actAndHandleException: <T>(
		action: () => Promise<T>,
		actionDescription: string
	) => Promise<T | undefined>;
	setSystemMessage: (systemMessage: ISystemMessage) => void;
	selectedProfileId?: string;
	isCalledPreorder: boolean;
	getCardInfoFromSessionStorage?: Function;
	setCardInfoToSessionStorage?: Function;
	allowAddressOnly: boolean;
	handleSelectedProfileInvalid;
}

const BillingProfiles: React.FunctionComponent<IBillingProfilesProps> = ({
	onSelectedBillingProfileChange,
	actAndHandleException,
	setSystemMessage,
	selectedProfileId,
	isCalledPreorder,
	getCardInfoFromSessionStorage,
	setCardInfoToSessionStorage,
	allowAddressOnly = false,
	handleSelectedProfileInvalid,
	...props
}) => {
	const [billingProfiles, setBillingProfiles] = useState<IBillingProfileDto[]>([]);
	const [usageInfo, setUsageInfo] = useState<IUsageInfoDto>();
	const [billingProfileValidationErrors, setBillingProfileValidationErrors] = useState<IError[]>(
		[]
	);

	const [showAllPaymentMethods, setShowAllPaymentMethods] = useState<boolean>(false);
	const [shouldRefreshBillingProfiles, setShouldRefreshBillingProfiles] = useState(true);
	const [selectedBillingProfileId, setSelectedBillingProfileId] = useState<string | undefined>(
		selectedProfileId
	);
	const [isAddingNewBillingProfile, setIsAddingNewBillingProfile] = useState(false);
	const [editingBillingProfileId, setEditingBillingProfileId] = useState<string | null>(null);
	const [countries, setCountries] = useState<ICountryDto[]>([]);
	const [statesByCountryId, setStatesByCountryId] = useState<Record<string, IStateDto[]>>({});
	const [addressFormatItems, setAddressFormatItems] = useState<IAddressFormatItem[]>([]);
	const [saveForLater, setSaveForLater] = useState<boolean>(true);

	const handleSaveForLaterChange = useCallback(() => setSaveForLater(prev => !prev), [
		setSaveForLater,
	]);

	const strings = useLocalization();

	useEffect(() => {
		const loadBillingProfiles = async () => {
			const billingProfiles = await OrdersClient.getBillingProfiles();

			if (
				selectedProfileId &&
				getCardInfoFromSessionStorage &&
				handleSelectedProfileInvalid &&
				!billingProfiles.billingProfiles.find(profile => profile.profileId === selectedProfileId)
			) {
				// Get the address only profile and search for card info in session storage
				const response = await OrdersClient.getBillingProfile(selectedProfileId);
				const cardInfo = getCardInfoFromSessionStorage(selectedProfileId);

				if (!cardInfo && !allowAddressOnly) {
					handleSelectedProfileInvalid();
					setIsAddingNewBillingProfile(true);
					return;
				}

				const profilesWithAddressOnlySelectedProfile = [
					...billingProfiles.billingProfiles,
					{
						...response,
						cardInfo: cardInfo,
					},
				];
				setSelectedBillingProfileId(response.profileId);
				setBillingProfiles(profilesWithAddressOnlySelectedProfile);
				setUsageInfo(billingProfiles.usageInfo);
			} else {
				setBillingProfiles(billingProfiles.billingProfiles);
				setUsageInfo(billingProfiles.usageInfo);
			}
		};

		actAndHandleException(loadBillingProfiles, strings.fetchBillingProfiles);
	}, [
		setBillingProfiles,
		actAndHandleException,
		strings.fetchBillingProfiles,
		selectedProfileId,
		getCardInfoFromSessionStorage,
		onSelectedBillingProfileChange,
		allowAddressOnly,
		handleSelectedProfileInvalid,
	]);

	// load list of countries for editing billing profiles
	useEffect(() => {
		const loadCountries = async () => {
			const countries = await LocationsClient.getCountries();
			setCountries(countries);
		};

		actAndHandleException(loadCountries, strings.fetchCountries);
	}, [setCountries, actAndHandleException, strings.fetchCountries]);

	// Todo: rename
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

	const handleCountryChanged = useCallback(
		async (countryId: string) => {
			await getAddressFormatForCountry(countryId);
			await fetchStatesForCountry(countryId);
		},
		[getAddressFormatForCountry, fetchStatesForCountry]
	);

	// load list initial address format for usa
	useEffect(() => {
		const getAddressFormat = async () => {
			await getAddressFormatForCountry(unitedStatesCountryId);
		};
		actAndHandleException(getAddressFormat, strings.fetchCountries);
	}, [getAddressFormatForCountry, actAndHandleException, strings.fetchCountries]);

	// load list of states for editing billing profiles
	useEffect(() => {
		const loadCountries = async () => {
			await fetchStatesForCountry(unitedStatesCountryId);
		};

		actAndHandleException(loadCountries, strings.fetchCountries);
	}, [fetchStatesForCountry, actAndHandleException, strings.fetchCountries]);

	// refresh billing profiles if necessary
	useEffect(() => {
		if (shouldRefreshBillingProfiles) {
			setShouldRefreshBillingProfiles(false);

			const getBillingProfiles = async () => {
				const freshProfiles = await OrdersClient.getBillingProfiles();

				setBillingProfiles(freshProfiles.billingProfiles);
				setUsageInfo(freshProfiles.usageInfo);
				if (freshProfiles.billingProfiles.length > 0) {
					const defaultProfile = freshProfiles.billingProfiles.filter(p => p.isDefault)[0];
					if (defaultProfile && !selectedBillingProfileId) {
						setSelectedBillingProfileId(defaultProfile.profileId);
						setShowAllPaymentMethods(
							freshProfiles.billingProfiles.findIndex(
								p => p.profileId === defaultProfile.profileId
							) > 2
						);
					} else {
						setShowAllPaymentMethods(
							freshProfiles.billingProfiles.findIndex(
								p => p.profileId === selectedBillingProfileId
							) > 2
						);
					}
				}
			};

			actAndHandleException(getBillingProfiles, strings.fetchBillingProfiles);
		}
	}, [
		shouldRefreshBillingProfiles,
		actAndHandleException,
		strings.fetchBillingProfiles,
		selectedBillingProfileId,
		setUsageInfo,
	]);

	const onSelectBillingProfile = useCallback(
		(billingProfile: IBillingProfileDto) => {
			const country =
				countries && countries.find(c => c.countryId === billingProfile.countryId.toString());
			onSelectedBillingProfileChange(
				{
					billingProfileDto: billingProfile,
					countryAlpha2: (country && country.alpha2) || 'US',
				},
				'selected'
			);

			setSelectedBillingProfileId(billingProfile.profileId);
		},
		[countries, onSelectedBillingProfileChange]
	);

	// TODO: add bank accounts too
	const createOrdersApiBillingProfile = useCallback(
		async (newBillingProfile: IEditBillingProfile) => {
			const createProfile = async () => {
				const newOrdersBillingProfile = BillingProfileMapper.mapForCreatingInOrdersApi(
					newBillingProfile,
					saveForLater
				);
				const response = await OrdersClient.createOrdersBillingProfile(newOrdersBillingProfile);

				if (isErrors(response)) {
					const fieldErrors = response.errors.filter(e => e.property !== null);
					const isConflict = response.errors.some(e => e.code === '409');
					const hasGeneralErrors = response.errors.some(e => e.message !== null);

					setBillingProfileValidationErrors(fieldErrors);
					if (hasGeneralErrors || isConflict) {
						setSystemMessage({
							message: isConflict ? strings.conflict : strings.billingUpdateError,
							status: 'error',
						});
					}
				} else {
					if (!saveForLater && setCardInfoToSessionStorage) {
						const sanitizedExpiration = (newBillingProfile.cardInfo.expiration || '').replace(
							/ \//g,
							''
						);
						const cardInfo = {
							cardNumber: newBillingProfile.cardInfo.cardNumber,
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
					setShouldRefreshBillingProfiles(true);
					setIsAddingNewBillingProfile(false);
					onSelectBillingProfile(response);
					setSelectedBillingProfileId(response.profileId);
				}
			};

			await actAndHandleException(createProfile, strings.createProfile);
		},
		[
			onSelectBillingProfile,
			actAndHandleException,
			setSystemMessage,
			strings,
			setCardInfoToSessionStorage,
			saveForLater,
		]
	);

	const updateBillingProfile = useCallback(
		async (profileId: string, profile: IEditBillingProfile) => {
			const updateProfile = async () => {
				const response = await OrdersClient.updateOrdersBillingProfile(
					profileId,
					BillingProfileMapper.mapForUpdating(profile)
				);

				if (isErrors(response)) {
					setBillingProfileValidationErrors(response.errors.filter(e => e.property !== null));

					const isConflict = response.errors.some(e => e.code === '409');
					const hasGeneralErrors = response.errors.some(e => e.message !== null);
					if (isConflict || hasGeneralErrors) {
						setSystemMessage({
							message: isConflict ? strings.conflict : strings.billingUpdateError,
							status: 'error',
						});
					}
				} else {
					setEditingBillingProfileId(null);
					setShouldRefreshBillingProfiles(true);
					setSelectedBillingProfileId(profileId);
				}
			};
			await actAndHandleException(updateProfile, strings.updateProfile);
		},
		[setSystemMessage, strings, actAndHandleException]
	);

	const resetEditingBillingProfile = useCallback(() => {
		setIsAddingNewBillingProfile(false);
		setEditingBillingProfileId(null);
		setAddressFormatItems([]);

		// Reset the editor back to US defaults
		handleCountryChanged(unitedStatesCountryId);
	}, [
		setIsAddingNewBillingProfile,
		setEditingBillingProfileId,
		setAddressFormatItems,
		handleCountryChanged,
	]);

	const onDeleteBillingProfile = useCallback(
		async (billingProfileId: string): Promise<boolean> => {
			const deleteProfile = async () => {
				const response = await OrdersClient.deleteOrdersBillingProfile(billingProfileId);

				const isConflict =
					response && isErrors(response) && response.errors.some(e => e.code === '409');

				if (isConflict) {
					setSystemMessage({
						message: strings.conflict,
						status: 'error',
					});
				}

				resetEditingBillingProfile();
				setShouldRefreshBillingProfiles(true);
				return true;
			};

			return (await actAndHandleException(deleteProfile, strings.deleteProfile)) || false;
		},
		[strings, actAndHandleException, setSystemMessage, resetEditingBillingProfile]
	);

	const toggleEditBillingProfile = useCallback(
		(billingProfileId: string): void => {
			editingBillingProfileId
				? setEditingBillingProfileId(null)
				: setEditingBillingProfileId(billingProfileId);
		},
		[editingBillingProfileId, setEditingBillingProfileId]
	);

	const handleOnUpdateBillingProfile = useCallback(
		(billingProfile: IBillingProfileDto): void => {
			const countryId =
				billingProfile.countryId === -1
					? unitedStatesCountryId
					: billingProfile.countryId.toString();
			handleCountryChanged(countryId);
			fetchStatesForCountry(countryId);
			toggleEditBillingProfile(billingProfile.profileId);
		},
		[handleCountryChanged, toggleEditBillingProfile, fetchStatesForCountry]
	);

	const displayProfiles = showAllPaymentMethods ? billingProfiles : billingProfiles.slice(0, 3);
	return (
		<Styled.BillingProfilesContainer>
			<Styled.BillingProfilesSection>
				<Styled.BillingProfiles maxWidth="327px" {...props} data-testid="billing-profiles">
					<Styled.CreditCardRow>
						<Radio
							onClick={() => setIsAddingNewBillingProfile(true)}
							isChecked={isAddingNewBillingProfile}
							type="button"
						>
							<Styled.NewCardLabel data-testid="add-payment-method-button">
								{strings.newCreditCard}
							</Styled.NewCardLabel>
						</Radio>
					</Styled.CreditCardRow>
					{isAddingNewBillingProfile && (
						<EditBillingProfile
							onCommitBillingProfile={(profile: IEditBillingProfile) => {
								createOrdersApiBillingProfile(profile);
								resetEditingBillingProfile();
							}}
							onCancelEditingBillingProfile={resetEditingBillingProfile}
							serverValidationErrors={billingProfileValidationErrors}
							countries={countries}
							statesByCountryId={statesByCountryId}
							onSelectedCountryChanged={handleCountryChanged}
							usageInfo={usageInfo}
							addressFormatItems={addressFormatItems}
							isCalledPreorder={isCalledPreorder}
							handleSaveForLaterChange={
								getCardInfoFromSessionStorage ? handleSaveForLaterChange : undefined
							}
							saveForLater={saveForLater}
							createButtonText={strings.create}
						/>
					)}
					{displayProfiles
						? displayProfiles.map((p, i) => (
								<Fragment key={p.profileId}>
									<BillingProfile
										billingProfile={p}
										onDelete={onDeleteBillingProfile}
										onUpdate={handleOnUpdateBillingProfile}
										isSelected={
											selectedBillingProfileId === p.profileId && !isAddingNewBillingProfile
										}
										onSelected={() => onSelectBillingProfile(p)}
										index={i}
										isEditing={editingBillingProfileId === p.profileId}
										isCalledPreorder={isCalledPreorder}
									/>
									{editingBillingProfileId === p.profileId && (
										<EditBillingProfile
											billingProfile={BillingProfileMapper.mapForEditing(
												displayProfiles.find(
													p => p.profileId === editingBillingProfileId
												) as IBillingProfileDto
											)}
											onCommitBillingProfile={profile => {
												updateBillingProfile(editingBillingProfileId, profile);
												resetEditingBillingProfile();
											}}
											onCancelEditingBillingProfile={resetEditingBillingProfile}
											serverValidationErrors={billingProfileValidationErrors}
											countries={countries}
											statesByCountryId={statesByCountryId}
											onSelectedCountryChanged={handleCountryChanged}
											usageInfo={usageInfo}
											addressFormatItems={addressFormatItems}
											isCalledPreorder={isCalledPreorder}
											saveForLater={saveForLater}
											onDelete={onDeleteBillingProfile}
										/>
									)}
								</Fragment>
						  ))
						: null}
					{billingProfiles && billingProfiles.length > 3 && !showAllPaymentMethods && (
						<Styled.CreditCardRow>
							<Button
								variant="primaryTransparent"
								width="100%"
								onClick={() => setShowAllPaymentMethods(true)}
							>
								{strings.showAllPaymentMethods}
							</Button>
						</Styled.CreditCardRow>
					)}
				</Styled.BillingProfiles>
			</Styled.BillingProfilesSection>
		</Styled.BillingProfilesContainer>
	);
};

export default BillingProfiles;
