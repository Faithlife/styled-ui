import { pageLoader } from 'catalog';
import styled from 'styled-components';
import {
	Select,
	CreatableSelect,
	AsyncCreatableSelect,
	avatarComponents,
} from '../../components/text-input';
import { DocgenTable } from '../docgen-table';
import { Button, Input, NumberInput, Modal, FilterInput } from '../../index';
import { InferredTextFocusDemo, InferredSelectFocusDemo, CustomOptionsSelectDemo } from './demos';
import { movies } from './demos/movies';

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
			title: 'Select Variations',
			content: pageLoader(() => import('./select.md')),
			imports: {
				Input,
				Select,
				CreatableSelect,
				AsyncCreatableSelect,
				CustomOptionsSelectDemo,
				Modal,
				Button,
				DemoDiv: styled.div`
					width: 256px;
				`,
				avatarComponents,
				movies,
			},
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
