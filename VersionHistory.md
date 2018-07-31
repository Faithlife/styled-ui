# Changelog

## Pending

Please add changes here when they're committed to the `master` branch, then move to "Released" once the package is published.

## Released

### 1.2.1
* Fixed a few oversights in Help Box control

### 1.2.0
* check-box now supports different button types (needed for react-jsonschema-form)
* Added blue Help Box control

### 1.1.0

* Deprecated custom TextInput controls. They will be dropped on the next major release. It's technically a breaking change, but nobody was using these. If you really need them back, import them from '@faithlife/styled-ui/dist/deprecated.js'
* Updated Button margins
* Reduced bundle size of ag-grid style bundle
* Reduce main JS bundle size by excluding unused module exports

### 1.0.0
* **Breaking**: The main component stylesheet is now in `main.css`. Reference this instead of `styles.css`!
* New: Styles and demo components for ag-grid

### 0.0.x

* Themed bootstrap controls, including `Typeahead` and `InferredText`
* Initial alpha release of `Button`, `Checkbox`, and `TextInput` controls
