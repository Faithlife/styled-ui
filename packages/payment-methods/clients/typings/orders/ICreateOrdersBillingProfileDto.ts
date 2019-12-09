import ICreateCardInfoDto from './ICreateCardInfoDto';

export default interface ICreateOrdersBillingProfileDto {
	cardInfo?: ICreateCardInfoDto;
	nameOnCard: string;
	address1: string;
	address2: string;
	city: string;
	postalCode: string;
	countryId: string;
	stateId: string;
	makeDefault: boolean;
	useOnPendingPrepubs: boolean;
	useOnActiveSubscriptions: boolean;
	useOnOutstandingPaymentPlans: boolean;
}
