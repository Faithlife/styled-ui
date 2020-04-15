export default interface IOrdersBillingProfileChangeSetDto {
	nameOnCard: string;
	expirationMonth: number;
	expirationYear: number;
	address1: string;
	address2: string;
	address3?: string;
	address4?: string;
	city: string;
	countryId: string;
	postalCode: string;
	stateId: string;
	suburb?: string;
	county?: string;
	makeDefault?: boolean;
	useOnPendingPrepubs?: boolean;
	useOnActiveSubscriptions?: boolean;
	useOnOutstandingPaymentPlans?: boolean;
	useOnActiveBids?: boolean;
}
