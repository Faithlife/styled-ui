import React from 'react';
import { render, axe, userEvent, screen } from '../../../test-utils';

import { Modal } from '../';

// TODO: test clicking outside of modal
describe('Modal', () => {
	beforeAll(() => {
		window.ResizeObserver = jest.fn(() => ({
			disconnect: jest.fn(),
			observe: jest.fn(),
			unobserve: jest.fn(),
		}));
	});

	it('and its children are truthy', () => {
		expect.hasAssertions();

		expect(Modal).toBeTruthy();
		expect(Modal.Header).toBeTruthy();
		expect(Modal.Content).toBeTruthy();
		expect(Modal.Footer).toBeTruthy();
		expect(Modal.FooterButtons).toBeTruthy();
	});

	it('is toggles visible/ not', () => {
		expect.hasAssertions();

		const { rerender } = render(
			<Modal isOpen={false} container="body" onClose={() => {}}>
				<Modal.Header title="Location" subtitle="Help us locate you" />
				<Modal.Content width={['100vw', 400]}>{'Modal Content'}</Modal.Content>
				<Modal.Footer>
					<Modal.FooterButtons
						commitButton={{ text: 'Save', onClick: () => {} }}
						cancelButton={{ text: 'Cancel', onClick: () => {} }}
						deleteButton={{ text: 'Delete Forever', onClick: () => {} }}
					/>
				</Modal.Footer>
			</Modal>,
		);

		expect(screen.queryByText('Location')).toBeFalsy();

		rerender(
			<Modal isOpen={true} container="body" onClose={() => {}}>
				<Modal.Header title="Location" subtitle="Help us locate you" />
				<Modal.Content width={['100vw', 400]}>{'Modal Content'}</Modal.Content>
				<Modal.Footer>
					<Modal.FooterButtons
						commitButton={{ text: 'Save', onClick: () => {} }}
						cancelButton={{ text: 'Cancel', onClick: () => {} }}
						deleteButton={{ text: 'Delete Forever', onClick: () => {} }}
					/>
				</Modal.Footer>
			</Modal>,
		);

		expect(screen.queryByText('Location')).toBeVisible();
	});

	it('should be interact-able', () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<Modal isOpen={true} container="body" onClose={() => {}}>
				<Modal.Header title="Location" subtitle="Help us locate you" />
				<Modal.Content width={['100vw', 400]}>{'Modal Content'}</Modal.Content>
				<Modal.Footer>
					<Modal.FooterButtons
						commitButton={{
							text: 'Save',
							onClick: () => {
								callback('Save');
							},
						}}
						cancelButton={{
							text: 'Cancel',
							onClick: () => {
								callback('Cancel');
							},
						}}
						deleteButton={{
							text: 'Delete Forever',
							onClick: () => {
								callback('Delete Forever');
							},
						}}
					/>
				</Modal.Footer>
			</Modal>,
		);

		userEvent.click(screen.getByText('Save'));
		userEvent.click(screen.getByText('Cancel'));
		userEvent.click(screen.getByText('Delete Forever'));

		expect(callback).toHaveBeenCalledWith('Save');
		expect(callback).toHaveBeenCalledWith('Cancel');
		expect(callback).toHaveBeenCalledWith('Delete Forever');
	});

	it('should be aXe compliant', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Modal isOpen={false} container="body" onClose={() => {}}>
				<Modal.Header title="Location" subtitle="Help us locate you" />
				<Modal.Content width={['100vw', 400]}>{'Modal Content'}</Modal.Content>
				<Modal.Footer>
					<Modal.FooterButtons
						commitButton={{ text: 'Save', onClick: () => {} }}
						cancelButton={{ text: 'Cancel', onClick: () => {} }}
						deleteButton={{ text: 'Delete Forever', onClick: () => {} }}
					/>
				</Modal.Footer>
			</Modal>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
