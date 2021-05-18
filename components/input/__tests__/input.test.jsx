import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../';

describe('Input', () => {
	it('should update and accept text', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(<Input variant="small" onChange={e => callback(e.target.value)} />);

		const input = screen.getByRole('textbox');
		userEvent.paste(input, 'This is a test');
		expect(callback).toHaveBeenLastCalledWith('This is a test');
	});
});
