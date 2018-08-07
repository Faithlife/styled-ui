# Styled UI

[![Build Status](https://travis-ci.org/Faithlife/styled-ui.svg?branch=master)](https://travis-ci.org/Faithlife/styled-ui)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

### [View Demos Here](https://faithlife.github.io/styled-ui/)

### How to contribute

- File an issue first describing what you'd like to change, or check with one of the maintainers before doing any work to ensure you are headed in the right direction
- Clone this repository locally.
- Install [NodeJS](https://nodejs.org/en/download/)
- Install [Yarn](https://yarnpkg.com/lang/en/docs/install/)
- From a terminal, run these commands from the project directory
  - `yarn` to restore packages
  - `yarn catalog-start` to start the development environment
  - `yarn precommit` to fix style errors before committing
- When you're ready to commit your work, create a new branch for your contribution, and then sync your branch with Github
- Open a pull request via the Github Web UI to request review

### Why?

This project addresses problems introduced by creating components from scratch. Often a component from spec gets implemented multiple times, either from Zeplin or forked from an existing control. Each time an implementation happens, inconsistencies are introduced. It's also harder to introduce animations and shadows after the prototype has been built. By using reference components instead, there's a much higher chance the final products will the contain all margins, animations, and hover states the design calls for.

### Goals

- Components in this library must be built with [Styled Components](https://www.styled-components.com/) + [React](https://reactjs.org/). Large additional runtime libraries should not be added such as `moment`, but tiny dependencies like `lodash.debounce` are OK.
- UI components should support basic color theming and should have a variation documented that demos an alternate theme.
- UI components are simple. For complex components (such as a sortable list control with inline search), consider creating a reusable component in a separate project
- Style modifications should be approved by the design team before they are merged into this project
- Components should have a prose description and live demo of different component states (using real data)
- UI components are accompanied by documentation to show how the component should be used within a real app. The UI components should rely on a parent component to contain state, however in some cases local state may be used to handle UI-specific concerns (such the location of a popup or visibility)
- Semantic versioning / version history updates when making releases
- Third-party components, such as `ag-grid` or `bootstrap`, will have their stylesheet re-exported with the Faithlife styles applied (preferably via sass variables and no styles that require an opinionated CSS reset)
  - Customizations should be done via sass variables if possible, instead of hacky css overrides
  - If an opinionated CSS reset is required, the CSS reset styles should be scoped to a div that this library controls (for example, look at how bootstrap is imported). This is required so that other styles on the page won't break when styled-ui is imported.
