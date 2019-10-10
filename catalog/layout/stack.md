`Stack` is a primitive layout component that can be used to evenly space vertically-stacked child elements. It behaves just like `Box`, but it also applies margins to direct children.

### Example

```react
showSource: true
---
<Stack spacing={[4, 6]}>
	<Box height="100px" bg="purple2" />
	<Box height="120px" bg="purple2" />
	<Stack spacing={3}>
		<Box height="100px" bg="green2" />
		<Box height="100px" bg="green2" />
	</Stack>
	<Box height="80px" bg="purple2" />
</Stack>
```

### Horizontal Stacks

Styled-UI currently does not provide a horizontal stack. Because most UIs are width-constrained, horizontal stacks needs to address wrapping and flexing needs, which vary significantly. (The vertical `Stack` simply spaces out block elements with `margin`, allowing content to grow and overflow/scroll vertically as needed).

There are many ways to stack content horizontally. Here are some options, depending on your specific needs.

#### Grid

CSS grid can be a convenient way to space out stacks of elements because the built-in `gap` support means not having to mess with margins or other spacing mechanisms. Because grid is designed to lay out... grids... this isn't a good solution when you need to wrap variable-width elements onto additional lines.

```react
showSource: true
---
<Stack spacing={5}>
	<Paragraph>Evenly space out equally-sized elements that flex to fill available space</Paragraph>
	<Box display="grid" gridAutoFlow="column" gridGap={4}>
		<Box height="50px" bg="purple2" />
		<Box height="50px" bg="purple2" />
		<Box height="50px" bg="purple2" />
	</Box>
</Stack>
```

```react
showSource: true
---
<Stack spacing={5}>
	<Paragraph>Evenly space out elements that are sized based on content</Paragraph>
	<Box display="grid" gridAutoFlow="column" gridAutoColumns="max-content" gridGap={4}>
		<Box height="50px" bg="purple2">Short content.</Box>
		<Box height="50px" bg="purple2">This is some longer content.</Box>
		<Box height="50px" bg="purple2">Boop.</Box>
	</Box>
</Stack>
```

#### Flexbox

An easy to way to switch the flow of block elements from vertical to horizontal is to create a flexbox context. Flexbox doesn't help you out much with the spacing _between_ flex items, so you'll need to leverage something like `margin` if you need that.

```react
showSource: true
---
<Stack spacing={5}>
	<Paragraph>Stack block elements horizontally. This won't wrap, and if you run out of horizontal space, items will flex shrink by default.</Paragraph>
	<Box display="flex">
		<Box height="50px" bg="blue2">Short content.</Box>
		<Box height="50px" bg="purple2">This is some longer content.</Box>
		<Box height="50px" bg="green2">Boop.</Box>
	</Box>
</Stack>
```

```react
showSource: true
---
<Stack spacing={5}>
	<Paragraph>Stack block elements horizontally, but wrap when there's not enough horizontal space.</Paragraph>
	<Box display="flex" flexWrap="wrap" maxWidth="500px">
		<Box height="50px" bg="blue2">Short content.</Box>
		<Box height="50px" bg="purple2">This is some longer content.</Box>
		<Box height="50px" bg="green2">Boop.</Box>
		<Box height="50px" bg="blue2">Short content.</Box>
		<Box height="50px" bg="purple2">This is some longer content.</Box>
		<Box height="50px" bg="green2">Boop.</Box>
		<Box height="50px" bg="blue2">Short content.</Box>
		<Box height="50px" bg="purple2">This is some longer content.</Box>
		<Box height="50px" bg="green2">Boop.</Box>
	</Box>
</Stack>
```

`margin` is a reasonable choice for applying spacing to elements in a flexbox context. You can follow the strategy used by `Stack` to create your own `HorizontalStack` with `spacing` prop that leverages theme data:

```
const HorizontalStack = styled(Box)`
	display: flex;

	> * + * {
		${system({
			spacing: {
				property: 'margin-left',
				scale: 'space',
			},
		})}
	}
`;
```
