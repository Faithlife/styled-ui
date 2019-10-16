`Text` is a primitive layout component that can be used to style text with a predefined typographical style and to customize typography-related styling. By default, it renders as a `span`. `Paragraph` is also available for block text, and has the same API as `Text`.

### Example

```react
showSource: true
---
<Text textStyle="c.16" whiteSpace="pre-wrap">Text content using the <Text color="purple4" fontWeight="semibold">c.16</Text> text style.</Text>
```

### Available text styles

#### Headings

Use for headlines.

```react
<Stack spacing={3}>
	<ThemeList items={theme => theme.textStyles.h} render={([key, value]) => <Box  key={`h.${key}`}><Paragraph textStyle={`h.${key}`}>h.{key}</Paragraph></Box>} />
</Stack>
```

The `Heading` component is also available for convenience. It's a simple wrapper around `Parargaph`, rendering a `heading` element by default. Pass a `level` prop corresponding to the named `h.{level}` names listed above.

```react
showSource: true
---
<Heading level={18}>My Heading</Heading>
```

#### Content

Use for body copy and miscellaneous content.

```react
<Stack spacing={3}>
	<ThemeList items={theme => theme.textStyles.c} render={([key, value]) => <Box  key={`c.${key}`}><Paragraph textStyle={`c.${key}`}>c.{key}</Paragraph></Box>} />
</Stack>
```

#### UI

UI components like buttons. Line heights always match the font size to simplify spacing.

```react
<Stack spacing={3}>
	<ThemeList items={theme => theme.textStyles.ui} render={([key, value]) => <Box  key={`ui.${key}`}><Paragraph textStyle={`ui.${key}`}>ui.{key}</Paragraph></Box>} />
</Stack>
```
