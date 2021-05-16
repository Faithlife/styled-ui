import React from 'react';
import { render, screen } from '@testing-library/react';

import { Collapse } from '../';

describe('Collapse', () => {
	it('should respond to user click', () => {
		expect.hasAssertions();

		const { rerender } = render(<Collapse isOpen={false}>{'Look for me'}</Collapse>);

		expect(screen.queryByText(/Look for me/)).not.toBeVisible();

		rerender(<Collapse isOpen={true}>{'Look for me'}</Collapse>);

		expect(screen.queryByText(/Look for me/)).toBeVisible();
	});
});
