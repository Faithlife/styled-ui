import React, { useState, useMemo, useEffect } from 'react';
import { components } from 'react-select';
import { Select } from '@faithlife/styled-ui/dist/text-input-v2';
import * as Styled from './styled';
import IEditBillingProfile from '../../typings/IEditBillingProfile';
import { useLocalization } from '../../Localization';
import nameof from '../../utilities/nameof';
import ISelectOption from '../../typings/ISelectOption';
import IError from '../../clients/typings/orders/IError';
import ICountryDto from '../../clients/typings/locations/ICountryDto';
import IStateDto from '../../clients/typings/locations/IStateDto';
import IAddressFormatItem from '../../clients/typings/locations/IAddressFormatItem';
import IEditCardInfo from '../../typings/IEditCardInfo';

interface IAddressFormProps {
	billingProfile?: IEditBillingProfile;
	uncommittedBillingProfile: IEditBillingProfile;
	serverValidationErrors: IError[];
	countries: ICountryDto[];
	statesByCountryId: Record<string, IStateDto[]>;
	onSelectedCountryChanged: Function;
	updateBillingProfile: Function;
	updatePostalCode: Function;
	addressFormatItems: IAddressFormatItem[];
	defaultCountryOption: any;
	isValidField: Function;
	errorByFieldName: any;
}

const AddressForm: React.FunctionComponent<IAddressFormProps> = ({
	billingProfile,
	uncommittedBillingProfile,
	serverValidationErrors,
	countries,
	statesByCountryId,
	onSelectedCountryChanged,
	updateBillingProfile,
	updatePostalCode,
	addressFormatItems,
	defaultCountryOption,
	isValidField,
	errorByFieldName,
}) => {
	const strings = useLocalization();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [shouldCloseStateSelect, setShouldCloseStateSelect] = useState<boolean>(false);

	const initialCountryOption =
		billingProfile &&
		countries &&
		countries
			.map(country => ({ label: country.name, value: country.countryId }))
			.find(country => country.value === billingProfile.countryId);

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

	useEffect(() => {
		if (shouldCloseStateSelect) {
			setShouldCloseStateSelect(false);
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

	const getUncommittedBillingProfileValueOrDefault = (propertyName: keyof IEditBillingProfile) => {
		return (uncommittedBillingProfile && uncommittedBillingProfile[propertyName]) || '';
	};

	const getUncommittedCardInfoValueOrDefault = (propertyName: keyof IEditCardInfo) => {
		return (
			(uncommittedBillingProfile &&
				uncommittedBillingProfile.cardInfo &&
				uncommittedBillingProfile.cardInfo[propertyName]) ||
			''
		);
	};

	return (
		<Styled.BillingAddressInfoSection>
			<Styled.CreditCardInfoRow data-testid="country-selector-container">
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
						defaultValue={initialCountryOption || defaultCountryOption}
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
						data-testid="address1"
						onChange={updateBillingProfile}
						value={getUncommittedBillingProfileValueOrDefault('addressLine1')}
						border={'1px solid #a8a8a8'}
					/>
				</Styled.Label>
			</Styled.CreditCardInfoRow>
			<Styled.CreditCardInfoRow>
				<Styled.Input
					name={nameof<IEditBillingProfile>('addressLine2')}
					autoComplete="address-line2"
					isValid={isValidField('addressLine2')}
					data-testid="address2"
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
							autoComplete="city"
							placeholder={strings.city}
							isValid={isValidField('city')}
							data-testid="city"
							onChange={updateBillingProfile}
							value={getUncommittedBillingProfileValueOrDefault('city')}
							border={'1px solid #a8a8a8'}
						/>
					</Styled.Label>
				</Styled.CityContainer>
				{useStateSelector ? (
					<Styled.StateContainer data-testid="state-selector-container">
						<Styled.Label>
							<Styled.LabelText>{strings[toCamelCase(stateAddressFormat.name)]}</Styled.LabelText>
							<Select
								name={nameof<IEditBillingProfile>('stateId')}
								components={{
									Input: StateInput,
								}}
								placeholder="—"
								menuIsOpen={isMenuOpen}
								data-testid="state"
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
								<Styled.LabelText>{strings[toCamelCase(stateAddressFormat.name)]}</Styled.LabelText>
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
								data-testid="postal-code"
								placeholder={strings.placeholders.postalCode}
								onChange={updatePostalCode}
								options={{ blocks: [10] }}
								value={getUncommittedCardInfoValueOrDefault('postalCode')}
							/>
						</Styled.Label>
					</Styled.PostalCodeContainer>
				)}
			</Styled.CityStateInfoRow>
		</Styled.BillingAddressInfoSection>
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
		input: base => ({ ...base, input: { margin: '0 !important' } }),
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

export default AddressForm;
