/** @jest-environment node */
import React from 'react';
import { renderToString } from 'react-dom/server';

import { Popover } from '../';

const virtualReference = {
	getBoundingClientRect() {
		return {
			x: 16,
			y: 32,
			width: 24,
			height: 16,
			top: 32,
			right: 40,
			bottom: 48,
			left: 16,
		};
	},
};

describe('Popover server rendering', () => {
	it('renders inline with a virtual reference without browser globals', () => {
		expect(global.window).toBeUndefined();
		expect(global.document).toBeUndefined();

		const markup = renderToString(
			<Popover reference={virtualReference} placement="bottom">
				<span>{'Server-rendered content'}</span>
			</Popover>,
		);

		expect(markup).toContain('Server-rendered content');
	});
});
