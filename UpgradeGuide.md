# Upgrade Guide

## Upgrading from v5 to v6

- Installation
  - Styled-UI v6 should be installed as a **direct** dependency, not a peerDependency anymore.
- `Button`
  - Check your variants, `primaryOutline` has been replaced by `secondary`.
  - Check your sizes, standalone props have been replaced by the `size` prop, such as `size=medium` instead of `medium`.
- `LoadingSpinner`
  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme) and Styled System props.
- `Modal`
  - Subcomponents have been renamed, `ModalContent` has been replaced by `Modal.Content`, etc.
