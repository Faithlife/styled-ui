# Upgrade Guide

## Upgrading from v6 to v7

- **React:** v7 adds React 19 compatibility. Keep React and React DOM on compatible versions.
- **`Popover`:** Positioning now uses Floating UI. A limited legacy `modifiers` subset remains supported: `offset` pairs/functions and `flip`/`preventOverflow` padding and boundary options, including their `enabled` flags. `modifiers={undefined}`, `null`, and `[]` are accepted. See the [Popover documentation](catalog/popover/documentation.md) for the exact subset. Custom Popper `fn`/`effect`/`phase` behavior and other options still require Floating UI middleware; unsupported configurations throw with migration guidance. For a simple distance, use `offset` to retain default collision handling:
  ```js
  usePopover(reference, {
    placement: 'bottom',
    offset: 8,
  });
  ```
  Supplying `middleware` replaces default collision handling, so include the desired `flip`/`autoPlacement` and `shift` middleware explicitly. Do not combine it with legacy collision modifiers. A legacy offset overrides, rather than adds to, the numeric/default arrow distance.
- **`usePopover`:** The hook returns `placement`, `middlewareData`, `isPositioned`, `update`, `popperProps`, and `arrowProps`. The `popperProps` and `arrowProps` wrapper objects remain available: `popperProps` includes the floating element's ref, positioning styles, `data-popper-placement`, and the measured `data-popper-reference-hidden` string (`"false"` or `"true"`); `arrowProps` includes the arrow ref and styles. Positioning is powered by Floating UI, but the hook does not return `refs` or `floatingStyles` as top-level fields.
- **Select components:** v7 upgrades `react-select` to v5. Recheck code that consumes a Select ref or supplies custom components against the v5 exposed instance and component props. Keep forwarding the provided `innerRef` and `innerProps` to the rendered custom component element:
  ```jsx
  function CustomOption({ innerRef, innerProps, children }) {
    return <div ref={innerRef} {...innerProps}>{children}</div>;
  }

  <Select ref={selectRef} components={{ Option: CustomOption }} />;
  ```
  Use the re-exported `reactSelectComponents.Input` for custom inputs, rather than an Input from a separate react-select v3 dependency. Select inputs now have the accessible role `combobox`; update old `textbox` test queries rather than overriding the role.
- **Async Select components:** Inline `loadOptions` callbacks are supported across parent rerenders. Queued requests use the latest callback; already-started requests retain their results. Callback- and promise-style loaders are supported. Failed current loads settle loading and call the optional synchronous `onLoadError(error, inputValue)` callback, or `console.error(error)` by default. Use `onLoadError` to display the application's error UI; failures are not silently converted to successful option arrays. Obsolete/unmounted failures are ignored.

## Upgrading from v5 to v6

- Installation
  - Styled-UI v6 should be installed as a **direct** dependency, not a peerDependency anymore.
- Importing
  - Importing from `'@faithlife/styled-ui/v6'` has been removed—import v6 components from `'@faithlife/styled-ui'` now.
- `Accordion`
  - The `styleOverrides` prop has been removed in favor of Styled System props. Use style props for `Accordion.Panel` directly on that component.
- `AnchorButton`
  - `AnchorButton` has been removed—use `<Button as="a" />` instead.
