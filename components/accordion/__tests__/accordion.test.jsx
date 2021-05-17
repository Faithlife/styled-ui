import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Accordion } from '../';

describe('accordion', () => {
	it.each`
		expandedSections | clickedSection         | expectedExpandedSections
		${[]}            | ${/Section One Title/} | ${[0]}
		${[0]}           | ${/Section One Title/} | ${[]}
		${[0, 1, 2]}     | ${/Section Two Title/} | ${[0, 2]}
		${[0, 2]}        | ${/Section Two Title/} | ${[0, 2, 1]}
		${[0, 2, 1]}     | ${/Section Two Title/} | ${[0, 2]}
	`(
		'should allow (un)expanding sections',
		({ expandedSections, clickedSection, expectedExpandedSections }) => {
			expect.hasAssertions();

			const onExpansion = jest.fn();
			render(
				<Accordion expandedSections={expandedSections} onExpansion={onExpansion}>
					<Accordion.Item>
						<Accordion.Header>Section One Title</Accordion.Header>
						<Accordion.Panel>{'Section 1 Text'}</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Section Two Title</Accordion.Header>
						<Accordion.Panel>{'Section 2 Text'}</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Section Three Title</Accordion.Header>
						<Accordion.Panel>{'Section 3 Text'}</Accordion.Panel>
					</Accordion.Item>
				</Accordion>,
			);
			for (const section of [0, 1, 2]) {
				if (expandedSections.includes(section)) {
					expect(screen.queryByText(`Section ${section + 1} Text`)).toBeVisible();
				} else {
					expect(screen.queryByText(`Section ${section + 1} Text`)).not.toBeVisible();
				}
			}

			userEvent.click(screen.getByText(clickedSection));
			expect(onExpansion).toHaveBeenCalledWith(expectedExpandedSections);
		},
	);

	// TODO fix aria aXe violations.
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Accordion expandedSections={[0, 1]} onExpansion={() => {}}>
				<Accordion.Item>
					<Accordion.Header>Section One Title</Accordion.Header>
					<Accordion.Panel>{'Section 1 Text'}</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item>
					<Accordion.Header>Section Two Title</Accordion.Header>
					<Accordion.Panel>{'Section 2 Text'}</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item>
					<Accordion.Header>Section Three Title</Accordion.Header>
					<Accordion.Panel>{'Section 3 Text'}</Accordion.Panel>
				</Accordion.Item>
			</Accordion>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
