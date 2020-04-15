# Changelog

### 5.51.5

- Remove hack checking for styled system theme in legacy `Button`.

### 5.51.4

- Fix icons export.

### 5.51.3

- Remove uses of `ThemeProvider` in `Radio`, `Checkbox`, and `MenuCheckbox` components, allowing use of the styled-system theme in children of those components.

### 5.51.2

- Fix `DatePicker` and `DatePeriodPicker` popover bug. [#324](https://github.com/Faithlife/styled-ui/pull/324)

### 5.51.1

- Fix `Select` clipping text when certain CSS resets were used.

### 5.51.0

- Add `page` variant to tabs as alternative to standard `modal` variant.

### 5.50.2

- Restore `Slider` thumb alignment to how it was before unintended changes in v5.46.1.

### 5.50.1

- Fix icons export.

### 5.50.0

- Export an icon set.

### 5.49.0

- Add deprecation notice to `Grid` component. `@faithlife/equipment-grid` is now available from the [FaithlifeEquipment](https://git.faithlife.dev/Logos/FaithlifeEquipment) repo.

### 5.48.0

- Adjust minimal accordion header style.
- Remove padding top from minimal accordion panels.
- Close `DatePickerInput` after a date is selected.
- Right align `NumberInput`s.
- Update `DropZone` borders.

### 5.47.0

- Port `LoadingSpinner` to styled system, avoiding unnecessary styled components creations.

### 5.46.1

- Create fewer elements in `Slider`.

### 5.46.0

- Add `mountOnEnter` and `unmountOnExit` props to `Accordion`.
- Memoize `Input` and `NumberInput`.

### 5.45.0

- Allow use with `styled-components@^5`.

### 5.44.2

- Fix crash when using `AsyncSelect` and `AsyncCreatableSelect`.

### 5.44.1

- Fix hook dependencies in useFocusAwayHandler.

### 5.44.0

- Add support for `textStyle` prop to `UtilityButton`.
- Forward event object to `MenuItem` `onClick` callback.

### 5.43.0

- Hide browser-specific validation styling on `Input`.

### 5.42.2

- Fix `NumberInput` not properly respecting `disabled` attribute.

### 5.42.1

- Export `reactSelectComponents` for real.

### 5.42.0

- Expose `reactSelectComponents` from `ReactSelect` to help with the creation of custom `Option` and `Input` components.

### 5.41.1

- Temporarily downgrade react-select back to version 2, until we are able to address problems with ReactJS.NET server-side rendering.

### 5.41.0

- Upgrade react-select to version 3, improving SSR support for select components.

### 5.40.2

- Fix rendering bugs in`Slider` causing the right edge to be clipped under certain circumstances.
- Fix popover arrow styling.

### 5.40.1

- Fix bug where `step` prop was not forwarded by `NumberInput`.

### 5.40.0

- Add `NumberInput` component with styled step buttons.

### 5.39.1

- Adjust button padding to ensure icon-only buttons remain square.
- Make `UtilityButton` inherit `font-family`.

### 5.39.0

- `PopoverReference` and `Tooltip` can now accept function children. The function is passed a props object with a `ref` object and event handlers. These props must be spread onto the element to attach the `PopoverReference` or `Tooltip` to, allowing consumers to avoid the extra wrapping DOM element that is used by default.
- Fix scaling of icon SVGs within `Button` components. v6 `Buttons` no longer scale svgs at all; it is up to the consumer to choose a properly sized icon. Legacy `Buttons` now use `18px` sizing for small and medium sizes instead of `16px`, to conform with design standards.
- Fix bug preventing `Switch` components from rendering properly when the host environment globally sets `box-sizing: border-box` on `:after` pseudo-elements.

### 5.38.2

- Add complex filter support to simple and paginated grid
- Fix `hasInteractableElement` prop not correctly blocking rowClick

### 5.38.1

- Correct home/end key handling logic in text input components.
- Fix `Input` proptypes to allow responsive `variant`.

### 5.38.0

- Add deprecation notices to the `FilePicker`, `GroupSelector`, and `ProductDrawer` components.
- These components are now available from individual packages in the [FaithlifeEquipment](https://git.faithlife.dev/Logos/FaithlifeEquipment) repo.

### 5.37.0

- Stop auto-focusing `GroupSelector` when using the showInPlace option.
- Minor code cleanup in `Input` and `Dropdown` components.
- Add `Home` and `End` key support to `Select` components.

### 5.36.0

- Add `message` and `actions` props to the `Modal.Header` component.

### 5.35.1

- Fix `selectOnFocus`.

### 5.35.0

- Accept styled system props in more Accordion components.
- Add `selectOnFocus` prop to `Input`.

### 5.34.4

- Improve `Slider` performance.
- Fix bug where `Slider` handle would not render when value did not exactly match a stop.

### 5.34.3

- Fix bug causing accordion header subtitles to be clipped.

### 5.34.2

- Update grid drag icon to spec
- Fix custom editor components in grid not being found

### 5.34.1

- Fix accordion header alignment.
- Increase Switch transition animation speed.

### 5.34.0

- Hide browser's default focus outline on active buttons (we handle this state with a shadow).
- Add Switch component.
- Vertically center accordion header custom indicators.
- Fix focus styling on Accordion section header buttons.

### 5.33.1

- Fix `Slider` propType warnings from props that shouldn't have been spread.

### 5.33.0

- Add localization override for `drawerToggleText` to `ProductDrawer`.
- Fix styled-components `attr` deprecation warnings.

### 5.32.0

- Allow `ListBoxMenu` to accept children other than `ListBoxItem`.

### 5.31.3

- Fix error in `SequencedTab` use of styled-system props.

### 5.31.2

- Update `Slider` component to accept styled-system props.

### 5.31.1

- Fix infinite `TabPanel` render bug.
- Fix errors with certain `LegacyModal` children.

### 5.31.0

- Add `tabletRightOffset` styleOverride to `ProductDrawer`.

### 5.30.0

- Add checkbox support to all grids.
- Disable right click context menu for shared grids.
- Add drag and drop to `SimpleGrid` and `TreeGrid`.
- Add ref handles for checkbox selection.
- Add in grid editing.
- Add context prop to all grids.
- Enable autoSizing when no maxRows is specified for all grids.

### 5.29.2

- Fix icon size on `small` `FilterInput` components.

### 5.29.1

- Update all grid components to correctly handle `isLarge/SmallViewportOnly` and `hide` props together correctly.

### 5.29.0

- Update `AmberContent` and `Tab` components to accept styled-system props.

### 5.28.5

- Use v6 `Modal` in ShareDialog component.
- Update GroupSelector to always show the Create button.

### 5.28.4

- Use LegacyButton in a few more internal components. Fixes a regression in 5.28.0.

### 5.28.3

- Use LegacyButton in a few internal components. Fixes a regression in 5.28.0.

### 5.28.2

- Update GroupSelector styles.

### 5.28.1

- Add `v6` entry point to published files.

### 5.28.0

- Add `v6` entry point with new APIs.
- Add v6 `Modal` component.
- Add v6 `Button` component.
- Add v6 `SegmentedButtonGroup` component.
- Update input placeholder color.
- Resize columns in PaginatedGrid on page change to account for scrollbars.

### 5.27.0

- Add `useTheme` hook.

### 5.26.0

- Add additional `styleOverrides` to `ProductDrawer`.
- Fix icon fill in `HelpBox`.

### 5.25.1

- Update grid styles to fix style issues in chms grids
- Update `react-select` component to v2.4.4

### 5.25.0

- Allow empty values in date picker input.
- Add bottom border to `Accordion`.
- Allow falsy value to be set in `Input`.
- Don't lazy load product drawer dropdown.

### 5.24.0

- Add `UtilityButton` component.
- Add row masonry components.
- Fix accordion header color.
- Fix blur handler in `ProductDrawer`.

### 5.23.2

- Add `@faithlife/styled-ui/grid` as an entry point

### 5.23.1

- Fix element rendered by `Heading`.

### 5.23.0

- Add `Heading` component for convenient application of heading text styles.
- Set default text color on `Text` and `Paragraph`.

### 5.22.2

- Specify a unique name for `ProductDrawer`'s webpack JSONP function.

### 5.22.1

- Export `Grid` components as separate entry point

### 5.22.0

- Add documentation on horizontal stacks
- Make `ModalContainer` padding consistent
- Update `InferTooltip` content
- Add Grid Components: `SimpleGrid`, `PaginatedGrid`, `TreeGrid`

### 5.21.2

- Fix input border color.
- Use correct chevron icons for accordion.

### 5.21.1

- Remove accidental bottom margin from ModalHeader, added in 5.18.0.

### 5.21.0

- Add `FilterInput` component.
- Accept styled system props in `PopoverManager`.

### 5.20.0

- Add `minimal` variation to `Accordion`.
- Support `pinned` prop on `Accordion.Item` to disable expand/collapse interaction
- Support `hideArrow` prop on `Accordion.Item`.

### 5.19.3

- Add support for inputBorderColor style override on DatePickerInput.

### 5.19.2

- Add support for pointerEvents styled-system prop.

### 5.19.1

- Fix bug allowing hover colors to be inheritted by `AnchorButton`.

### 5.19.0

- Port `SimpleModal` to styled-system.
- Port `Popover` to styled-system.
- Port `Accordion` to styled-system.
- Intentional style change: gradients and uppercasing have been removed from `AccordionHeader` components.
- Button colors updated for active, focused, disabled state.

### 5.18.0

- Port `Button` to styled-system.
- Port `Modal` to styled-system.
- Update `Input` border color.
- Fix height of autocomplete inputs to match `Input`.

### 5.17.0

- Add `ThemeProvider` to support local theme overrides.

### 5.16.0

- Export `ModalContent` component, accept styled-system props.

### 5.15.0

- Accept styled-system props in `Input` component.
- Adjust sizing of `CheckBox` to a default of 16x16.
- Export `DefaultThemeProvider`.
- Deprecate `Input inline`.
- Simplify `Collapse`, and accept styled-system props.

### 5.14.0

- Add new styled-system based layout and text primitives `Box`, `Stack`, `Paragraph`, `Text`.
- Add theme.

### 5.13.0

- Add FilePicker component
- Add support for `mixed` state to `CheckBox`
- `DatePicker` no longer updates the selected date if the input is invalid

### 5.12.5

- Fix width prop not being passed through in `ParameterSelect`
- Fix `SimpleToast` covering elements when not being shown
- Fix `ParameterInputBox` cutting off dangling letters in safari

### 5.12.4

- Add more specificity to `ParameterInputBox` styles to beat global styles

### 5.12.3

- Simplify `ParameterInputBox` to only use inputs

### 5.12.2

- Fix `ParameterInputBox` styling on safari mobile
- Add ref to `ParameterInputBox`

### 5.12.1

- Removed padding from checkboxes and radios that was previously added to increase tap target size on mobile.

### 5.12.0

- `GroupPicker` now accepts a z-index to use for its modal.

### 5.11.0

- `GroupPicker` now allows non-admin users to select groups.
- Update chevron icons.

### 5.10.0

- Add `SequencedTab` and `SequencedTabList` components
- Add `textarea` variation to `Input`
- Add disabled props to `Checkbox` and `Radio`
- Update `Modal` `Popover` `Helpbox` and `Button` to spec
- Hide tooltips on mobile
- Fix keyboard navigation on `Dropdown` and `Listbox` components
- Add overflow style override to `Popover`

### 5.9.1

- Update dependencies.

### 5.9.0

- Update `HelpBox` styling and expand API to allow for more customization.
- Log deprecation warnings to the console when using Bootstrap components.
- Fix `Modal` footer button alignment.
- Fix keyboard navigation in `Dropdown`.
- Fix crash in `Accordion` when using `null` content.

### 5.8.1

- Fix spacing of custom indicators on Accordion components.
- Update default Accordion.Panel padding.

### 5.8.0

- Support more `styleOverrides` in `Popover`.
- Add unstyled `PopoverBase`.
- Add `content` prop to `Tooltip`; the `text` prop is now deprecated.
- Reset font-family to `inherit` in dropdowns, buttons, inputs, and others.

### 5.7.4

- Increase z-index of select menu portal to restore expected behavior inside modals.

### 5.7.3

- Adds padding `styleOverride` to `Accordian`

### 5.7.2

- Adjust default tab order of `Modal` footer buttons.
- Allow tabindex to be specified on `Modal` footer buttons.
- Render `Select` popups attached to the body to avoid layout issues.

### 5.7.1

- Fix window resizing issue on `Accordion` component

### 5.7.0

- Add `Accordion` component

### 5.6.0

- Add `Listbox` component
- Add `ParameterSentence`, `ParameterSelect`, and `ParameterInputBox` component
- Fix disabled states for button

### 5.5.2

- Fix focus and display issues with `Popover` component

### 5.5.1

- Fix bug with minor `Button` styles not showing up
- Fix classnames not being applied to base button component in `Button`

### 5.5.0

- Add `Dropdown` component.
- Adjust shared shadow styling.

### 5.4.0

- Add `Tabs` component.

### 5.3.0

- Add `eventsEnabled` and `positionFixed` props to Popover component, corresponding to the props of the same name in the underlying Popper component.

### 5.2.1

- Fix text overflow in `GroupSelector` search results.

### 5.2.0

- Allow `Select` components styles to be overridden.

### 5.1.0

- Added `ProductDrawer` component.

### 5.0.0

- **Peer dependency updated**: React 16.8 is now required, which comes with support for Hooks.
- **Peer dependency updated**: Styled Components v4 is now required, which has support for forwarding refs with the React 16.3 API. There is no more need for `innerRef`.
- **Important**: Button sizes have been adjusted to match current design specs.
- **Important**: Input "large" size has been adjusted to match the "large" button size.
- **New component**: `Slider`
- **New component**: `SimpleToast`
- Added a `zIndex` style override for the `Popover` component.
- Added placement options and styleOverrides for the `DatePickerInput` component.
- Fixed an overflow bug for churches with long names in the `GroupSelector` component.
- Fixed `Checkbox` text alignment when the text wraps.

### 4.2.2

- Fixed a false prop-types warning with GroupSelector.

### 4.2.1

- Specified `line-height: 1` on `AnchorButton` to match the setting on `Button` added in v4.2.0

### 4.2.0

- **Important**: If you were using the brand new `Input` controls, the height of `small`, `medium`, and `large` has been adjusted to match `Button` variations. Please make sure your UI still renders properly!
- **New component**: `InferredSelect`, which uses the new `react-select` control. [#93](https://github.com/Faithlife/styled-ui/pull/93) [#95](https://github.com/Faithlife/styled-ui/pull/95)
- **New component**: `DatePeriodPicker` [#91](https://github.com/Faithlife/styled-ui/pull/91)
- **Deprecated**: `InferredTypeahead` is now deprecated in favor of `InferredSelect`, please migrate your code (chms should be the only tool using this)
- Fix group creation for in place group selector [#94](https://github.com/Faithlife/styled-ui/pull/94)
- Use new tooltip in inferred controls [commit](https://github.com/Faithlife/styled-ui/commit/a096de5394d1df6d1777fd5ef340e633389c09b9)
- Prevent popover arrow from interfering with mouse events [#92](https://github.com/Faithlife/styled-ui/pull/92)
- Added `container` prop to `Modal` and `SimpleModal` components
- Added `zIndex` style override for `Modal` and `SimpleModal`, which is applied to the `ModalBackdrop`

### 4.1.0

- **New component**: Date Picker [#71](https://github.com/Faithlife/styled-ui/pull/71)
- **New component**: Popover [#68](https://github.com/Faithlife/styled-ui/pull/68)
- **Deprecated**: The `GroupSelectorModal` named export is deprecated in favor of `LargeGroupSelector`, which resolves to the same component
- Group selector can now be placed inline, and is exported as `LargeGroupSelector`. [#80](https://github.com/Faithlife/styled-ui/pull/80)
- Modals can now be rendered with no title border [#78](https://github.com/Faithlife/styled-ui/pull/78)
- Fixed a flex issue with buttons [#70](https://github.com/Faithlife/styled-ui/pull/70)
- Fixed a z-index issue with Modal, which now attaches as a child to `body`. If you were counting on Modal inheriting styles from its parent div, please re-apply the styles you want to the modal contents! [#83](https://github.com/Faithlife/styled-ui/pull/83) [#76](https://github.com/Faithlife/styled-ui/pull/76)
- Fixed overflow issues with Modal [#72](https://github.com/Faithlife/styled-ui/pull/72)
- Removed deprecated `TextInput` control. [Commit](https://github.com/Faithlife/styled-ui/commit/28e954462f63ef15a17eb76405f463f67ab9e5c8)

### 4.0.1

- Fixed a production-only crash with clipboard.js by importing a minified version

### 4.0.0

- Moved group-selector and share-dialog into separate bundles to avoid server-rendering problems

### 3.4.1

- Added ARIA attributes to checkboxes and radios [#67](https://github.com/Faithlife/styled-ui/pull/67)
- Fixed server-render errors with scrollbar changes [#73](https://github.com/Faithlife/styled-ui/pull/73)
- Fixed modals with really long content overflowing the screen size [#72](https://github.com/Faithlife/styled-ui/pull/72)

### 3.4.0

- Improve keyboard accessibility of Button (there is now a focus ring that appears)

### 3.3.0

- New component: styled radio button [#64](https://github.com/Faithlife/styled-ui/pull/64)
- Improved close logic in Modal [#63](https://github.com/Faithlife/styled-ui/pull/63)
- Improved scrollbar presentation in group selector [#62](https://github.com/Faithlife/styled-ui/pull/62)
- Exported some more typeahead components (Menu, MenuItem) [#56](https://github.com/Faithlife/styled-ui/pull/56)
- Updated docs [#60](https://github.com/Faithlife/styled-ui/pull/60)

### 3.2.1

- Fixed missing Token export in typeahead control [#53](https://github.com/Faithlife/styled-ui/pull/53)

### 3.2.0

- New component: ShareDialog [#50](https://github.com/Faithlife/styled-ui/pull/50)
- Cleanup work on GroupSelector component [#52](https://github.com/Faithlife/styled-ui/pull/52)

### 3.1.0

- Added `withoutFooter` prop so modals can be rendered without footers [#49](https://github.com/Faithlife/styled-ui/pull/49)
- Fixed some CSS reset issues in `SimpleModal`, used by GroupSelector [#51](https://github.com/Faithlife/styled-ui/pull/51)

### 3.0.2

- Fixed overflow bug with buttons that are narrower than their content
- Fixed empty file byte count

### 3.0.1

- Fixed a bug with the new variation cache
- Aligned text in stretched buttons with icons
- Added support for justifying content in buttons

### 3.0.0

- Button ref now forwards to the `HTMLButtonElement`
- Renamed `renderIcon` to `icon`.

### 2.2.2

- Fix propType warnings

### 2.2.1

- Add transparent border to `minorTransparent` button variation

### 2.2.0

- New components: FilesSection, DropZone, AnchorButton
- New variations: `primaryTransparent` and `minorTransparent` on Button
- SVGs can now be added to buttons with the `renderIcon` prop
- Fixed some margin issues with the close icon in Modal
- Button default font size is now 16px

Thanks Ian Fisk, Todd White, and Robert Bolender for contributing to this release!

### 2.1.0

- Add support for focus via `innerRef` prop on InferredText and InferredTypeahead

### 2.0.7

- Fixed blurry popover component on Windows. Thanks Robert Bolender (#28)

### 2.0.6

- Fixed box-sizing issues on LoadingSpinner and HelpBox components

### 2.0.5

- Fixed a focus border issue with checkboxes
- Fixed an alignment issue with bootstrap custom inputs. Thanks Jeremy Einfeld (#24)

### 2.0.4

- Fixed some alignment issues with checkboxes

### 2.0.3

- Re-publish of 2.0.2, which had a broken build artifact

### 2.0.2

- Changed medium button font size to 16px

### 2.0.1

- Fixed a flex issue in Helpbox. Thanks Seth Copeland (#22)
- Added some more helpbox color variations. Thanks Ian Fisk (#21)

### 2.0.0

- **Breaking**: After review with the UX team, there are several bootstrap components that are no longer included in this library, because they won't be used in any of our specs.

* Removed: Alert, Navbar*, Nav*, Breadcrumb*, Badge, Card*, Carousel*, Progress, Modal*, Tooltip, Table, ListGroup*, InputGroup*, Media, Tab*, Jumbotron, Pagination*, Collapse

### 1.4.2

- Fixed some spacing issues around elements caused by inherited styles

### 1.4.1

- Add triangle icon to typeahead. (#20)

### 1.4.0

- Added 'Collapse' accordion component

### 1.3.0

- Removed fixed 16px height on check-box (#17)
- Display children inside check-box component (#19)

### 1.2.3

- Fixed another bug when exporting AsyncTypeahead

### 1.2.2

- Fixed exporting async typeahead control
- Fixed a style issue if text-input was not already wrapped in a bootstrap element

### 1.2.1

- Fixed a few oversights in Help Box control

### 1.2.0

- check-box now supports different button types (needed for react-jsonschema-form)
- Added blue Help Box control

### 1.1.0

- Deprecated custom TextInput controls. They will be dropped on the next major release. It's technically a breaking change, but nobody was using these. If you really need them back, import them from '@faithlife/styled-ui/dist/deprecated.js'
- Updated Button margins
- Reduced bundle size of ag-grid style bundle
- Reduce main JS bundle size by excluding unused module exports

### 1.0.0

- **Breaking**: The main component stylesheet is now in `main.css`. Reference this instead of `styles.css`!
- New: Styles and demo components for ag-grid

### 0.0.x

- Themed bootstrap controls, including `Typeahead` and `InferredText`
- Initial alpha release of `Button`, `Checkbox`, and `TextInput` controls
