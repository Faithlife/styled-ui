Bootstrap components expect an opinionated CSS reset to be present. In order to not break global styles in an existing app, we provide a customized stylesheet that only applies these styles to elements within a special container element.

When using a component from this library, it will be automatically wrapped in an outer container element with the CSS reset styles applied to it. If the component contains other Bootstrap components (e.g. a group of form elements), only the outer-most component will be wrapped.

To import the stylesheet:

```
import '@faithlife/dist/main.css';
```
