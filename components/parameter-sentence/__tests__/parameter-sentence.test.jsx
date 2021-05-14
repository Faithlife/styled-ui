import React from 'react';
import { render, axe, userEvent, screen } from '../../../test-utils';

import { ParameterSentence } from '../';

const scheduleOptions = {
	weekly: 'weekly',
	biweekly: 'biweekly',
	twiceMonthly: 'twice-monthly',
	monthly: 'monthly',
	quarterly: 'quarterly',
	annual: 'annual',
};

describe('ParameterSentence', () => {
	it('and its children are truthy', () => {
		expect.hasAssertions();

		expect(ParameterSentence).toBeTruthy();
		expect(ParameterSentence.Input).toBeTruthy();
		expect(ParameterSentence.Select).toBeTruthy();
	});

	it('s Input is interact-able', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<ParameterSentence accessibilityFormLabel="Tithe Calculator">
				<ParameterSentence.Input
					defaultValue="10"
					value={''}
					onChange={event => callback(event.target.value)}
					// formatValue={val => `${val}%`}
					width="30px"
					accessibilityLabel={'Percent of income to tithe'}
				/>
			</ParameterSentence>,
		);

		const input = screen.getByRole('textbox');
		userEvent.paste(input, '10');
		expect(callback).toHaveBeenLastCalledWith('10');
	});

	it('s Input shows formatted text', () => {
		expect.hasAssertions();

		const callback = jest.fn(val => `${val}%`);
		render(
			<ParameterSentence accessibilityFormLabel="Tithe Calculator">
				<ParameterSentence.Input
					defaultValue="10"
					value={''}
					onChange={() => {}}
					formatValue={callback}
					width="30px"
					accessibilityLabel={'Percent of income to tithe'}
				/>
			</ParameterSentence>,
		);

		expect(callback).toHaveBeenLastCalledWith('10');
		expect(screen.getByRole('textbox')).toHaveValue('10%');
	});

	it('s Select is interact-able', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<ParameterSentence accessibilityFormLabel="Tithe Calculator">
				<ParameterSentence.Select
					selectedId={'annual'}
					onItemSelect={callback}
					options={scheduleOptions}
					accessibilityLabel={'Pay schedule of income'}
				/>
			</ParameterSentence>,
		);

		userEvent.click(screen.getByText('annual'));
		userEvent.click(screen.getByText('monthly'));

		expect(callback).toHaveBeenCalledWith('monthly');
	});

	// TODO: make aXe compliant
	it.skip('should be aXe compliant', async () => {
		expect.hasAssertions();

		const { container } = render(
			<ParameterSentence accessibilityFormLabel="Tithe Calculator">
				{'I want to give '}
				<ParameterSentence.Input
					defaultValue="10"
					value={'10'}
					onChange={event => {}}
					formatValue={val => `${val}%`}
					width="30px"
					accessibilityLabel={'Percent of income to tithe'}
				/>
				{' of my '}
				<ParameterSentence.Select
					selectedId={'annual'}
					onItemSelect={() => {}}
					options={scheduleOptions}
					accessibilityLabel={'Pay schedule of income'}
				/>
				{' income'}
			</ParameterSentence>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
