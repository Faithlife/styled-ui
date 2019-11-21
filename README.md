# Faithlife Equipment

Shared components for Faithlife Equip projects

### [View Demos Here (coming soon)](https://git.faithlife.dev/Logos/FaithlifeEquipment)

### Why?

[Styled-UI](https://github.com/Faithlife/styled-ui/) provides basic building block components that default to the correct fonts, colors, and spacing according to our style guidelines.
Faithlife Equipment is a shared repository for complex components that are built on top of Styled-UI primitives.

This repository was created with [`create-flcom-addin`](https://git.faithlife.dev/Logos/create-flcom-addin) and publishes each of its components as separate npm packages.

### Goals

- Style modifications should be approved by the design team before they are merged into this project.
- Components should have a prose description and live demo of different component states (using real data)
- UI components are accompanied by documentation to show how the component should be used within a real app. The UI components should rely on a parent component to contain state, however in some cases local state may be used to handle UI-specific concerns (such the location of a popup or visibility)
- Semantic versioning / version history updates when making releases

### How to contribute

- File an issue first describing what you'd like to change, or check with one of the maintainers before doing any work to ensure you are headed in the right direction
- Clone this repository locally.
- Install [NodeJS](https://nodejs.org/en/download/)
- Install [Yarn](https://yarnpkg.com/lang/en/docs/install/)
- From a terminal, run these commands from the project directory
  - `yarn` to restore packages
  - `yarn build` to build webpack
  - `yarn start` to start the development environment
  - `yarn lint` to fix style errors before committing
- When you're ready to commit your work, create a new branch for your contribution, and then sync your branch with Github
- Open a pull request via the Github Web UI to request review
