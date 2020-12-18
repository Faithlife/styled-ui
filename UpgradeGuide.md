# Upgrade Guide

## Upgrading from v5 to v6

- Installation
  - Styled-UI v6 should be installed as a **direct** dependency, not a peerDependency anymore.
- `Accordion`
  - The `styleOverrides` prop has been removed in favor of Styled System props. Use style props for `Accordion.Panel` directly on that component.
- `Button`
  - Check your variants, `primaryOutline` has been replaced by `secondary`.
  - Check your sizes, standalone props have been replaced by the `size` prop, such as `size=medium` instead of `medium`.
- `Checkbox`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.
- `DatePickerInput`
  - The `styleOverrides` prop has been removed in favor of Styled System props. Use style props for the input directly on the `DatePickerInput` component, and use style props for the calendar popover on a `DatePickerInput.Popover` child config component.
  - The `placement` prop has been removed—use `placement` on `DatePickerInput.Popover` instead.
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
    ```js
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
