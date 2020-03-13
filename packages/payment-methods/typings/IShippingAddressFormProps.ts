import { ISystemMessage } from './ISystemMessage';
import IEditBillingProfile from './IEditBillingProfile';

export default interface IShippingAddressFormProps {
	setSystemMessage: (systemMessage: ISystemMessage) => void;
	actAndHandleException: <T>(
		action: () => Promise<T>,
		actionDescription: string
	) => Promise<T | undefined>;
	billingProfile?: IEditBillingProfile;
	onCommitClicked: Function;
}
