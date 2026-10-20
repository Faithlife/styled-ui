import React from 'react';
import ReactDOM from 'react-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { SimpleToast } from '../';

const transitionTime = 250;
const showTime = 1000;

const advanceTimers = time => {
	act(() => {
		jest.advanceTimersByTime(time);
	});
};

const spyOnFindDOMNodeIfAvailable = () =>
	typeof ReactDOM.findDOMNode === 'function' ? jest.spyOn(ReactDOM, 'findDOMNode') : undefined;

describe('SimpleToast', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
		jest.useRealTimers();
		jest.restoreAllMocks();
	});

	it('should be truthy', () => {
		expect.hasAssertions();

		expect(SimpleToast).toBeTruthy();
	});

	it('uses its public ref to show a message through the Transition node ref', () => {
		expect.hasAssertions();

		const findDOMNode = spyOnFindDOMNodeIfAvailable();
		const toastRef = React.createRef();
		const message = 'Toast message';
		const { container } = render(<SimpleToast ref={toastRef} showTime={showTime} />);

		expect(toastRef.current).toBeInstanceOf(SimpleToast);

		act(() => {
			toastRef.current.showMessage({ message });
		});

		expect(screen.getByText(message)).toBeInTheDocument();
		expect(toastRef.current._nodeRef.current).toBe(container.firstChild);
		if (findDOMNode) {
			expect(findDOMNode).not.toHaveBeenCalled();
		}

		advanceTimers(transitionTime);
		advanceTimers(showTime - 1);
		expect(screen.getByText(message)).toBeInTheDocument();

		advanceTimers(1);
		expect(screen.getByText(message)).toBeInTheDocument();

		advanceTimers(transitionTime - 1);
		expect(screen.getByText(message)).toBeInTheDocument();

		advanceTimers(1);
		expect(screen.queryByText(message)).not.toBeInTheDocument();
		if (findDOMNode) {
			expect(findDOMNode).not.toHaveBeenCalled();
		}
	});

	it('shows queued messages in order after the active message exits', () => {
		expect.hasAssertions();

		const findDOMNode = spyOnFindDOMNodeIfAvailable();
		const toastRef = React.createRef();
		const firstMessage = 'First toast';
		const secondMessage = 'Second toast';
		render(<SimpleToast ref={toastRef} showTime={showTime} />);

		act(() => {
			toastRef.current.showMessage({ message: firstMessage });
		});
		advanceTimers(transitionTime);

		act(() => {
			toastRef.current.showMessage({ message: secondMessage });
		});

		expect(screen.getByText(firstMessage)).toBeInTheDocument();
		expect(screen.queryByText(secondMessage)).not.toBeInTheDocument();

		advanceTimers(transitionTime / 2 - 1);
		expect(screen.getByText(firstMessage)).toBeInTheDocument();
		expect(screen.queryByText(secondMessage)).not.toBeInTheDocument();

		advanceTimers(1);
		expect(screen.queryByText(firstMessage)).not.toBeInTheDocument();
		expect(screen.getByText(secondMessage)).toBeInTheDocument();
		if (findDOMNode) {
			expect(findDOMNode).not.toHaveBeenCalled();
		}
	});

	it('dismisses the active message when the close button is clicked', () => {
		expect.hasAssertions();

		const findDOMNode = spyOnFindDOMNodeIfAvailable();
		const toastRef = React.createRef();
		const message = 'Dismissible toast';
		render(<SimpleToast ref={toastRef} showTime={showTime} />);

		act(() => {
			toastRef.current.showMessage({ message });
		});
		advanceTimers(transitionTime);

		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText(message)).toBeInTheDocument();

		advanceTimers(transitionTime - 1);
		expect(screen.getByText(message)).toBeInTheDocument();

		advanceTimers(1);
		expect(screen.queryByText(message)).not.toBeInTheDocument();
		if (findDOMNode) {
			expect(findDOMNode).not.toHaveBeenCalled();
		}
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
