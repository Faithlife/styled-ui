export default interface ICreditCardDto {
	creditCardProvider: string;
	expirationMonth: number;
	expirationYear: number;
	maskedCreditCardNumber: string;
}
