# Upgrade Guide

## Upgrading from v5 to v6

- Installation
  - Styled-UI v6 should be installed as a **direct** dependency, not a peerDependency anymore.
- `Button`
  - Check your variants, `primaryOutline` has been replaced by `secondary`.
  - Check your sizes, standalone props have been replaced by the `size` prop, such as `size=medium` instead of `medium`.
- `Modal`
  - Subcomponents have been renamed, `ModalContent` has been replaced by `Modal.Content`, etc.
- `text-input` components
  - Components previously imported from `'@faithlife/styled-ui/dist/text-input-v2'` should now be imported from `'@faithlife/styled-ui/dist/text-input'`:
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
    } from '@faithlife/styled-ui/dist/text-input';
    ```
  - Deprecated components previously imported from `'@faithlife/styled-ui/dist/text-input'` (`Typeahead`, `AsyncTypeahead`, `Token`, `Menu`, `MenuItem`, `InferredTypeahead`) have been removed.
