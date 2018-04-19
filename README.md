# Engagement Products UI

[![Build Status](https://travis-ci.org/Faithlife/engagement-products-ui.svg?branch=master)](https://travis-ci.org/Faithlife/engagement-products-ui)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

### [View Demos Here](https://faithlife.github.io/engagement-products-ui/)

### :warning: This library is currently experimental :warning:

This is a proof of concept. Breaking changes are likely until components have gone through design and implementation review.

### How to contribute

- Clone this repository locally. If you prefer a UI to interact with Github, [Github desktop is a good free tool to use](https://desktop.github.com/)
- Install [NodeJS](https://nodejs.org/en/download/)
- From a terminal, run these commands from the project directory
  - `npm i` to restore packages
  - `npm run storybook` to start the development environment
  - `npm run precommit` to fix style errors before committing
- When you're ready to commit your work, create a new branch for your contribution, and then sync your branch with Github
- Open a pull request via the Github UI to request review

### Why?
This project addresses problems introduced by creating components from scratch. Often a component from spec gets implemented multiple times, either from Zeplin or forked from an existing control. Each time an implementation happens, inconsistencies are introduced. It's also harder to introduce animations and shadows after the prototype has been built. By using reference components instead,  there's a much higher chance the final products will the contain all margins, animations, and hover states the design calls for.

### Goals
- No breaking changes between published versions of this project. Bug fixes to components are OK, but additional component features that are not opt-in should not be added. If a new version of a component needs to be released, a version suffix should be added to the exported component name (e.g. demo-button-v2).
- Components are built with Styled Components + React. No large additional runtime libraries should be added (such as moment, lodash.debounce is OK). All components support basic color theming and should have a matching story that demos an alternate theme.
- Minimal complexity. For complex components (such as a sortable list control with inline search), consider creating a reusable component in a separate project
- All UI is approved by the design team before it is merged into this project
- Components have a prose description and live demo of different component states (using real data)
- Story directories have a component that handles state to show how the component should be used within a real app. The presentational components may contain some local state to handle UI-specific concerns (such the location of a popup)

### Non-goals
- Components that live here should be considered "final art", any changes will need to be ported manually over to existing apps
- Use across teams other than Engagement Products (future goal?)
