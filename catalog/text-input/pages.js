import { pageLoader } from 'catalog';
import styled from 'styled-components';
import { Typeahead, InferredText, InferredTypeahead } from '../../components/text-input';
import { Select, CreatableSelect } from '../../components/text-input-v2';
import { DocgenTable } from '../docgen-table';
import { Bootstrap, Button, Input } from '../../components/main';
import { InferredTextFocusDemo, InferredTypeaheadFocusDemo, AsyncSelectDemo } from './demos';

export const textInputPages = {
	title: 'Text Input',
	pages: [
		{
			path: '/text-input/input',
			title: 'Input Variations',
			content: pageLoader(() => import('./input.md')),
			imports: {
				Input,
				Button,
				InputSpacer: styled.div`
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
			imports: { Input, Select, CreatableSelect, AsyncSelectDemo },
		},
		{
			path: '/text-input/typeahead',
			title: 'Typeahead (deprecated)',
			content: pageLoader(() => import('./typeahead.md')),
			imports: { Typeahead, ...Bootstrap },
		},
		{
			path: '/text-input/inferred',
			title: 'Inferred Inputs',
			content: pageLoader(() => import('./inferred.md')),
			imports: {
				InferredTextFocusDemo,
				InferredTypeaheadFocusDemo,
				InferredText,
				InferredTypeahead,
				...Bootstrap,
				DocgenTable,
			},
		},
	],
};
