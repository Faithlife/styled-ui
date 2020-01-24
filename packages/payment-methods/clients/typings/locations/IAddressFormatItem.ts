import AddressFieldKind from './AddressFieldKind';

export default interface IAddressFormatItem {
	name: string;
	kind: AddressFieldKind;
	format: string;
	isOptional: boolean;
}
