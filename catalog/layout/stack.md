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
