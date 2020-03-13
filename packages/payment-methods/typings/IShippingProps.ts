import { ISystemMessage } from './ISystemMessage';
import ILocalizedResources from './ILocalizedResources';
import IEditBillingProfile from './IEditBillingProfile';

export default interface IShippingProps {
	setSystemMessage: (systemMessage: ISystemMessage) => void;
	localizedResources: ILocalizedResources;
	actAndHandleException: <T>(
		action: () => Promise<T>,
		actionDescription: string
	) => Promise<T | undefined>;
	onCommitClicked: Function;
	billingProfile?: IEditBillingProfile;
}
