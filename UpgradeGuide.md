# Upgrade Guide

## Upgrading from v5 to v6

- Installation
  - Styled-UI v6 should be installed as a **direct** dependency, not a peerDependency anymore.
- `Button`
  - Check your variants: `primaryOutline` has been replaced by `secondary`, and the inline version of `primaryTransparent` has been replaced by the new `link` variant.
  - Check your sizes: standalone props have been replaced by the `size` prop, such as `size="medium"` instead of `medium`.
- `Checkbox`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme) and Styled System props.
- `Modal`
  - Subcomponents have been renamed, `ModalContent` has been replaced by `Modal.Content`, etc.
- `Radio`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme) and Styled System props.
- `SimpleToast`
  - The `styleOverrides` prop and old `theme` prop have been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme) and Styled System props.
- `Slider`
  - The `styleOverrides` prop has been removed in favor of Styled System props.
