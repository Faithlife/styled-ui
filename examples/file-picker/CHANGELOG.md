# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.1.2](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@4.1.1...file-picker-example@4.1.2) (2020-04-22)

**Note:** Version bump only for package file-picker-example





## [4.1.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@4.1.0...file-picker-example@4.1.1) (2020-04-21)

**Note:** Version bump only for package file-picker-example





# [4.1.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@4.0.0...file-picker-example@4.1.0) (2020-03-27)


### Bug Fixes

* Remove unused localizedResources. ([f0e74bd](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/f0e74bde5ea9ecd7ae3ad3aa4613ab1be293c39a))
* Update SME in FilePicker example. ([e8db37c](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/e8db37c3acdd6594ab21b6e5690c7834ffe06df0))


### Features

* Allow creating new SmartMedia in amber ([#80](https://git.faithlife.dev/Logos/FaithlifeEquipment/issues/80)) ([571ded8](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/571ded8eb346a9126ef07251188cd4fa95c5bc28))





# [4.0.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@3.0.1...file-picker-example@4.0.0) (2020-03-23)


### Features

* **FilePicker:** Remove circular dependency with smart media editor ([#78](https://git.faithlife.dev/Logos/FaithlifeEquipment/issues/78)) ([5f012c7](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/5f012c77fcbe576147379a7f87faa9f4b993f895))


### BREAKING CHANGES

* **FilePicker:** consumers who want to use the SmartMediaEditor will need to supply it through an ExternalEditorComponent prop.

* feat(FilePicker): Remove SmartMediaModel.

This gives the responsibility of transforming assets into models back to
the consumer of the FilePicker component, rather than handling it within
the FilePicker itself.

This helps pave the way for resolving the circular dependency with the
SmartMediaEditor.

* feat(FilePicker): Remove SmartMediaEditor.

The FilePicker no longer has a dependency on the SmartMediaEditor.
Consumers can now control their own dependency on the SmartMediaEditor
and can pass it in using the ExternalEditorComponent prop.

Consumers are still responsible for fetching Amber assets for foreground
images, background images, and Elements. Consumers are also still
responsible for importing the localization and providing it in context.

* fix: Pass a named function instead of setting displayName.

* feat: Update SME in file-picker example to v8.

* fix: Use undefined instead of null for empty SmartMediaModel.





## [3.0.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@3.0.0...file-picker-example@3.0.1) (2020-03-05)

**Note:** Version bump only for package file-picker-example





# [3.0.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@2.0.6...file-picker-example@3.0.0) (2020-02-27)


### Features

* **file-picker:** Smart Media Editor compatibility. ([f9dfb33](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/f9dfb332f43d407d12d99ae18024640dc6f4908f))


### BREAKING CHANGES

* **file-picker:** `localizedResources` is now a required prop to FilePicker
for the Smart Media Editor, unless `disableEditor` is set to true.





## [2.0.6](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@2.0.5...file-picker-example@2.0.6) (2020-01-15)

**Note:** Version bump only for package file-picker-example





## [2.0.5](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@2.0.4...file-picker-example@2.0.5) (2020-01-13)

**Note:** Version bump only for package file-picker-example





## [2.0.4](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@2.0.3...file-picker-example@2.0.4) (2020-01-03)

**Note:** Version bump only for package file-picker-example





## [2.0.3](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@2.0.2...file-picker-example@2.0.3) (2020-01-02)

**Note:** Version bump only for package file-picker-example





## [2.0.2](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@2.0.1...file-picker-example@2.0.2) (2019-12-27)

**Note:** Version bump only for package file-picker-example





## [2.0.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@2.0.0...file-picker-example@2.0.1) (2019-12-27)

**Note:** Version bump only for package file-picker-example





# [2.0.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@1.2.3...file-picker-example@2.0.0) (2019-12-27)


* Add SmartMediaEditor to FilePicker (#4) ([b7b1643](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/b7b1643022f01f18c9a8a139ef3d413a0743ca24)), closes [#4](https://git.faithlife.dev/Logos/FaithlifeEquipment/issues/4)


### BREAKING CHANGES

* This component is now ready for public use.





## [1.2.3](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@1.2.2...file-picker-example@1.2.3) (2019-11-26)

**Note:** Version bump only for package file-picker-example





## [1.2.2](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@1.2.1...file-picker-example@1.2.2) (2019-11-26)

**Note:** Version bump only for package file-picker-example





## [1.2.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/file-picker-example@1.2.0...file-picker-example@1.2.1) (2019-11-26)

**Note:** Version bump only for package file-picker-example





# 1.2.0 (2019-11-26)


### Bug Fixes

* Bump versions in example apps. ([d3e6d5c](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/d3e6d5c22c02d9ee62db603a4fabeb1aa47ef132))
* Set font in file-picker example. ([244fc4d](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/244fc4d5a479364fcee6d2c2e0ae25b0e167fb39))


### Features

* Add SmartMediaEditor to FilePicker package. ([1109942](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/1109942c605b344d5b7eb6cdfc84425580c52eff))
* Add working file-picker example. ([0991791](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/09917910979c034ffee4b5f686dfb04216781f6d))





# 1.1.0 (2019-11-26)


### Bug Fixes

* Bump versions in example apps. ([d3e6d5c](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/d3e6d5c22c02d9ee62db603a4fabeb1aa47ef132))
* Set font in file-picker example. ([244fc4d](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/244fc4d5a479364fcee6d2c2e0ae25b0e167fb39))


### Features

* Add SmartMediaEditor to FilePicker package. ([1109942](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/1109942c605b344d5b7eb6cdfc84425580c52eff))
* Add working file-picker example. ([0991791](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/09917910979c034ffee4b5f686dfb04216781f6d))
