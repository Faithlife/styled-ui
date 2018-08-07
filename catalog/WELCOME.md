This is where the magic happens.

## How to use

1. Make sure a `.npmrc` file is present in your repo, which should contain something like: `@faithlife:registry=http://npm.faithlife.io`
1. Run `yarn add @faithlife/styled-ui styled-components`.  **Make sure to add styled-ui as a peer dependency to your project if you are hosting it within Faithlife.com (see below)**.
1. Ship it!

## How to contribute

1. Follow the directions on the [Github repo](https://github.com/faithlife/styled-ui)

## Why are peer dependencies necessary for hosted components?

Some third party components within styled-ui depend on a global stylesheet to be loaded on the page. Because these styles are not scoped, we need to ensure the components and the loaded global styles on the page stay in sync. Without using peer dependencies, styled-ui components might reference styles on the page that have not been loaded properly.

`styled-components` also requires that only one instance is running within an app. See the [FAQs](https://www.styled-components.com/docs/faqs) for more information
