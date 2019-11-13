Styled-UI includes a [Styled Components](https://www.styled-components.com/docs/advanced#theming) theme object. The theme is designed to work with [Styled System](https://styled-system.com/theme-specification). Most components accept theme-aware style props that can be used to easily access theme data. When possible, prefer to reference the theme rather than hard code specific color codes, pixel values, font families, etc.

### Spacing scale

Use:
`<Box paddingX={3}>`

```react
<Box display="flex">
	<ThemeList
		items={theme => theme.space}
		render={([key, value], i) => (
			<Box
				key={key}
				margin={3}
				width={50}
				display="flex"
				flexDirection="column"
				alignItems="stretch"
			>
				<Paragraph textAlign="center">{key}</Paragraph>
				<Box height={value} backgroundColor="gray66" />
				<Paragraph textAlign="center">{value}</Paragraph>
			</Box>
		)}
	/>
</Box>
```

### Color scale

Use:
`<Box backgroundColor="blue2">`

```react
<Box display="flex" flexWrap="wrap">
	<ThemeList
		items={theme => theme.colors}
		render={([key, value], i) =>
			typeof value === 'string' && (
				<Box
					key={key}
					width={100}
					height={100}
					margin={4}
					display="flex"
					flexDirection="column"
					alignItems="stretch"
					justifyContent="center"
				>
					<Paragraph textAlign="center">{key}</Paragraph>
					<Box height="30%" marginY={2} border={1} backgroundColor={value} />
					<Paragraph textAlign="center">{value}</Paragraph>
				</Box>
			)
		}
	/>
</Box>
```

### Full theme object

```react
<Stack spacing={4}>
	<ThemeList
		items={theme => theme}
		render={([key, value], i) => (
			<Box>
				<Heading level={18}>{key}</Heading>
				<Paragraph whiteSpace="pre">{JSON.stringify(value, null, 4)}</Paragraph>
			</Box>
		)}
	/>
</Stack>
```
