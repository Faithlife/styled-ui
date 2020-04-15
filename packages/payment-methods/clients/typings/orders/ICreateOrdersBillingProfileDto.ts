import ICreateCardInfoDto from './ICreateCardInfoDto';

export default interface ICreateOrdersBillingProfileDto {
	cardInfo?: ICreateCardInfoDto;
	nameOnCard: string;
	address1: string;
	address2: string;
	city: string;
	suburb?: string;
	stateId: string;
	postalCode: string;
	countryId: string;
	makeDefault: boolean;
	useOnPendingPrepubs: boolean;
	useOnActiveSubscriptions: boolean;
	useOnOutstandingPaymentPlans: boolean;
	useOnActiveBids: boolean;
}
