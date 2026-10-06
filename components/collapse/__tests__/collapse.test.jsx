import React from 'react';
import { act, render, screen } from '@testing-library/react';

import { Collapse } from '../';

describe('Collapse', () => {
	it('will (un)hide children', () => {
		expect.hasAssertions();

		const { rerender } = render(<Collapse isOpen={false}>{'Look for me'}</Collapse>);

		expect(screen.queryByText(/Look for me/)).not.toBeVisible();

		rerender(<Collapse isOpen={true}>{'Look for me'}</Collapse>);

		expect(screen.queryByText(/Look for me/)).toBeVisible();
	});

	it('passes the DOM node to transition callbacks and animates its measured height', () => {
		jest.useFakeTimers();

		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
		const collapseRef = React.createRef();
		const onEnter = jest.fn();
		const onEntering = jest.fn();
		const onEntered = jest.fn();
		const onExit = jest.fn();
		let heightAtOnExiting;
		const onExiting = jest.fn(node => {
			heightAtOnExiting = node.style.height;
		});
		const onExited = jest.fn();
		let measuredHeight = 120;
		const scrollHeight = jest.fn(() => measuredHeight);
		let unmount = () => {};

		try {
			const view = render(
				<React.StrictMode>
					<Collapse
						ref={collapseRef}
						isOpen={false}
						timeout={200}
						onEnter={onEnter}
						onEntering={onEntering}
						onEntered={onEntered}
						onExit={onExit}
						onExiting={onExiting}
						onExited={onExited}
					>
						{'Animated content'}
					</Collapse>
				</React.StrictMode>,
			);
			unmount = view.unmount;

			const node = collapseRef.current;
			expect(node).toBeInstanceOf(HTMLElement);
			Object.defineProperty(node, 'scrollHeight', {
				configurable: true,
				get: scrollHeight,
			});

			view.rerender(
				<React.StrictMode>
					<Collapse
						ref={collapseRef}
						isOpen={true}
						timeout={200}
						onEnter={onEnter}
						onEntering={onEntering}
						onEntered={onEntered}
						onExit={onExit}
						onExiting={onExiting}
						onExited={onExited}
					>
						{'Animated content'}
					</Collapse>
				</React.StrictMode>,
			);

			act(() => {
				jest.advanceTimersByTime(20);
			});

			expect(onEnter).toHaveBeenCalledWith(node, false);
			expect(onEntering).toHaveBeenCalledWith(node, false);
			expect(scrollHeight).toHaveBeenCalledTimes(1);
			expect(node.style.height).toBe('120px');

			act(() => {
				jest.advanceTimersByTime(180);
			});

			expect(onEntered).toHaveBeenCalledWith(node, false);
			expect(node.style.height).toBe('');

			measuredHeight = 90;
			scrollHeight.mockClear();
			view.rerender(
				<React.StrictMode>
					<Collapse
						ref={collapseRef}
						isOpen={false}
						timeout={200}
						onEnter={onEnter}
						onEntering={onEntering}
						onEntered={onEntered}
						onExit={onExit}
						onExiting={onExiting}
						onExited={onExited}
					>
						{'Animated content'}
					</Collapse>
				</React.StrictMode>,
			);

			act(() => {
				jest.advanceTimersByTime(20);
			});

			expect(onExit).toHaveBeenCalledWith(node);
			expect(onExiting).toHaveBeenCalledWith(node);
			expect(heightAtOnExiting).toBe('90px');
			expect(scrollHeight).toHaveBeenCalledTimes(1);
			expect(node.style.height).toBe('0px');

			act(() => {
				jest.advanceTimersByTime(180);
			});

			expect(onExited).toHaveBeenCalledWith(node);
			expect(node.style.height).toBe('');
			expect(consoleError.mock.calls.some(args => args.join(' ').includes('findDOMNode'))).toBe(
				false,
			);
		} finally {
			unmount();
			jest.clearAllTimers();
			jest.useRealTimers();
			consoleError.mockRestore();
		}
	});

	it('passes isAppearing to enter callbacks when appearing on mount', () => {
		jest.useFakeTimers();

		const collapseRef = React.createRef();
		const onEnter = jest.fn();
		const onEntering = jest.fn();
		const onEntered = jest.fn();
		let unmount = () => {};

		try {
			const view = render(
				<React.StrictMode>
					<Collapse
						ref={collapseRef}
						isOpen={true}
						appear={true}
						timeout={100}
						onEnter={onEnter}
						onEntering={onEntering}
						onEntered={onEntered}
					>
						{'Appearing content'}
					</Collapse>
				</React.StrictMode>,
			);
			unmount = view.unmount;

			const node = collapseRef.current;
			expect(onEnter).toHaveBeenCalledWith(node, true);
			expect(onEntering).toHaveBeenCalledWith(node, true);

			act(() => {
				jest.advanceTimersByTime(100);
			});

			expect(onEntered).toHaveBeenCalledWith(node, true);
		} finally {
			unmount();
			jest.clearAllTimers();
			jest.useRealTimers();
		}
	});

	it('forwards an object ref to the DOM node and clears it on unmount', () => {
		const ref = React.createRef();
		const { unmount } = render(<Collapse ref={ref}>{'Object ref content'}</Collapse>);

		expect(ref.current).toBe(screen.getByText('Object ref content'));

		unmount();

		expect(ref.current).toBeNull();
	});

	it('forwards a callback ref to the DOM node and clears it on unmount', () => {
		const ref = jest.fn();
		const { unmount } = render(<Collapse ref={ref}>{'Callback ref content'}</Collapse>);
		const node = screen.getByText('Callback ref content');

		expect(ref).toHaveBeenCalledWith(node);

		unmount();

		expect(ref).toHaveBeenLastCalledWith(null);
	});

	it('supports the legacy innerRef prop and clears it on unmount', () => {
		const innerRef = React.createRef();
		const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
		let unmount = () => {};

		try {
			const view = render(<Collapse innerRef={innerRef}>{'Legacy ref content'}</Collapse>);
			unmount = view.unmount;

			expect(innerRef.current).toBe(screen.getByText('Legacy ref content'));
			expect(consoleWarn).toHaveBeenCalledWith(
				expect.stringContaining('innerRef is deprecated, please use ref instead.'),
			);

			unmount();

			expect(innerRef.current).toBeNull();
		} finally {
			unmount();
			consoleWarn.mockRestore();
		}
	});
});
