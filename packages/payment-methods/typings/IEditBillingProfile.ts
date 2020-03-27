import IEditCardInfo from './IEditCardInfo';
import IUsageInfo from './IUsageInfo';

export default interface IEditBillingProfile {
	profileId?: string;
	addressLine1: string | null;
	addressLine2: string | null;
	cardInfo: IEditCardInfo;
	city: string | null;
	stateId: string | null;
	suburb?: string;
	countryId: string | null;
	isDefault: boolean;
	makeDefault?: boolean;
	useOnPendingPrepubs?: boolean;
	useOnActiveSubscriptions?: boolean;
	useOnOutstandingPaymentPlans?: boolean;
	usageInfo: IUsageInfo;
}
