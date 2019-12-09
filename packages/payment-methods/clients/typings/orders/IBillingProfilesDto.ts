import IBillingProfileDto from './IBillingProfileDto';
import IUsageInfoDto from './UsageInfoDto';

export default interface IBillingProfilesDto {
	billingProfiles: IBillingProfileDto[];
	usageInfo: IUsageInfoDto;
}
