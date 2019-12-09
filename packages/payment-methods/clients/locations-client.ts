import { fetchJson } from './request';
import ICountryDto from './typings/locations/ICountryDto';
import ICountriesDto from './typings/locations/ICountriesDto';
import IStatesDto from './typings/locations/IStatesDto';
import IStateDto from './typings/locations/IStateDto';

export default class LocationsClient {
	public static async getCountries(): Promise<ICountryDto[]> {
		const countries: ICountriesDto = await fetchJson('/proxy/locations/v1/countries');
		return countries.countries;
	}

	public static async getStatesForCountry(countryId: string): Promise<IStateDto[]> {
		const states: IStatesDto = await fetchJson(`/proxy/locations/v1/countries/${countryId}/states`);
		return states.states;
	}
}
