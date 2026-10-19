import { computePosition, flip, limitShift, shift } from '@floating-ui/react-dom';
import { getLegacyModifiers, getLegacyOverflowOptions, legacyOffset } from '../legacy-modifiers';

describe('legacy modifier options', () => {
	it('merges duplicate built-in options and enabled flags like Popper', () => {
		const modifiers = getLegacyModifiers([
			{ name: 'offset', options: { offset: [0, 10] } },
			{ name: 'offset', enabled: false },
			{ name: 'offset', options: { offset: [8, 8] } },
		]);

		expect(modifiers.offset.enabled).toBe(false);
		expect(modifiers.offset.options.offset).toEqual([8, 8]);
	});

	it.each([
		{ name: 'offset', options: { offset: [8] } },
		{ name: 'offset', options: { offset: Array(2) } },
		{ name: 'offset', options: { offset: ['8', 8] } },
		{ name: 'offset', options: { offset: [0, Infinity] } },
		{ name: 'flip', enabled: undefined },
		{ name: 'flip', options: { padding: () => 8 } },
		{ name: 'flip', options: { padding: { horizontal: 8 } } },
		{ name: 'flip', options: { boundary: 'scrollParent' } },
		{ name: 'flip', options: { boundary: Array(1) } },
		{ name: 'flip', options: { rootBoundary: 'clippingParents' } },
		{ name: 'preventOverflow', options: { altBoundary: 'true' } },
		{ name: 'preventOverflow', options: { altAxis: true } },
	])('rejects unsupported values rather than ignoring them: %s', modifier => {
		expect(() => getLegacyModifiers([modifier])).toThrow(/Unsupported Popper.*middleware/);
	});

	it('does not replace viewport fallbacks with undefined options', () => {
		expect(
			getLegacyOverflowOptions({
				padding: undefined,
				boundary: undefined,
				rootBoundary: undefined,
			}),
		).toEqual({});
	});

	it.each([
		['clippingParents', 'viewport', false],
		['element', 'document', true],
		['elements', 'viewport', true],
	])(
		'honors %s, rootBoundary=%s, altBoundary=%s in Floating UI',
		async (kind, rootBoundary, altBoundary) => {
			const reference = document.createElement('button');
			const floating = document.createElement('div');
			const boundaryElement = document.createElement('div');
			const boundary =
				kind === 'element'
					? boundaryElement
					: kind === 'elements'
					? [boundaryElement]
					: 'clippingParents';
			const legacy = getLegacyModifiers([
				{ name: 'flip', options: { padding: 8, boundary, rootBoundary, altBoundary } },
			]);
			const options = getLegacyOverflowOptions(legacy.flip.options);
			const getClippingRect = jest.fn(() => ({ x: 0, y: 0, width: 100, height: 100 }));
			const platform = {
				getElementRects: () => ({
					reference: { x: 80, y: 80, width: 10, height: 10 },
					floating: { x: 0, y: 0, width: 20, height: 20 },
				}),
				getClippingRect,
				getOffsetParent: () => null,
				isElement: element => Boolean(element),
				isRTL: () => false,
				convertOffsetParentRelativeRectToViewportRelativeRect: ({ rect }) => rect,
			};

			const result = await computePosition(reference, floating, {
				placement: 'bottom',
				strategy: 'fixed',
				middleware: [flip(options), shift({ ...options, limiter: limitShift() })],
				platform,
			});

			expect(result).toEqual(
				expect.objectContaining({ x: 72, y: 60, placement: 'top', strategy: 'fixed' }),
			);
			expect(getClippingRect).toHaveBeenCalledWith(
				expect.objectContaining({
					boundary: kind === 'clippingParents' ? 'clippingAncestors' : boundary,
					rootBoundary,
					element: altBoundary ? reference : floating,
					strategy: 'fixed',
				}),
			);
		},
	);

	it.each([
		['top', 105, 92],
		['bottom', 105, 108],
		['left', 92, 105],
		['right', 108, 105],
	])('keeps physical skidding in RTL for %s', async (placement, x, y) => {
		const result = await legacyOffset({ current: [5, 8] }).fn({
			x: 100,
			y: 100,
			placement,
			platform: { isRTL: () => true },
			elements: { floating: {} },
			middlewareData: {},
		});

		expect(result).toEqual(expect.objectContaining({ x, y }));
	});
});
