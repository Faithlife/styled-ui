import ICreateCreditCardDto from './ICreateCreditCardDto';

export default interface ICreateBillingProfileDto {
	address1: string;
	address2: string;
	city: string;
	countryId: string;
	creditCard?: ICreateCreditCardDto;
	eCheck?: any;
	kind: string;
	nameOnCard: string;
	postalCode: string;
	stateId: string;
	userId: string;
}
