export default interface ICreateCreditCardDto {
	expirationMonth: number;
	expirationYear: number;
	maskedCreditCardNumber: string;
	tokenRegistrationId: string;
}