- `Button`
  - Check your variants:
    - `primaryOutline` has been replaced by `secondary`.
    - `primaryTransparent` has been replaced by `link` and now uses inline spacing (no padding) by default.
  - Check your sizes:
    - Standalone props have been replaced by the `size` prop, such as `size="medium"` instead of `medium`.
    - Size definitions have also changed, and the `condensed` prop is no longer used. The following table summarizes the differences:
      ```
                 ┌───────────────────────────┬────────────────────────────┬────────────────────────────┐
                 │          "small"          │          "medium"          │          "large"           │
                 ├─────┬──────────────┬──────┼──────┬──────────────┬──────┼──────┬──────────────┬──────┤
                 │ v5  │ v5 condensed │  v6  │  v5  │ v5 condensed │  v6  │  v5  │ v5 condensed │  v6  │
      ┌──────────┼─────┴──────────────┼──────┼──────┴──────────────┼──────┼──────┴──────────────┼──────┤
      │ height   │        32px        │ 32px │        40px         │ 40px │        56px         │ 48px │
      ├──────────┼─────┬──────────────┼──────┼──────┬──────────────┼──────┼──────┬──────────────┼──────┤
      │ paddingX │ 8px │      6px     │  6px │ 14px │     10px     │ 10px │ 22px │     14px     │ 11px │
      └──────────┴─────┴──────────────┴──────┴──────┴──────────────┴──────┴──────┴──────────────┴──────┘
      ```
    - Size variant styles no longer change the dimensions of child `<svg>`s, so manually resize yours as needed.
- `Checkbox`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.
- `DatePickerInput`
  - The `styleOverrides` prop has been removed in favor of Styled System props. Use style props for the input directly on the `DatePickerInput` component, and use style props for the calendar popover on a `DatePickerInput.Popover` child config component.
  - The `placement` prop has been removed—use `placement` on `DatePickerInput.Popover` instead.
- `Dropdown`
  - The `Dropdown` component has been renamed to `Menu`.
    - `Dropdown.Menu` has been renamed `Menu.Dropdown`.
  - "Dropdown" is a general term that refers to content inside of a popover. For more details, see the docs on the `Menu` and `Listbox` components.
- `HelpBox`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.
- `Input`
  - The `styleOverrides` prop has been removed in favor of Styled System props.
- `LoadingSpinner`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.
- `Modal`
  - Subcomponents have been renamed, `ModalContent` has been replaced by `Modal.Content`, etc.
- `ParameterSentence`
  - Subcomponents have been renamed: `ParameterSelect` to `ParameterSentence.Select`, `ParameterInputBox` to `ParameterSentence.Input`.
  - The `styleOverrides` prop has been removed in favor of Styled System props.
- `Popover`
  - `PopoverManager` and `PopoverReference` have been removed. See [`Popover`'s documentation](https://faithlife.github.io/styled-ui/#/popover/variations) for the new API.
  - The `styleOverrides` prop has been removed in favor of Styled System props.
- `Radio`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.
- `SimpleToast`
  - The `styleOverrides` prop and old `theme` prop have been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.
- `Slider`
  - The `styleOverrides` prop has been removed in favor of Styled System props.
- `Tab`
  - Subcomponents have been renamed: `TabList` to `Tab.List`, `SequencedTabList` to `SequencedTab.List`, etc.
- `text-input` components
  - Components previously imported from `'@faithlife/styled-ui/dist/text-input-v2'` should now be imported from `'@faithlife/styled-ui/text-input'`:
    ```code
    lang: js
    ---
    import {
    	AsyncSelect,
    	CreatableSelect,
    	AsyncCreatableSelect,
    	Select,
    	avatarComponents,
    	reactSelectComponents,
    	InferredText,
    	InferredSelect,
    } from '@faithlife/styled-ui/text-input';
    ```
  - Deprecated components previously imported from `'@faithlife/styled-ui/dist/text-input'` (`Typeahead`, `AsyncTypeahead`, `Token`, `Menu`, `MenuItem`, `InferredTypeahead`) have been removed.
  - `Select` components behave slightly differently now in one situation. When `isMulti` is `true`, if one or more options are selected and then later all selected options are removed, upon the removal of the last option the value passed to `onChange` will be `null`. In v5, the value passed to `onChange` in this situation would have been `[]`. See the [React Select v3 upgrade guide](https://github.com/JedWatson/react-select/issues/3585) for more details.
- `Tooltip`
  - The `styleOverrides` prop has been removed in favor of Styled System props.
