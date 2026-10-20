import React, { useEffect } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { hide } from '@floating-ui/react-dom';

import { Popover, usePopover } from '../';

const fakeRef = {
	getBoundingClientRect() {
		return {
			width: 0,
			height: 0,
			top: 0,
			right: 100,
			bottom: 100,
			left: 0,
		};
	},
	contains() {
		return false;
	},
};

function createReference({ x = 100, y = 100, width = 20, height = 20 } = {}) {
	const rect = {
		x,
		y,
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x,
	};

	return {
		getBoundingClientRect: () => rect,
		contains: () => false,
	};
}

function getRenderedY(element) {
	const top = Number.parseFloat(element.style.top) || 0;
	const translateY = element.style.transform.match(/translate(?:3d)?\([^,]+,\s*(-?[\d.]+)px/);
	return top + (translateY ? Number.parseFloat(translateY[1]) : 0);
}

function getRenderedX(element) {
	const left = Number.parseFloat(element.style.left) || 0;
	const translateX = element.style.transform.match(/translate(?:3d)?\((-?[\d.]+)px/);
	return left + (translateX ? Number.parseFloat(translateX[1]) : 0);
}

function UsePopoverProbe({ reference, options, onResult }) {
	const result = usePopover(reference, options);

	useEffect(() => {
		onResult(result);
	}, [onResult, result]);

	return (
		<div data-testid="hook-floating" {...result.popperProps}>
			<div data-testid="hook-arrow" {...result.arrowProps} />
		</div>
	);
}

describe('Popover', () => {
	it('shows children', async () => {
		expect.hasAssertions();

		const { container } = render(
			<>
				<button>Show a Popover!</button>
				<Popover reference={fakeRef} placement="top" onFocusAway={() => {}}>
					{'Test me!'}
				</Popover>
			</>,
		);

		const content = await screen.findByText('Test me!');
		expect(content).toBeVisible();
		expect(container).toContainElement(content);
	});

	it('closes when losing focus', async () => {
		expect.hasAssertions();

		const callback = jest.fn();
		render(
			<>
				<button>Not referenced</button>
				<button>Show a Popover!</button>
				<Popover reference={fakeRef} placement="top" onFocusAway={callback}>
					{'Test me!'}
				</Popover>
			</>,
		);

		expect(callback).not.toHaveBeenCalled();
		expect(screen.getByText('Test me!')).toHaveFocus();

		await userEvent.click(await screen.findByText('Not referenced'));
		expect(screen.getByText('Not referenced')).toHaveFocus();
		expect(callback).toHaveBeenCalled();
	});

	it('handles focus away for a virtual reference without contains', async () => {
		const contextElement = document.createElement('button');
		document.body.appendChild(contextElement);
		const reference = {
			getBoundingClientRect: () => ({
				width: 20,
				height: 20,
				top: 0,
				right: 20,
				bottom: 20,
				left: 0,
			}),
			contextElement,
		};
		const callback = jest.fn();
		const { unmount } = render(
			<>
				<button>{'Outside'}</button>
				<Popover reference={reference} onFocusAway={callback}>
					{'Test me!'}
				</Popover>
			</>,
		);

		try {
			expect(reference.contains).toBeUndefined();
			expect(callback).not.toHaveBeenCalled();

			await userEvent.click(screen.getByText('Outside'));

			expect(callback).toHaveBeenCalled();
		} finally {
			unmount();
			contextElement.remove();
		}
	});

	it.each(['absolute', 'fixed'])(
		'uses the requested placement and %s positioning strategy',
		async strategy => {
			const reference = createReference();
			render(
				<Popover
					reference={reference}
					placement="right-start"
					strategy={strategy}
					hideArrow
					data-testid="popover"
				>
					{'Test me!'}
				</Popover>,
			);

			const popover = screen.getByTestId('popover');
			await waitFor(() => expect(popover).toHaveAttribute('data-popper-placement', 'right-start'));
			expect(popover).toHaveStyle({ position: strategy });
		},
	);

	it('positions relative to a DOM element reference', async () => {
		const reference = document.createElement('button');
		reference.getBoundingClientRect = () => ({
			x: 100,
			y: 100,
			width: 20,
			height: 20,
			top: 100,
			right: 120,
			bottom: 120,
			left: 100,
		});
		document.body.appendChild(reference);

		const { unmount } = render(
			<Popover reference={reference} placement="bottom" data-testid="popover">
				{'Test me!'}
			</Popover>,
		);

		try {
			await waitFor(() =>
				expect(screen.getByTestId('popover')).toHaveAttribute('data-popper-placement', 'bottom'),
			);
		} finally {
			unmount();
			reference.remove();
		}
	});

	it('uses a 10px default offset with an arrow and zero without one', async () => {
		const reference = createReference();
		render(
			<>
				<Popover reference={reference} placement="bottom" data-testid="with-arrow">
					<span>{'With arrow'}</span>
				</Popover>
				<Popover reference={reference} placement="bottom" hideArrow data-testid="without-arrow">
					<span>{'Without arrow'}</span>
				</Popover>
				<Popover
					reference={reference}
					placement="bottom"
					hideArrow
					offset={24}
					data-testid="custom-offset"
				>
					<span>{'Custom offset'}</span>
				</Popover>
			</>,
		);

		const withArrow = screen.getByTestId('with-arrow');
		const withoutArrow = screen.getByTestId('without-arrow');
		const customOffset = screen.getByTestId('custom-offset');
		await waitFor(() => {
			expect(withArrow).toHaveAttribute('data-popper-placement', 'bottom');
			expect(withoutArrow).toHaveAttribute('data-popper-placement', 'bottom');
			expect(customOffset).toHaveAttribute('data-popper-placement', 'bottom');
			expect(getRenderedY(withArrow) - getRenderedY(withoutArrow)).toBeCloseTo(10, 0);
			expect(getRenderedY(customOffset) - getRenderedY(withoutArrow)).toBeCloseTo(24, 0);
		});

		expect(withArrow.children).toHaveLength(2);
		expect(withoutArrow.children).toHaveLength(1);
	});

	it('defaults the usePopover offset to zero', async () => {
		const reference = createReference();
		const middleware = {
			name: 'test-data',
			fn: () => ({ data: { applied: true } }),
		};
		const onResult = jest.fn();

		render(
			<UsePopoverProbe
				reference={reference}
				options={{
					placement: 'bottom',
					strategy: 'fixed',
					middleware: [middleware],
				}}
				onResult={onResult}
			/>,
		);

		const floating = screen.getByTestId('hook-floating');
		await waitFor(() => {
			expect(floating).toHaveAttribute('data-popper-placement', 'bottom');
			expect(getRenderedY(floating) - reference.getBoundingClientRect().bottom).toBeCloseTo(0, 0);
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.middlewareData['test-data']).toEqual({ applied: true });
		});
	});

	it('applies middleware supplied through the Popover API', async () => {
		const reference = createReference();
		const middleware = {
			name: 'test-offset',
			fn: jest.fn(({ x, y }) => ({ x, y: y + 15 })),
		};

		render(
			<>
				<Popover reference={reference} placement="bottom" data-testid="default-position">
					{'Default'}
				</Popover>
				<Popover
					reference={reference}
					placement="bottom"
					middleware={[middleware]}
					data-testid="custom-position"
				>
					{'Custom'}
				</Popover>
			</>,
		);

		const defaultPosition = screen.getByTestId('default-position');
		const customPosition = screen.getByTestId('custom-position');
		await waitFor(() => {
			expect(middleware.fn).toHaveBeenCalled();
			expect(defaultPosition).toHaveAttribute('data-popper-placement', 'bottom');
			expect(customPosition).toHaveAttribute('data-popper-placement', 'bottom');
			expect(getRenderedY(customPosition) - getRenderedY(defaultPosition)).toBeCloseTo(15, 0);
		});
	});

	it('does not overwrite native hide middleware data when restoring the legacy marker', async () => {
		const onResult = jest.fn();
		render(
			<UsePopoverProbe
				reference={createReference()}
				options={{ middleware: [hide({ padding: 1000 })] }}
				onResult={onResult}
			/>,
		);

		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.middlewareData.hide.referenceHidden).toBe(true);
			expect(screen.getByTestId('hook-floating')).toHaveAttribute(
				'data-popper-reference-hidden',
				'false',
			);
		});
	});

	it('exposes the resolved placement and positioning refs from usePopover', async () => {
		const reference = createReference({ y: 0 });
		const onResult = jest.fn();

		render(
			<UsePopoverProbe
				reference={reference}
				options={{
					placement: 'top',
					strategy: 'fixed',
					offset: 10,
				}}
				onResult={onResult}
			/>,
		);

		const floating = screen.getByTestId('hook-floating');
		await waitFor(() => {
			expect(floating).toHaveAttribute('data-popper-placement', 'bottom');
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.placement).toBe('bottom');
			expect(result.isPositioned).toBe(true);
		});

		const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
		expect(result.middlewareData).toEqual(expect.any(Object));
		expect(result.popperProps.style).toEqual(expect.any(Object));
		expect(result.arrowProps.style).toEqual(expect.any(Object));
		expect(result.popperProps.ref).toEqual(expect.any(Function));
		expect(result.arrowProps.ref).toEqual(expect.any(Function));
		expect(result.update).toEqual(expect.any(Function));
		expect(result).not.toHaveProperty('state');
		expect(result).not.toHaveProperty('forceUpdate');
		expect(floating).toHaveStyle({ position: 'fixed' });
		expect(screen.getByTestId('hook-arrow')).toBeInTheDocument();
	});

	it.each(['auto', 'auto-start', 'auto-end'])(
		'resolves the %s placement through usePopover',
		async requestedPlacement => {
			const onResult = jest.fn();
			render(
				<UsePopoverProbe
					reference={createReference()}
					options={{ placement: requestedPlacement, strategy: 'fixed' }}
					onResult={onResult}
				/>,
			);

			const floating = screen.getByTestId('hook-floating');
			await waitFor(() => {
				const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
				expect(result.isPositioned).toBe(true);
				expect(result.placement).toMatch(/^(top|bottom|left|right)(-start|-end)?$/);
				expect(floating).toHaveAttribute('data-popper-placement', result.placement);
			});
		},
	);

	it('updates native auto-placement alignment on rerender', async () => {
		const reference = createReference();
		const onResult = jest.fn();
		const probe = placement => (
			<UsePopoverProbe reference={reference} options={{ placement }} onResult={onResult} />
		);
		const { rerender } = render(probe('auto-start'));
		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.placement).toMatch(/-start$/);
		});

		rerender(probe('auto-end'));

		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.placement).toMatch(/-end$/);
		});
	});

	it('portals into document.body when requested', () => {
		const { container } = render(
			<Popover reference={fakeRef} container="body" data-testid="body-popover">
				{'Body portal'}
			</Popover>,
		);

		const popover = screen.getByTestId('body-popover');
		expect(document.body).toContainElement(popover);
		expect(container).not.toContainElement(popover);
	});

	it('portals into a ref container when requested', () => {
		const portalTarget = document.createElement('div');
		const containerRef = React.createRef();
		containerRef.current = portalTarget;
		const { container } = render(
			<Popover reference={fakeRef} container={containerRef} data-testid="ref-popover">
				{'Ref portal'}
			</Popover>,
		);

		const popover = portalTarget.querySelector('[data-testid="ref-popover"]');
		expect(portalTarget).toContainElement(popover);
		expect(container).not.toContainElement(popover);
	});

	it.each([undefined, null, []])('accepts empty legacy modifiers: %s', async modifiers => {
		render(
			<Popover reference={createReference()} modifiers={modifiers} data-testid="legacy-popover">
				{'Legacy modifiers'}
			</Popover>,
		);

		await waitFor(() =>
			expect(screen.getByTestId('legacy-popover')).toHaveAttribute(
				'data-popper-reference-hidden',
				'false',
			),
		);
		expect(screen.getByTestId('legacy-popover')).not.toHaveAttribute('modifiers');
	});

	it.each([undefined, null, []])('accepts empty usePopover modifiers: %s', async modifiers => {
		const onResult = jest.fn();
		render(
			<UsePopoverProbe reference={createReference()} options={{ modifiers }} onResult={onResult} />,
		);

		await waitFor(() =>
			expect(onResult.mock.calls[onResult.mock.calls.length - 1][0].isPositioned).toBe(true),
		);
	});

	it('lets a legacy offset override the default arrow distance without adding it twice', async () => {
		const reference = createReference();
		render(
			<Popover
				reference={reference}
				placement="bottom-end"
				strategy="fixed"
				middleware={[]}
				modifiers={[{ name: 'offset', options: { offset: [8, 8] } }]}
				data-testid="legacy-popover"
			>
				{'Account menu'}
			</Popover>,
		);

		const popover = screen.getByTestId('legacy-popover');
		await waitFor(() => {
			expect(popover).toHaveAttribute('data-popper-placement', 'bottom-end');
			expect(getRenderedY(popover)).toBeCloseTo(reference.getBoundingClientRect().bottom + 8, 0);
			expect(getRenderedX(popover)).toBeCloseTo(reference.getBoundingClientRect().right + 8, 0);
		});
		expect(popover).toHaveStyle({ position: 'fixed' });
	});

	it.each([
		['top', 5, -8],
		['bottom', 5, 8],
		['left', -8, 5],
		['right', 8, 5],
	])('preserves both physical offset axes for %s', async (placement, x, y) => {
		const onResult = jest.fn();
		render(
			<UsePopoverProbe
				reference={createReference()}
				options={{ placement, modifiers: [{ name: 'offset', options: { offset: [5, 8] } }] }}
				onResult={onResult}
			/>,
		);

		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.isPositioned).toBe(true);
			expect(result.placement).toBe(placement);
			expect(result.middlewareData.offset).toEqual({ x, y, placement });
		});
	});

	it('passes current placement and rects to legacy offset functions after a flip', async () => {
		const onResult = jest.fn();
		const offset = jest.fn(({ placement, reference }) => [
			reference.width / 4,
			placement === 'top' ? 6 : 8,
		]);
		render(
			<UsePopoverProbe
				reference={createReference({ y: 0 })}
				options={{ placement: 'top', modifiers: [{ name: 'offset', options: { offset } }] }}
				onResult={onResult}
			/>,
		);

		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.placement).toBe('bottom');
			expect(result.middlewareData.offset).toEqual({ x: 5, y: 8, placement: 'bottom' });
		});
		expect(offset).toHaveBeenCalledWith({
			placement: 'bottom',
			reference: expect.objectContaining({ width: 20, height: 20 }),
			popper: expect.objectContaining({ width: 0, height: 0 }),
		});
	});

	it('updates offset functions that capture new data on rerender', async () => {
		const reference = createReference();
		const onResult = jest.fn();
		const probe = skidding => (
			<UsePopoverProbe
				reference={reference}
				options={{
					modifiers: [{ name: 'offset', options: { offset: () => [skidding, 8] } }],
				}}
				onResult={onResult}
			/>
		);
		const { rerender } = render(probe(0));
		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.middlewareData.offset).toEqual({ x: 0, y: 8, placement: 'bottom' });
		});

		rerender(probe(8));

		await waitFor(() => {
			const result = onResult.mock.calls[onResult.mock.calls.length - 1][0];
			expect(result.middlewareData.offset).toEqual({ x: 8, y: 8, placement: 'bottom' });
		});
	});

	it.each([8, 12, { left: 12 }])(
		'preserves preventOverflow padding %s and default flip',
		async padding => {
			render(
				<Popover
					reference={createReference({ x: 0, y: 0 })}
					placement="top"
					modifiers={[{ name: 'preventOverflow', options: { padding } }]}
					data-testid="padded-popover"
				>
					{'Padded tooltip'}
				</Popover>,
			);
			const popover = screen.getByTestId('padded-popover');

			await waitFor(() => {
				expect(popover).toHaveAttribute('data-popper-placement', 'bottom');
				expect(getRenderedX(popover)).toBeCloseTo(
					typeof padding === 'number' ? Math.max(10, padding) : 12,
					0,
				);
			});
		},
	);

	it('preserves flip padding', async () => {
		render(
			<Popover
				reference={createReference({ y: 2 })}
				placement="top"
				hideArrow
				modifiers={[{ name: 'flip', options: { padding: 12 } }]}
				data-testid="padded-popover"
			>
				{'Padded flip'}
			</Popover>,
		);

		await waitFor(() =>
			expect(screen.getByTestId('padded-popover')).toHaveAttribute(
				'data-popper-placement',
				'bottom',
			),
		);
	});

	it('honors disabled built-in modifiers', async () => {
		render(
			<Popover
				reference={createReference({ x: -30, y: -30 })}
				placement="top"
				modifiers={[
					{ name: 'offset', enabled: false },
					{ name: 'flip', enabled: false },
					{ name: 'preventOverflow', enabled: false },
				]}
				data-testid="unconstrained-popover"
			>
				{'Unconstrained'}
			</Popover>,
		);
		const popover = screen.getByTestId('unconstrained-popover');

		await waitFor(() => {
			expect(popover).toHaveAttribute('data-popper-reference-hidden', 'true');
			expect(getRenderedY(popover)).toBeCloseTo(-30, 0);
			expect(getRenderedX(popover)).toBeCloseTo(-20, 0);
		});
		expect(popover).toHaveAttribute('data-popper-placement', 'top');
	});

	it.each([
		{ name: 'sameWidth', fn: () => {} },
		{ name: 'maxHeight', phase: 'beforeWrite', fn: () => {} },
		{ name: 'offset', phase: 'main' },
		{ name: 'preventOverflow', options: { tetherOffset: 4 } },
		{ name: 'flip', options: { fallbackPlacements: ['left'] } },
	])('rejects unsupported legacy modifier %s with actionable guidance', modifier => {
		expect(() =>
			render(
				<UsePopoverProbe
					reference={fakeRef}
					options={{ modifiers: [modifier] }}
					onResult={jest.fn()}
				/>,
			),
		).toThrow(/Unsupported Popper.*middleware/i);
	});

	it('rejects ambiguous legacy collision modifiers combined with native middleware', () => {
		expect(() =>
			render(
				<UsePopoverProbe
					reference={fakeRef}
					options={{ modifiers: [{ name: 'preventOverflow' }], middleware: [] }}
					onResult={jest.fn()}
				/>,
			),
		).toThrow(/combine.*middleware/i);
	});

	it.each([
		[{ x: 100, y: 100 }, 'false'],
		[{ x: -10, y: 100 }, 'false'],
		[{ x: -21, y: 100 }, 'true'],
		[{ x: 100, y: -21 }, 'true'],
	])('serializes reference clipping for %s as "%s"', async (rect, hidden) => {
		render(
			<Popover reference={createReference(rect)} data-testid="visibility-popover">
				{'Reference visibility'}
			</Popover>,
		);

		await waitFor(() =>
			expect(screen.getByTestId('visibility-popover')).toHaveAttribute(
				'data-popper-reference-hidden',
				hidden,
			),
		);
	});

	it('tracks reference clipping ancestors independently of a body portal and updates on scroll', async () => {
		const clippingParent = document.createElement('div');
		clippingParent.style.overflow = 'hidden';
		clippingParent.getBoundingClientRect = () => ({
			x: 0,
			y: 0,
			top: 0,
			left: 0,
			right: 100,
			bottom: 100,
			width: 100,
			height: 100,
		});
		Object.defineProperties(clippingParent, {
			clientWidth: { value: 100 },
			clientHeight: { value: 100 },
			offsetWidth: { value: 100 },
			offsetHeight: { value: 100 },
		});
		const contextElement = document.createElement('button');
		clippingParent.appendChild(contextElement);
		document.body.appendChild(clippingParent);
		let rect = createReference({ x: 150, y: 20 }).getBoundingClientRect();
		const reference = {
			contextElement,
			getBoundingClientRect: () => rect,
		};
		const { unmount } = render(
			<Popover reference={reference} container="body" data-testid="clipped-popover">
				{'Clipped reference'}
			</Popover>,
		);
		try {
			const popover = screen.getByTestId('clipped-popover');
			await waitFor(() => expect(popover).toHaveAttribute('data-popper-reference-hidden', 'true'));

			rect = createReference({ x: 50, y: 20 }).getBoundingClientRect();
			act(() => clippingParent.dispatchEvent(new Event('scroll')));

			await waitFor(() => expect(popover).toHaveAttribute('data-popper-reference-hidden', 'false'));
		} finally {
			unmount();
			clippingParent.remove();
		}
	});

	it.each(['createPopper', 'onFirstUpdate'])(
		'rejects the legacy %s option on usePopover',
		option => {
			expect(() =>
				render(
					<UsePopoverProbe
						reference={fakeRef}
						options={{ [option]: jest.fn() }}
						onResult={jest.fn()}
					/>,
				),
			).toThrow(new RegExp(option, 'i'));
		},
	);

	it('should be aXe compliant', async () => {
		expect.hasAssertions();

		const { container } = render(
			<Popover reference={fakeRef} placement="top" onFocusAway={() => {}}>
				{'Test me!'}
			</Popover>,
		);

		await act(async () => {
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});
