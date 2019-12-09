import IErrors from './IErrors';
import IErrorsDto from './IErrorsDto';
import IError from './IError';
import IErrorDto from './IErrorDto';

export default class ErrorMapper {
	public static mapErrors(errors: IErrorsDto): IErrors {
		return { errors: errors.errors.map(ErrorMapper.mapError) };
	}

	public static mapError(error: IErrorDto): IError {
		return {
			code: error.errorCode,
			property: error.property,
		};
	}
}
