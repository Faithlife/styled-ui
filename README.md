# Engagement Products UI

[![Build Status](https://travis-ci.org/Faithlife/engagement-products-ui.svg?branch=master)](https://travis-ci.org/Faithlife/engagement-products-ui)

### [View Demos Here](https://faithlife.github.io/engagement-products-ui/)

### How to use

In the future this will be published as a module you can import into your project, with overridable styles.

### Why?
This project addresses problems introduced by creating components from scratch. Often a component from spec gets implemented multiple times, either from Zeplin or forked from an existing control. Each time an implementation happens, inconsistencies are introduced. It's also harder to introduce animations and shadows after the prototype has been built. By using reference components instead,  there's a much higher chance the final products will the contain all margins, animations, and hover states the design calls for.

### Goals
- No breaking changes between published versions of this project. Bug fixes to components are OK, but additional component features that are not opt-in should not be added. If a new version of a component needs to be released, a version suffix should be added to the exported component name (e.g. demo-button-v2).
- Components are built with CSS modules + React. No additional runtime libraries should be added (such as moment).
- Components contain a `theme.less`, which can be overridden by the consumer (see storybook for examples).
- Minimal complexity. For complex components (such as a sortable list control with inline search), consider creating a reusable component in a separate project
- All UI is approved by the design team before it is merged into this project
- Components have a prose description and live demo of different component states (using real data)
- Component directories have a container component that handles state to show how the component should be used within a real app. The presentational components may contain some local state to handle UI-specific concerns (such the location of a popup)

### Non-goals
- Components that live here should be considered "final art", any changes will need to be ported manually over to existing apps
- Use across teams other than Engagement Products (future goal?)
