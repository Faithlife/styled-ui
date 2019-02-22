### Default View

```react
showSource: true
---
<ProductDrawerDemo>
	<ProductDrawer />
</ProductDrawerDemo>
```
### Style Overrides

```react
showSource: true
---
<ProductDrawerDemo>
	<ProductDrawer styleOverrides={{mobileTopOffset: '55px', toggleButtonColor: 'green', toggleButtonHoverColor: 'red'}} />
</ProductDrawerDemo>
```


### Localize resources

```react
showSource: true
---
<ProductDrawerDemo>
	<ProductDrawer
		resources={({products: 'Alternate Product text'})}
	/>
</ProductDrawerDemo>
```