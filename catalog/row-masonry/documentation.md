A component for layout out elements in a horizontal masonry style. This layout uses varying row heights to allow multiple elements of varying aspect ratio to align to the width of a container.

NOTE: This is a JavaScript-based layout that requires a known container width. It may not be appropriate for uses cases where server-rendered content is required.

## Possible polyfill requirements

This component assumes the availability of the following APIs, which may require polyfills in your application:

- `ResizeObserver`

## Automatic layout for in-memory collections

`AutoSizedRowMasonry` is a high-level component that uses a `ResizeObserver` to track the size of the container and automatically handle rendering.

```react
showSource: true
---
<Box maxWidth={400}>
	<AutoSizedRowMasonry
		items={new Array(20).fill(true).map(x => ({aspectRatio: (Math.random() + 0.2) * 2 }))}
		getItemAspectRatio={x => x.aspectRatio}
		gapSize={12}
		targetRowHeight={100}
		minRowItems={1}
		maxRowItems={4}
		renderItem={x => (
			<Box flex={1} backgroundColor="blue2" />
		)}
	/>
</Box>
```

If you need more flexibility (such as for virtualized rendering), you can use the lower-level components.

The `getRowLayout` function accepts a collection of items and parameters to use in the layout calculation, and returns layout information. Use the layout data to compose `MasonryRow` and `MasonryCell` elements into the final layout.

```
const layout =
	getRowLayout(items, {
		getItemAspectRatio, // function that accepts an item and returns a number representing the item's aspect ratio (width / height)
		width: 300, // width of the container in pixels
		gapWidth: 12, // width of the gap between columns in pixels
		targetHeight: 100, // target row height to shoot for, in pixels
		minRowItems: 1, // minimum number of items per row
		maxRowItems: 4, // maximum number of items per row
	});

	return (
		<Box display="grid" gridAutoFlow="row" gridRowGap={12}>
			{layout.rows.map((row, i) => (
					<MasonryRow
						key={i}
						row={row}
						renderCell={({ item, aspectRatio, index }) => (
							<MasonryCell key={index} aspectRatio={aspectRatio}>
								<Box flex={1}>{item.title}</Box>
							</MasonryCell>
						)}
					/>
				))}
		</Box>
	);
```
