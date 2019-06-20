## With light bulb

```react
<div>
	<HelpBox showLightBulb handleClose={() => true}>Anything not saved will be lost</HelpBox>
</div>
```

## Without light bulb

```react
<div>
	<HelpBox>Anything not saved will be lost</HelpBox>
	<HelpBox success>Anything not saved will be lost</HelpBox>
	<HelpBox danger>Anything not saved will be lost</HelpBox>
	<HelpBox warning>Anything not saved will be lost</HelpBox>
	<HelpBox minor>Anything not saved will be lost</HelpBox>
</div>
```
