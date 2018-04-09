# Engagement Products UI

[![Build Status](https://travis-ci.org/Faithlife/engagement-products-ui.svg?branch=master)](https://travis-ci.org/Faithlife/engagement-products-ui)

This repo focuses on component styles and states, but does not prescribe how your application should consume these components.

### [View Demos Here](https://faithlife.github.io/engagement-products-ui/)

### Why?
This project addresses problems introduced by creating components from scratch. Often a component from spec gets implemented multiple times, either from Zeplin or forked from an existing control. Each time an implementation happens, inconsistencies are introduced. It's also harder to introduce animations and shadows after the prototype has been built. By using reference components instead,  there's a much higher chance the final products will the contain all margins, animations, and hover states the design calls for.

### Goals
- Components and styles can be easily copied into new and existing projects
- Components use CSS modules + React
- Components are simple enough that they can be easily customized. For complex components, consider creating a reusable component instead in its own repo, shipping it to NPM, and importing it as a JS module
- Components go through a review process with the design team
- Demo site contains prose description of component use and shows off a live demo of different component states
- Components will contain a container component that handles state, and use props to control the component itself.

### Non-goals
- Versioning. Components that live here should be considered "final art", any changes will need to be ported manually over to existing apps
- Use across teams other than Engagement Products (future goal?)
- Importing components from this repo as JS modules. If we can figure out a good way to support consumers overriding the styles (changing the button color for instance), then it should be feasible to avoid copy-pasting these components/styles into projects.
