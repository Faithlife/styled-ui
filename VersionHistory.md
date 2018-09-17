# Changelog

### 3.0.1
* Fixed a bug with the new variation cache
* Aligned text in stretched buttons with icons
* Added support for justifying content in buttons

### 3.0.0
* Button ref now forwards to the `HTMLButtonElement`
* Renamed `renderLink` to `link`.

### 2.2.2
* Fix propType warnings

### 2.2.1
* Add transparent border to `minorTransparent` button variation

### 2.2.0
* New components: FilesSection, DropZone, AnchorButton
* New variations: `primaryTransparent` and `minorTransparent` on Button
* SVGs can now be added to buttons with the `renderIcon` prop
* Fixed some margin issues with the close icon in Modal
* Button default font size is now 16px

Thanks Ian Fisk, Todd White, and Robert Bolender for contributing to this release!

### 2.1.0
* Add support for focus via `innerRef` prop on InferredText and InferredTypeahead

### 2.0.7
* Fixed blurry popover component on Windows. Thanks Robert Bolender (#28)

### 2.0.6
* Fixed box-sizing issues on LoadingSpinner and HelpBox components

### 2.0.5
* Fixed a focus border issue with checkboxes
* Fixed an alignment issue with bootstrap custom inputs. Thanks Jeremy Einfeld (#24)

### 2.0.4
* Fixed some alignment issues with checkboxes

### 2.0.3
* Re-publish of 2.0.2, which had a broken build artifact

### 2.0.2
* Changed medium button font size to 16px

### 2.0.1
* Fixed a flex issue in Helpbox. Thanks Seth Copeland (#22)
* Added some more helpbox color variations. Thanks Ian Fisk (#21)

### 2.0.0
* **Breaking**: After review with the UX team, there are several bootstrap components that are no longer included in this library, because they won't be used in any of our specs.
- Removed: Alert, Navbar*, Nav*, Breadcrumb*, Badge, Card*, Carousel*, Progress, Modal*, Tooltip, Table, ListGroup*, InputGroup*, Media, Tab*, Jumbotron, Pagination*, Collapse

### 1.4.2
* Fixed some spacing issues around elements caused by inherited styles

### 1.4.1
* Add triangle icon to typeahead. (#20)

### 1.4.0
* Added 'Collapse' accordion component

### 1.3.0
* Removed fixed 16px height on check-box (#17)
* Display children inside check-box component (#19)

### 1.2.3
* Fixed another bug when exporting AsyncTypeahead

### 1.2.2
* Fixed exporting async typeahead control
* Fixed a style issue if text-input was not already wrapped in a bootstrap element

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
