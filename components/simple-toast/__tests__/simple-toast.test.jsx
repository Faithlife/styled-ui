import React from 'react';
import { render, axe } from '../../../test-utils';

import { SimpleToast } from '../';

describe('SimpleToast', () => {
	it('should be truthy', () => {
		expect.hasAssertions();

		expect(SimpleToast).toBeTruthy();
	});

	// TODO: make aXe compliant
	it.skip('should be aXe compliant', async () => {
		expect.hasAssertions();

		expect.hasAssertions();

		const toastRef = React.createRef();
		const { container } = render(<SimpleToast ref={toastRef} showTime={1000} />);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
