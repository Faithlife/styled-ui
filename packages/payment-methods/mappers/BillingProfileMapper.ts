import {
	IBillingProfileChangeSetDto,
	IBillingProfileDto,
	ICreateOrdersBillingProfileDto,
} from '../clients/typings/orders';
import IEditBillingProfile from '../typings/IEditBillingProfile';

export default class BillingProfileMapper {
	public static mapForCreatingInOrdersApi(
		profile: IEditBillingProfile
	): ICreateOrdersBillingProfileDto {
		const {
			nameOnCard,
			cardNumber,
			expiration,
			postalCode,
			addressLine1: address1,
			addressLine2: address2,
			city,
			stateId,
			countryId,
			makeDefault,
			useOnPendingPrepubs,
			useOnActiveSubscriptions,
			useOnOutstandingPaymentPlans,
		} = {
			...profile,
			...profile.cardInfo,
		};
		const exp = (expiration || '').split(' ').join('');
		const [expirationMonth, expirationYear] = exp.split('/');

		const ordersBillingProfile: ICreateOrdersBillingProfileDto = {
			address1: address1 || '',
			address2: address2 || '',
			city: city || '',
			stateId: stateId || '',
			countryId: countryId || '',
			cardInfo: {
				expirationMonth: parseInt(expirationMonth),
				expirationYear: parseInt(
					new Date()
						.getFullYear()
						.toString()
						.substr(0, 2) + expirationYear
				),
				creditCardNumber: (cardNumber || '').toString(),
			},
			nameOnCard: nameOnCard || '',
			postalCode: postalCode || '',
			// TODO: pass these in
			makeDefault: makeDefault || false,
			useOnPendingPrepubs: useOnPendingPrepubs || false,
			useOnActiveSubscriptions: useOnActiveSubscriptions || false,
			useOnOutstandingPaymentPlans: useOnOutstandingPaymentPlans || false,
		};

		return ordersBillingProfile;
	}

	public static mapForEditing(profile: IBillingProfileDto): IEditBillingProfile {
		const expirationMonth = '0' + profile.cardInfo.expirationMonth.toString().slice(-2);
		const expirationYear = profile.cardInfo.expirationYear.toString().slice(-2);

		return {
			addressLine1: profile.address1,
			addressLine2: profile.address2,
			cardInfo: {
				cardNumber: parseInt(profile.cardInfo.creditCardNumber),
				expiration: `${expirationMonth}${expirationYear}`,
				nameOnCard: profile.nameOnCard,
				postalCode: profile.postalCode,
				securityCode: null,
				provider: profile.cardInfo.creditCardProvider,
			},
			city: profile.city,
			countryId: profile.countryId.toString(),
			stateId: profile.stateId.toString(),
		};
	}

	public static mapForUpdating(profile: IEditBillingProfile): IBillingProfileChangeSetDto {
		const sanitizedExpiration = (profile.cardInfo.expiration || '').replace(/ \//g, '');

		return {
			address1: profile.addressLine1 || '',
			address2: profile.addressLine2 || '',
			address3: undefined,
			address4: undefined,
			city: profile.city || '',
			countryId: profile.countryId || '',
			expirationMonth: parseInt(sanitizedExpiration.slice(0, 2)),
			expirationYear: parseInt(
				new Date()
					.getFullYear()
					.toString()
					.substr(0, 2) + sanitizedExpiration.slice(-2)
			),
			nameOnCard: profile.cardInfo.nameOnCard || '',
			postalCode: profile.cardInfo.postalCode || '',
			stateId: profile.stateId || '',
			suburb: '',
		};
	}
}
