`Box` is a primitive layout component similar to a `div`. Layout styling can be applied directly via props, which also allows easy access to theme data.

### Example

```react
showSource: true
---
<Box display="flex" height="100px" boxShadow={1}>
	<Box flex={1} bg="blue1" borderRight={1} />
	<Box width="200px" bg="green1" />
</Box>
```

## Theming

Style prop values are theme-aware. For named theme values like color, strings values will be looked up in the theme object under that name. Numeric values can be used to reference indexed theme scales like spacing.

```react
showSource: true
---
<Box
	border={1}
	padding={3}
	color="teal5"
>
	I have a padding of 8px corresponding to the spacing value at index 3,with a background color of #009e74, corresponding to the theme color named "teal5".
</Box>
```

### Responsive styling

Pass arrays of values corresponding to the styles to apply at various breakpoints.

```react
showSource: true
---
<Box
	border={1}
	padding={[2, 3]}
	bg={[null, 'blue1', 'purple1']}
>
	I have a padding of 4px at the smallest breakpoint, and 8px at larger viewport widths. Background color is unset at the smallest breakpoint, blue1 at the medium breakpoint, and purple1 on larger viewports.
</Box>
```
