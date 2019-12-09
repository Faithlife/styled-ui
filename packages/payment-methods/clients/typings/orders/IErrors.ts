import IError from './IError';

export default interface IErrors {
	errors: IError[];
}

export const isErrors = (response: any): response is IErrors => {
	return (response as IErrors).errors !== undefined;
};
