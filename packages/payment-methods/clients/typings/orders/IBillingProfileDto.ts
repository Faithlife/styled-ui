import ICardInfoDto from './ICardInfoDto';
import IUsageInfoDto from './UsageInfoDto';

export default interface IBillingProfileDto {
	profileId: string;
	cardInfo: ICardInfoDto;
	eCheckInfo: {
		maskedAccountNumber: string;
	};
	isDefault: boolean;
	isExpired: boolean;
	nameOnCard: string;
	organization: string;
	address1: string;
	address2: string;
	address3: string;
	address4: string;
	city: string;
	suburb?: string;
	county?: string;
	postalCode: string;
	countryId: number;
	countryDisplay: string;
	stateId: number;
	stateDisplay: string;
	type: string;
	usageInfo: IUsageInfoDto;
}
