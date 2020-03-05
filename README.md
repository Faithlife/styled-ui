# Faithlife Equipment

Shared components for Faithlife Equip projects

### [View Demos Here](https://pages.git.faithlife.dev/Logos/FaithlifeEquipment)

### Why?

[Styled-UI](https://github.com/Faithlife/styled-ui/) provides basic building block components that default to the correct fonts, colors, and spacing according to our style guidelines.
Faithlife Equipment is a shared repository for complex components that are built on top of Styled-UI primitives.

This repository was created with [`create-flcom-addin`](https://git.faithlife.dev/Logos/create-flcom-addin) and publishes each of its components as separate npm packages.

### Goals

- Style modifications should be approved by the design team before they are merged into this project.
- Components should have a prose description and live demo of different component states (using real data).
- Commits should use [conventional commit tags](https://www.conventionalcommits.org/en/v1.0.0/) for automatic versioning and changelogs.

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

### Seeing your changes locally

- Open up a terminal in your VS Code and type `yarn start`
- Navigate to localhost:3000 to see the components live

### Publishing versions
- Our auto build is set up to publish a new version after a PR is merged in, so you don't have to worry about it!

### Checking your version
- If you instaled your package with yarn, you can check your `yarn.lock`
- If you instaled with [Helmsman](https://git.faithlife.dev/Logos/helmsman), you can run `yarn get-versions`

### Additional documentation

- [FilePicker](https://git.faithlife.dev/Logos/FaithlifeEquipment/tree/master/packages/file-picker)
- [GroupSelector](https://git.faithlife.dev/Logos/FaithlifeEquipment/tree/master/packages/group-selector) (README contribution welcome)
- [LocationPreprompt](https://git.faithlife.dev/Logos/FaithlifeEquipment/tree/master/packages/location-preprompt)
- [PaymentMethods](https://git.faithlife.dev/Logos/FaithlifeEquipment/tree/master/packages/payment-methods)
- [ProductDrawer](https://git.faithlife.dev/Logos/FaithlifeEquipment/tree/master/packages/product-drawer)
- [QuillEditor](https://git.faithlife.dev/Logos/FaithlifeEquipment/tree/master/packages/quill-editor)
