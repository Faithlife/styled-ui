```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
	</V6Banner>
</React.Fragment>
```

This documentation is automatically generated from jsdoc comments.

`usePopover`: function(reference, options).

The `options` argument accepts `placement`, `strategy`, `offset`, `middleware`, and the limited legacy `modifiers` subset described below. A numeric `offset` retains default collision handling:

```js
const popover = usePopover(reference, {
	placement: 'bottom',
	offset: 8,
});
```

The result returns `placement`, `middlewareData`, `isPositioned`, `update`, `popperProps`, and `arrowProps`. The wrapper objects include the floating and arrow refs/styles, respectively. `popperProps` retains `data-popper-placement` and, once measured, `data-popper-reference-hidden="false"` or `"true"`. Reference visibility uses Floating UI's reference-clipping detection, including the reference's clipping ancestors; it does not automatically hide the popover. `refs` and `floatingStyles` are not returned as top-level fields.

### Legacy modifiers

Both `Popover` and `usePopover` accept absent, `undefined`, `null`, or empty `modifiers`. Nonempty arrays support only objects with `name`, optional boolean `enabled`, and `options`:

| Name | Supported options |
| --- | --- |
| `offset` | `offset: [skidding, distance]`, with two finite numbers, or a synchronous function receiving `{ placement, reference, popper }` and returning that pair. The rects are Floating UI's current reference/floating rects. Physical skidding is preserved in RTL as well. |
| `flip` | `padding`, `boundary`, `rootBoundary`, `altBoundary`. Uses `flip` for concrete placements and `autoPlacement` for auto placements. |
| `preventOverflow` | `padding`, `boundary`, `rootBoundary`, `altBoundary`. Uses `shift` with `limitShift` to retain tethered collision handling. |

`padding` accepts a finite number or a partial `{ top, right, bottom, left }` object of finite numbers. `boundary` accepts `"clippingParents"` (translated to `"clippingAncestors"`), an Element, or an Element array. `rootBoundary` accepts `"viewport"` or `"document"`; `altBoundary` accepts a boolean.

Duplicate built-ins merge options by name, with later values overriding earlier ones. A legacy offset overrides the numeric/default offset (10px with an arrow, 0 without); disabling it also disables that default distance. Disabling `flip` or `preventOverflow` removes the corresponding collision middleware. Disabling `flip` with an auto placement is rejected; choose a concrete placement instead. Default collision handling otherwise remains enabled. Legacy offset functions are reevaluated after placement/geometry changes and parent renders.

Other modifier names, `fn`, `effect`, `phase`, dependency/data fields, and unlisted options such as `tetherOffset`, `altAxis`, and `fallbackPlacements` are **not** emulated and throw actionable errors. Custom same-width/available-height modifiers must be ported to Floating UI's `size` middleware, not passed through unchanged. `createPopper`, `onFirstUpdate`, and Popper state/result APIs remain unsupported.

### Native middleware

`middleware` replaces default collision handling; offset, arrow, and reference-visibility middleware are still supplied by Styled-UI. Include the desired `flip`/`autoPlacement` and `shift` middleware when adding custom sizing. Do not combine native middleware with legacy `flip`/`preventOverflow` modifiers; a legacy offset alone can be combined with it.

For example, replace custom same-width/maximum-height modifier functions with native sizing:

```js
import { flip, limitShift, shift, size } from '@floating-ui/react-dom';

const popover = usePopover(reference, {
	placement: 'bottom',
	middleware: [
		flip(),
		shift({ limiter: limitShift() }),
		size({
			apply({ rects, availableHeight, elements }) {
				Object.assign(elements.floating.style, {
					width: `${rects.reference.width}px`,
					maxHeight: `${Math.max(0, Math.min(300, availableHeight))}px`,
				});
			},
		}),
	],
});
```

See [Floating UI's React DOM documentation](https://floating-ui.com/docs/react) for details on positioning options and middleware.

```react
noSource: true
---
<DocgenTable component={Popover} displayName={'Popover props'} />
```
