### Without Brand Bar

```react
showSource: true
---
<ProductDrawerDemo>
	<ProductDrawer
		isBrandBarEnabled={false}
	/>
</ProductDrawerDemo>
```

### With Brand Bar

```react
showSource: true
---
<ProductDrawerDemo>
	<ProductDrawer
		isBrandBarEnabled={true}
	/>
</ProductDrawerDemo>
```



### Localize resources

```react
showSource: true
---
<ProductDrawerDemo>
	<ProductDrawer
		isBrandBarEnabled={true}
		resources={({products: 'Alternate Product text'})}
	/>
</ProductDrawerDemo>
```