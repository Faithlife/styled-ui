```react
noSource: true
---
<HelpBox variant="success">
	<Paragraph>
		Styled-UI v6.0.0 has been released!
		<Button as="a" variant="link" href="/#/upgrade-guide" marginLeft={2}>Please check out the upgrade guide</Button>
	</Paragraph>
</HelpBox>
```

## How to use

1. Make sure a `.npmrc` file is present in your repo, which should contain something like: `@faithlife:registry=http://npm.faithlife.io`
1. Run `yarn add @faithlife/styled-ui@^6.0.0`. Unlike v5, v6 should always be installed as a **direct** dependency.
1. Run `yarn add --peer styled-components@^5.0.0`. Styled Components will break if more than one copy is present, and should be installed as a peer dependency if your package will be consumed by another app.
1. Ship it!

## Guidelines for use

Styled-UI internally uses `styled-components` as its CSS-in-JS library, and makes use of `styled-system` props for referencing variables from our theme. New components added to this project should follow that same pattern.

For consumers of this library, each team has the flexibility to set their own standards for styling, whether that be with `styled-components` or another CSS-in-JS solution, or with classnames and LESS/CSS/SCSS/CSS Modules, etc.

Contributing guidelines can be found on [GitHub](https://github.com/Faithlife/styled-ui/#how-to-contribute).

## If you are writing a library or integration

- Use [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals)

If you are writing a package that will be required by someone else, you should exclude your `node_modules` from your Webpack bundle. This webpack plugin makes it easy.
