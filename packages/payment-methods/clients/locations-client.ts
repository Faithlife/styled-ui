import { fetchJson } from './request';
import ICountryDto from './typings/locations/ICountryDto';
import ICountriesDto from './typings/locations/ICountriesDto';
import IStatesDto from './typings/locations/IStatesDto';
import IStateDto from './typings/locations/IStateDto';
import IAddressFormatItem from './typings/locations/IAddressFormatItem';
import AddressFormatMapper from './typings/locations/AddressFormatMapper';

export default class LocationsClient {
	public static async getCountries(): Promise<ICountryDto[]> {
		const countries: ICountriesDto = await fetchJson('/proxy/locations/v1/countries');
		return countries.countries;
	}

	public static async getStatesForCountry(countryId: string): Promise<IStateDto[]> {
		const states: IStatesDto = await fetchJson(`/proxy/locations/v1/countries/${countryId}/states`);
		return states.states;
	}

	public static async getAddressFormatForCountry(countryId: string): Promise<IAddressFormatItem[]> {
		const addressFormatItems: any = await fetchJson(
			`/proxy/locations/v1/addresses/${countryId}/format`
		);
		return AddressFormatMapper.mapAddressFormatItems(addressFormatItems.orderedAddressFormatItems);
	}
}
