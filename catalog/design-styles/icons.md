# Icons

`import { FavoriteFilled } from '@faithlife/styled-ui/icons/18px'`

## 12px Icons

```react
noSource: true
---
<IconGroup size={'12'} />
```

## 18px Icons

```react
noSource: true
---
<IconGroup size={'18'} />
```

## Customizing Colors

Icon components accept a `color` prop. You can either set this to a literal color value, or use `currentColor` to inherit the foreground color of the parent element. This is the recommended appraoch for changing color on hover.

```react
showSource: true
---
<Box color="red">
	<FavoriteFilled color="currentColor" />
</Box>
```
