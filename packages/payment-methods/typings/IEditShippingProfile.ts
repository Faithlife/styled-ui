export default interface IEditShippingProfile {
	name: string | null;
	organization: string | null;
	addressLine1: string | null;
	addressLine2: string | null;
	city: string | null;
	stateId: string | null;
	suburb?: string;
	postalCode: string | null;
	countryId: string | null;
}
