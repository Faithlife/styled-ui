import { pageLoader } from 'catalog';
import styled from 'styled-components';
import { InferredTypeahead, Typeahead } from '../../components/text-input';
import { Select, CreatableSelect } from '../../components/text-input-v2';
import { DocgenTable } from '../docgen-table';
import { Bootstrap, Button, Input, NumberInput, Modal, FilterInput } from '../../index';
import { InferredTextFocusDemo, InferredSelectFocusDemo, AsyncSelectDemo } from './demos';

export const textInputPages = {
	title: 'Input',
	pages: [
		{
			path: '/text-input/input',
			title: 'Input Variations',
			content: pageLoader(() => import('./input.md')),
			imports: {
				Input,
				FilterInput,
				NumberInput,
				Button,
				InputSpacer: styled.div`
					display: flex;

					&& > * {
						margin: 4px;
					}
				`,
			},
		},
		{
			path: '/text-input/select',
			title: 'Autocomplete Select Variations',
			content: pageLoader(() => import('./select.md')),
			imports: {
				Input,
				Select,
				CreatableSelect,
				AsyncSelectDemo,
				Modal,
				Button,
				DemoDiv: styled.div`
					width: 256px;
				`,
			},
		},
		{
			path: '/text-input/typeahead',
			title: 'Typeahead (deprecated)',
			content: pageLoader(() => import('./typeahead.md')),
			imports: { InferredTypeahead, Typeahead, ...Bootstrap },
		},
		{
			path: '/text-input/inferred',
			title: 'Inferred Inputs',
			content: pageLoader(() => import('./inferred.md')),
			imports: {
				InferredTextFocusDemo,
				InferredSelectFocusDemo,
				DocgenTable,
			},
		},
	],
};
