import IAddressFormatItem from './IAddressFormatItem';
import IAddressFormatItemDto from './IAddressFormatItemDto';
import AddressFieldKind from './AddressFieldKind';

export default class AddressFormatMapper {
	public static mapAddressFormatItems(formatItems: IAddressFormatItemDto[]): IAddressFormatItem[] {
		return formatItems.map(item => this.mapAddressFormaItem(item));
	}

	private static mapAddressFormaItem(item: IAddressFormatItemDto): IAddressFormatItem {
		// LocationsApi returns an AddressFormatItem whose kind and name appear to be inverted. We swap them here to help them be semantically correct
		return {
			name: item.kind,
			kind: this.mapAddressFieldKind(item.name),
			format: item.format,
			isOptional: item.name === 'PostalCode' ? false : item.isOptional,
		};
	}

	private static mapAddressFieldKind(kind: string) {
		switch (kind) {
			case AddressFieldKind.Address1:
				return AddressFieldKind.Address1;
			case AddressFieldKind.Address2:
				return AddressFieldKind.Address2;
			case AddressFieldKind.Address3:
				return AddressFieldKind.Address3;
			case AddressFieldKind.City:
				return AddressFieldKind.City;
			case AddressFieldKind.Suburb:
				return AddressFieldKind.Suburb;
			case AddressFieldKind.PostalCode:
				return AddressFieldKind.PostalCode;
			case AddressFieldKind.State:
				return AddressFieldKind.State;
			default:
				throw new Error('Address field kind out of range');
		}
	}
}
