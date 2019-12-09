import { IBillingProfileDto } from '../clients/typings/orders';

export default interface IBillingProfileInfo {
	billingProfileDto: IBillingProfileDto;
	countryAlpha2: string;
}
