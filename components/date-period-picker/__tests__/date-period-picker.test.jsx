import React from 'react';
import * as dateFunctions from 'date-fns';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { DatePeriodPicker } from '../';

describe('DatePeriodPicker', () => {
	it('should allow selecting period', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		const now = new Date();
		render(
			<DatePeriodPicker
				selectedDateRange={null}
				setSelectedDate={callback}
				dateFunctions={dateFunctions}
				validate={date => date >= new Date(1970, 0, 1)}
				parseDate={dateFunctions.parse}
				datePeriods={[
					{
						displayName: 'Last 7 Days',
						dateRange: { start: dateFunctions.addDays(now, -7), end: now },
					},
					{
						displayName: 'Last 30 Days',
						dateRange: { start: dateFunctions.addDays(now, -30), end: now },
					},
					{
						displayName: 'Last 90 Days',
						dateRange: { start: dateFunctions.addDays(now, -90), end: now },
					},
				]}
			/>,
		);

		userEvent.click(screen.getByText('Last 7 Days'));

		expect(callback).toHaveBeenCalledWith({ start: dateFunctions.addDays(now, -7), end: now }, 0);
	});

	// TODO make aXe compliant
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const now = new Date();
		const { container } = render(
			<DatePeriodPicker
				selectedDateRange={null}
				setSelectedDate={() => {}}
				dateFunctions={dateFunctions}
				validate={date => date >= new Date(1970, 0, 1)}
				parseDate={dateFunctions.parse}
				datePeriods={[
					{
						displayName: 'Last 7 Days',
						dateRange: { start: dateFunctions.addDays(now, -7), end: now },
					},
					{
						displayName: 'Last 30 Days',
						dateRange: { start: dateFunctions.addDays(now, -30), end: now },
					},
					{
						displayName: 'Last 90 Days',
						dateRange: { start: dateFunctions.addDays(now, -90), end: now },
					},
				]}
			/>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
