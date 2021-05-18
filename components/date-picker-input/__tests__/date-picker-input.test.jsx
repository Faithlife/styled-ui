import React from 'react';
import * as dateFunctions from 'date-fns';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { DatePickerInput } from '../';

describe('DatePeriodPicker', () => {
	it('should parse user input', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		const parseUserDateString = jest.fn(input =>
			input === 'March 14' ? new Date('03-14-2021') : new Date('01-01-2021'),
		);
		const now = new Date('08-26-2021');
		render(
			<DatePickerInput
				defaultSelectedDate={now}
				onChange={callback}
				dateFunctions={dateFunctions}
				parseUserDateString={parseUserDateString}
				validate={() => true}
			/>,
		);

		userEvent.type(screen.getByDisplayValue('August 26'), 'March 14');

		expect(parseUserDateString).toHaveBeenLastCalledWith('March 14');
		expect(callback).toHaveBeenLastCalledWith(new Date('03-14-2021'));
	});

	// TODO: upgrade react version `It looks like you're using a version of react-dom that supports the "act" function, but not an awaitable version of "act" which you will need. Please upgrade to at least react-dom@16.9.0 to remove this warning.`
	it.skip('shows date picker popup', () => {
		expect.hasAssertions();

		const now = new Date();
		render(
			<DatePickerInput
				defaultSelectedDate={now}
				onChange={() => {}}
				dateFunctions={dateFunctions}
				parseUserDateString={() => {}}
				validate={() => true}
			/>,
		);

		userEvent.click(screen.getByLabelText('Show calendar picker'));
		expect(screen.findByText(dateFunctions.format(now, 'MMMM yyyy')));
	});

	// TODO make aXe compliant
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<DatePickerInput
				defaultSelectedDate={new Date()}
				onChange={() => {}}
				dateFunctions={dateFunctions}
				parseUserDateString={() => {}}
				validate={() => true}
			/>,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
