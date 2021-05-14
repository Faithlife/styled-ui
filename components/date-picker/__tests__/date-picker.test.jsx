import React from 'react';
import * as dateFunctions from 'date-fns';
import { render, axe, screen, userEvent } from '../../../test-utils';

import { DatePicker } from '../';

describe('DatePicker', () => {
	it('should allow selecting date', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<DatePicker
				selectedDateRange={null}
				setSelectedDate={callback}
				dateFunctions={dateFunctions}
				validate={date => date >= new Date(1970, 0, 1)}
				parseDate={dateFunctions.parse}
			/>,
		);

		const firstOfMonth = dateFunctions.startOfMonth(new Date());
		userEvent.click(screen.getAllByText('1')[0]);
		expect(callback).toHaveBeenLastCalledWith(firstOfMonth);
	});

	// eslint-disable-next-line no-unsanitized/method
	it.each`
		first | last
		${1}  | ${1}
		${1}  | ${5}
		${2}  | ${20}
		${6}  | ${1}
	`('should allow selecting date range', ({ first, last }) => {
		expect.hasAssertions();

		const callback = jest.fn();
		const { rerender } = render(
			<DatePicker
				selectedDateRange={null}
				setSelectedDate={callback}
				dateFunctions={dateFunctions}
				validate={() => true}
				asDateRangePicker
			/>,
		);

		const firstOfMonth = dateFunctions.startOfMonth(new Date());
		const firstDayPick = dateFunctions.addDays(firstOfMonth, first - 1);
		const lastDayPick = dateFunctions.addDays(firstOfMonth, last - 1);

		userEvent.click(screen.getAllByText(first)[0]);
		expect(callback).toHaveBeenLastCalledWith({ start: firstDayPick });

		rerender(
			<DatePicker
				selectedDateRange={{ start: firstDayPick }}
				setSelectedDate={callback}
				dateFunctions={dateFunctions}
				validate={() => true}
				asDateRangePicker
			/>,
		);

		userEvent.click(screen.getAllByText(last)[0]);
		expect(callback).toHaveBeenLastCalledWith({
			start: dateFunctions.min([firstDayPick, lastDayPick]),
			end: dateFunctions.max([firstDayPick, lastDayPick]),
		});
	});

	// TODO make aXe compliant
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<DatePicker
				selectedDateRange={null}
				setSelectedDate={() => {}}
				dateFunctions={dateFunctions}
				validate={date => date >= new Date(1970, 0, 1)}
				parseDate={dateFunctions.parse}
			/>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
