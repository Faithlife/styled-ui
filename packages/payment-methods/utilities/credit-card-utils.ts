import CreditCardDetector from 'cleave.js/src/shortcuts/CreditCardDetector';
import IError from '../clients/typings/orders/IError';
import IStateDto from '../clients/typings/locations/IStateDto';
import { IBillingProfileDto } from '../clients/typings/orders';
import ICreditCardDto from '../clients/typings/orders/ICreditCardDto';
import nameof from './nameof';
import IEditBillingProfile from '../typings/IEditBillingProfile';
import IEditCardInfo from '../typings/IEditCardInfo';

// more-or-less from https://github.com/nosir/cleave.js/blob/f3e5d715109b9a51a36219d2751bb7b94734f066/src/shortcuts/CreditCardDetector.js#L21
const cardNumberPrefixByType = {
	amex: '3',
	diners: '3',
	discover: '6',
	instapayment: '6',
	mir: '22',
	uatp: '1',
	unionPay: '62',
	visa: '4',
};

export const formatMaskedCardNumber = (maskedCardNumber: string, provider: string) => {
	const maskCharacter = '•';
	const lowercaseProvider = provider.toLowerCase();

	if (Object.prototype.hasOwnProperty.call(CreditCardDetector.blocks, lowercaseProvider)) {
		let cardNumberPrefix = '';
		if (Object.prototype.hasOwnProperty.call(cardNumberPrefixByType, lowercaseProvider)) {
			cardNumberPrefix = cardNumberPrefixByType[lowercaseProvider];
		}

		const blocks = CreditCardDetector.blocks[lowercaseProvider];

		const firstSegment = `${cardNumberPrefix}${maskCharacter.repeat(
			blocks[0] - cardNumberPrefix.length
		)}`;

		const middleSegments = [] as string[];
		for (const block of blocks.slice(1, -1)) {
			middleSegments.push(maskCharacter.repeat(block));
		}

		const lastSegment = `${maskCharacter.repeat(
			blocks.slice(-1) - maskedCardNumber.length
		)} ${maskedCardNumber}`;

		// regular spaces don't get rendered
		const enspace = ' ';
		return `${firstSegment}${enspace}${middleSegments.join(enspace)}${enspace}${lastSegment}`;
	}

	return `xxxxxxxxxxxx${maskedCardNumber}`;
};

export const areExpirationDatesValid = (expirationMonth, expirationYear) => {
	const now = new Date();
	const currentMonth = now.getMonth() + 1;
	const currentYear = parseInt(
		now
			.getFullYear()
			.toString()
			.slice(-2)
	);

	return (
		expirationYear > currentYear ||
		(expirationYear === currentYear && expirationMonth > currentMonth)
	);
};

export const normalizeExpiration = (expiration: string): string => {
	let normalizedExpiration = expiration.replace(/ /, '');

	if (normalizedExpiration.includes('/')) {
		const [expirationMonth, expirationYear] = normalizedExpiration.split('/');

		const exampleDate = '12/34';

		if (normalizedExpiration.length > exampleDate.length) {
			normalizedExpiration = `${expirationMonth}/${expirationYear.slice(-2)}`;
		}
	} else if (normalizedExpiration.length === '1234'.length) {
		normalizedExpiration = `${normalizedExpiration.slice(0, 2)}/${normalizedExpiration.slice(-2)}`;
	}

	return normalizedExpiration;
};

export const isExpirationValid = (expiration: string) => {
	const normalizedExpiration = normalizeExpiration(expiration);

	const [expirationMonth, expirationYear] = normalizedExpiration.split('/');

	return areExpirationDatesValid(expirationMonth, expirationYear);
};

