import { fetchJson } from './request';
import {
	IBillingProfilesDto,
	IBillingProfileDto,
	ICreateOrdersBillingProfileDto,
	ErrorMapper,
	IBillingProfileChangeSetDto,
} from './typings/orders';
import IErrors from './typings/orders/IErrors';
import { isErrorsDto } from './typings/orders/IErrorsDto';

export default class OrdersClient {
	static async getBillingProfiles(): Promise<IBillingProfilesDto> {
		const response = await fetchJson('/proxy/orders/v3/billingprofiles/payfac', {
			method: 'GET',
			query: { fields: '*' },
		});

		return response;
	}

	static async getBillingProfile(id: string): Promise<IBillingProfileDto> {
		const response = await fetchJson(`/proxy/orders/v3/billingprofiles/${id}`, {
			method: 'GET',
		});

		return response;
	}

	static async createOrdersBillingProfile(
		createBillingProfileDto: ICreateOrdersBillingProfileDto
	): Promise<IBillingProfileDto | IErrors> {
		try {
			const response: IBillingProfileDto = await fetchJson(`/proxy/orders/v3/billingprofiles`, {
				method: 'POST',
				body: JSON.stringify(createBillingProfileDto),
			});

			return response;
		} catch (e) {
			if (isErrorsDto(e)) {
				return ErrorMapper.mapErrors(e);
			} else if (e.response.status === 409) {
				return { errors: [{ code: '409' }] };
			}
			throw e;
		}
	}

	static async updateOrdersBillingProfile(
		billingProfileId: string,
		billingProfileChangeSet: IBillingProfileChangeSetDto
	): Promise<IBillingProfileDto | IErrors> {
		try {
			const response: IBillingProfileDto = await fetchJson(
				`/proxy/orders/v3/billingprofiles/${billingProfileId}`,
				{
					method: 'PATCH',
					body: JSON.stringify(billingProfileChangeSet),
				}
			);
			return response;
		} catch (e) {
			if (isErrorsDto(e)) {
				return ErrorMapper.mapErrors(e);
			} else if (e.response.status === 409) {
				return { errors: [{ code: '409' }] };
			}
			throw e;
		}
	}

	static async deleteOrdersBillingProfile(billingProfileId: string): Promise<void | IErrors> {
		try {
			await fetchJson(`/proxy/orders/v3/billingprofiles/${billingProfileId}`, {
				method: 'DELETE',
			});
		} catch (e) {
			if (e.response.status === 409) {
				return { errors: [{ code: '409' }] };
			}
			throw e;
		}
	}
}
