# Upgrade Guide

## Upgrading from v5 to v6

- Installation
  - Styled-UI v6 should be installed as a **direct** dependency, not a peerDependency anymore.
- `Button`
  - Check your variants, `primaryOutline` has been replaced by `secondary`.
  - Check your sizes, standalone props have been replaced by the `size` prop, such as `size=medium` instead of `medium`.
- `DatePickerInput`
  - The `styleOverrides` prop has been removed in favor of Styled System props. Use style props for the input directly on the `DatePickerInput` component, and use style props for the calendar popover on a `DatePickerInput.Popover` child config component.
  - The `placement` prop has been removed—use `placement` on `DatePickerInput.Popover` instead.
- `Input`
  - The `styleOverrides` prop has been removed in favor of Styled System props.
- `Modal`
  - Subcomponents have been renamed, `ModalContent` has been replaced by `Modal.Content`, etc.
