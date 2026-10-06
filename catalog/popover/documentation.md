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

The `options` argument accepts `placement`, `strategy`, `offset`, and a `middleware` array. Use Floating UI middleware such as `offset` instead of Popper modifiers:

```js
import { offset } from '@floating-ui/react-dom';

const popover = usePopover(reference, {
	placement: 'bottom',
	middleware: [offset(8)],
});
```

The result returns `placement`, `middlewareData`, `isPositioned`, `update`, `popperProps`, and `arrowProps`. The `popperProps` and `arrowProps` wrapper objects remain available: they include the floating and arrow refs/styles, respectively. `refs` and `floatingStyles` are not returned as top-level fields.

See [Floating UI's React DOM documentation](https://floating-ui.com/docs/react) for details on positioning options and middleware.

```react
noSource: true
---
<DocgenTable component={Popover} displayName={'Popover props'} />
```
