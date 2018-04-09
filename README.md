# Engagement Products UI

UI components designed to be shared between multiple products. This repo focuses on component styles and states, but does not prescribe how your application should consume these components.

### [View Demos Here](https://faithlife.github.io/engagement-products-ui/)

### Why?
This project addresses problems introduced by creating components from scratch. Often a spec gets ported multiple times, either from Zeplin or forked from an existing control. Each time a port happens, inconcistencies are introduced. It's also harder to introduce animations and shadows after the prototype has been built. By using reference components instead,  there's a much higher chance the final products will the contain all margins, animations, and hover states the design calls for.

### Goals
- Components and styles can be easily copied into new and existing projects
- Components use CSS modules + React
- Components are simple enough that they can be easily customized. For complex components, consider creating a reusable component instead, shipping it to NPM, and importing it as a JS module
- Components go through a review process with the design team
- Demo site contains prose description of component use and shows off a live demo of different component states
- Components will contain a container component that handles state, and use props to control the component itself.

### Non-goals
- Versioning. Components that live here should be considered "final art", any changes will need to be ported manually over to existing apps
- Use across teams other than Engagement Products (future goal?)
