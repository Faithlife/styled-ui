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
	<HelpBox theme={{ backgroundColor: '#f5f5f5', foregroundColor: '#DBDBDB' }}>Anything not saved will be lost</HelpBox>
</div>
```