const editPropertyByOrdersProperty = {
	[nameof<IBillingProfileDto>('address1')]: nameof<IEditBillingProfile>('addressLine1'),
	[nameof<IBillingProfileDto>('address2')]: nameof<IEditBillingProfile>('addressLine2'),
	[nameof<IBillingProfileDto>('city')]: nameof<IEditBillingProfile>('city'),
	[nameof<IBillingProfileDto>('countryId')]: nameof<IEditBillingProfile>('countryId'),
	[nameof<IBillingProfileDto>('stateId')]: nameof<IEditBillingProfile>('stateId'),
	[nameof<IBillingProfileDto>('nameOnCard')]: nameof<IEditCardInfo>('nameOnCard'),
	[nameof<IBillingProfileDto>('postalCode')]: nameof<IEditCardInfo>('postalCode'),
	[nameof<ICreditCardDto>('expirationYear')]: nameof<IEditCardInfo>('expiration'),
};

export const mapOrdersPropertyToEditProperty = (error: IError): IError => {
	return {
		code: error.code,
		message: error.message,
		property: editPropertyByOrdersProperty[error.property as string],
	};
};

export const validateBillingProfile = (
	isEditingExistingProfile: boolean,
	uncommittedBillingProfile: IEditBillingProfile,
	statesByCountryId: Record<string, IStateDto[]>
): IError[] => {
	const errors: IError[] = validateSimpleMissingValues(uncommittedBillingProfile, [
		'nameOnCard',
		'expiration',
		'countryId',
		'addressLine1',
		'city',
		'postalCode',
	]);

	if (
		!isEditingExistingProfile &&
		(uncommittedBillingProfile.cardInfo.cardNumber === null ||
			(uncommittedBillingProfile.cardInfo.cardNumber as number).toString().trim().length < 15)
	) {
		errors.push(missingValue('cardNumber'));
	}

	if (
		!isEditingExistingProfile &&
		(uncommittedBillingProfile.cardInfo.securityCode === null ||
			(uncommittedBillingProfile.cardInfo.securityCode as number).toString().trim().length < 3)
	) {
		errors.push(missingValue('securityCode'));
	}

	if (
		!isNullOrWhitespace(uncommittedBillingProfile.countryId as string) &&
		isNullOrWhitespace(uncommittedBillingProfile.stateId as string) &&
		Object.prototype.hasOwnProperty.call(
			statesByCountryId,
			uncommittedBillingProfile.countryId as string
		) &&
		statesByCountryId[uncommittedBillingProfile.countryId as string].length > 0
	) {
		errors.push(missingValue('stateId'));
	}

	if (
		!isNullOrWhitespace(uncommittedBillingProfile.cardInfo.nameOnCard as string) &&
		(uncommittedBillingProfile.cardInfo.nameOnCard as string).match(potentialCardNumberPattern) !==
			null
	) {
		errors.push(badValue('nameOnCard', 'Name on card cannot be a credit card number'));
	}

	if (
		!isNullOrWhitespace(uncommittedBillingProfile.city as string) &&
		(uncommittedBillingProfile.city as string).match(potentialCardNumberPattern) !== null
	) {
		errors.push(badValue('city', 'City cannot be a credit card number'));
	}

	return errors;
};

// from https://git.faithlife.dev/Logos/Hermes/blob/d9ef2bde608f4514209753e7ace4377af4bbecdf/src/Hermes.Utility/CreditCardUtility.cs#L30
const potentialCardNumberPattern = /(?:18|60|[34]\d|5[1-5]|2[0-1]|86)(?:\d[\W_]?){8,11}\d{3}/gi;

const isNullOrWhitespace = (s: string): boolean => s === null || s.trim() === '';

const validateSimpleMissingValues = (
	profile: IEditBillingProfile,
	properties: (keyof IEditBillingProfile | keyof IEditCardInfo)[]
): IError[] => {
	const errors = [] as any;
	for (const property of properties) {
		let value = '';
		if (Object.prototype.hasOwnProperty.call(profile, property)) {
			value = profile[property];
		} else if (Object.prototype.hasOwnProperty.call(profile, property)) {
			value = profile.cardInfo[property];
		}
		if (isNullOrWhitespace(value)) {
			errors.push(missingValue(property));
		}
	}
	return errors;
};

const missingValue = (property: keyof IEditBillingProfile | keyof IEditCardInfo) => ({
	code: 'MissingValue',
	property,
});

const badValue = (property: keyof IEditBillingProfile | keyof IEditCardInfo, message: string) => ({
	code: 'BadValue',
	property,
	message,
});
