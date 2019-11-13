`UtilityButton` is a button with no standard button styling. It accepts styled-system props. Use in contexts when you need a clickable element that shouldn't _look_ like a button. e.g., search results, media grids, or complex menu items.

### Sample

```react
showSource: true
---
<UtilityButton display="flex" justifyContent="center" width="200px" height="100px" backgroundColor="blue2" onClick={() => alert('hi')}>
	<Box><Text textStyle="c.18">I'm a button</Text></Box>
</UtilityButton>
```
