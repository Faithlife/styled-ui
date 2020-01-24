import IEditCardInfo from './IEditCardInfo';

export default interface IEditBillingProfile {
	addressLine1: string | null;
	addressLine2: string | null;
	cardInfo: IEditCardInfo;
	city: string | null;
	stateId: string | null;
	suburb?: string;
	countryId: string | null;
	makeDefault?: boolean;
	useOnPendingPrepubs?: boolean;
	useOnActiveSubscriptions?: boolean;
	useOnOutstandingPaymentPlans?: boolean;
}
