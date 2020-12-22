/* globals describe, it, expect */
import React from 'react';
import styled from 'styled-components';
import { render } from 'enzyme';
import { Accordion } from '../';
import { Input } from '../../input';
import { Checkbox } from '../../check-box';
import { Switch } from '../../Switch';

const Form = styled.form`
	display: inline-grid;
	grid-auto-flow: row;
	grid-row-gap: 12px;
`;

describe('Accordion', () => {
	describe('snapshots', () => {
		it('renders with arrows', () => {
			const tree = render(
				<Accordion expandedSections={[0]} onExpansion={expandedSections => true}>
					<Accordion.Item pinned>
						<Accordion.Header subtitle="Subtitle for Section One.">
							Section One Title
						</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Name" />
								<Input small placeholder="Email" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header subtitle="This is a pretty long subtitle with some descenders.">
							Section Two Title
						</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Home address" />
								<Input small placeholder="Zip code" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Section Three Title</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Mother's maiden name" />
								<Input small placeholder="Name of your first pet" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>,
			);

			expect(tree).toMatchSnapshot();
		});

		it('renders with `hideArrows` and custom indicators', () => {
			const tree = render(
				<Accordion hideArrows expandedSections={[0, 2]} onExpansion={expandedSections => true}>
					<Accordion.Item>
						<Accordion.Header
							renderCustomIndicator={({ isExpanded, onExpansion }) => (
								<Checkbox isChecked={isExpanded} onClick={onExpansion} tabIndex={-1} />
							)}
						>
							Section One Title
						</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Name" />
								<Input small placeholder="Email" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Section Two Title</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Home address" />
								<Input small placeholder="Zip code" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Section Three Title</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Mother's maiden name" />
								<Input small placeholder="Name of your first pet" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>,
			);

			expect(tree).toMatchSnapshot();
		});

		it('renders with subtitles', () => {
			const tree = render(
				<Accordion expandedSections={[]} onExpansion={expandedSections => true}>
					<Accordion.Item>
						<Accordion.Header subtitle="The first book of the Bible.">Genesis</Accordion.Header>
						<Accordion.Panel>
							<div>In the beginning, God created the heavens and the earth.</div>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header subtitle="The second book of the Bible.">Exodus</Accordion.Header>
						<Accordion.Panel>
							<div>
								And these are the names of the sons of Israel who came to Egypt; with Jacob, they
								each came with his ⌊family⌋:
							</div>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header subtitle="The third book of the Bible.">Leviticus</Accordion.Header>
						<Accordion.Panel>
							<div>
								Then Yahweh called to Moses and spoke to him from the tent of assembly, saying,
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>,
			);

			expect(tree).toMatchSnapshot();
		});

		it('renders with the "minimal" variant', () => {
			const tree = render(
				<Accordion variant="minimal" expandedSections={[0]} onExpansion={expandedSections => true}>
					<Accordion.Item pinned>
						<Accordion.Header subtitle="Subtitle for Section One.">
							Section One Title
						</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Name" />
								<Input small placeholder="Email" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Section Two Title</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Home address" />
								<Input small placeholder="Zip code" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header
							subtitle="This is a really long subtitle for the section with a switch indicator."
							renderCustomIndicator={({ isExpanded, onExpansion }) => (
								<Switch isChecked={isExpanded} onClick={onExpansion} />
							)}
						>
							Section Three Title
						</Accordion.Header>
						<Accordion.Panel>
							<Form>
								<Input small placeholder="Mother's maiden name" />
								<Input small placeholder="Name of your first pet" />
							</Form>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>,
			);

			expect(tree).toMatchSnapshot();
		});
	});
});
