export default interface IEditCardInfo {
	nameOnCard?: string | null;
	cardNumber?: number | null;
	expiration?: string | null;
	securityCode?: number | null;
	postalCode?: string | null;
	provider?: string | null;
}
