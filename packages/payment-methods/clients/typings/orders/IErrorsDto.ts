import IErrorDto from './IErrorDto';

export default interface IErrorsDto {
	errors: IErrorDto[];
}

export const isErrorsDto = (response: any): response is IErrorsDto => {
	return (response as IErrorsDto).errors !== undefined;
};
