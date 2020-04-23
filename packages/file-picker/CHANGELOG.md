# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.2.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@3.2.0...@faithlife/file-picker@3.2.1) (2020-04-23)


### Bug Fixes

* Pass new arguments to embedded amber to hide "Create" button. ([a497484](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/a497484ecd4de7fe3c4bef570fa903bf9c732fe6))





# [3.2.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@3.1.2...@faithlife/file-picker@3.2.0) (2020-04-23)


### Features

* **file-picker:** Add full viewport (i.e. non-modal) option ([#93](https://git.faithlife.dev/Logos/FaithlifeEquipment/issues/93)) ([b444d3e](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/b444d3eea8fd0f28c0cea6994af767b7d4835af8))





## [3.1.2](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@3.1.1...@faithlife/file-picker@3.1.2) (2020-04-22)


### Bug Fixes

* **file-picker:** Pass all assets back onFilesSelected. ([36d1d65](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/36d1d65d9520021ea3bb18abc0cd1ae578c23a8c))





## [3.1.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@3.1.0...@faithlife/file-picker@3.1.1) (2020-04-21)


### Bug Fixes

* Pass accountId to ExternalEditorComponent. ([6fb2a8f](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/6fb2a8fd16d49739ce1fbc546411c046b2068699))





# [3.1.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@3.0.0...@faithlife/file-picker@3.1.0) (2020-03-27)


### Bug Fixes

* Remove obsolete default prop. ([cc0d05a](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/cc0d05a3870e681d529f36907a2429a8c8bc99f0))


### Features

* Allow creating new SmartMedia in amber ([#80](https://git.faithlife.dev/Logos/FaithlifeEquipment/issues/80)) ([571ded8](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/571ded8eb346a9126ef07251188cd4fa95c5bc28))





# [3.0.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@2.0.1...@faithlife/file-picker@3.0.0) (2020-03-23)


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





## [2.0.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@2.0.0...@faithlife/file-picker@2.0.1) (2020-03-05)


### Bug Fixes

* Add dev deps. ([1516287](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/1516287c1001b2531785e920bad08cf96eef5199))
* Use dev dependency. ([9540254](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/95402546afe23cc3d898aca125e0877e97cf9af0))





# [2.0.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@1.0.6...@faithlife/file-picker@2.0.0) (2020-02-27)


### Features

* **file-picker:** Smart Media Editor compatibility. ([f9dfb33](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/f9dfb332f43d407d12d99ae18024640dc6f4908f))


### BREAKING CHANGES

* **file-picker:** `localizedResources` is now a required prop to FilePicker
for the Smart Media Editor, unless `disableEditor` is set to true.





## [1.0.6](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@1.0.5...@faithlife/file-picker@1.0.6) (2020-01-15)


### Bug Fixes

* Treat Beta PR environments as not internal. ([bd0a140](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/bd0a1401ee44b1a641236c6e38aba78faba43f48))





## [1.0.5](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@1.0.4...@faithlife/file-picker@1.0.5) (2020-01-13)


### Bug Fixes

* Get dimensions for Smart Media more reliably. ([#32](https://git.faithlife.dev/Logos/FaithlifeEquipment/issues/32)) ([2577610](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/2577610143515accc1d619886c5db5f4590c90b6))





## [1.0.4](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@1.0.3...@faithlife/file-picker@1.0.4) (2020-01-03)


### Bug Fixes

* Load amber embeddedBucket.js over https ([529176f](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/529176f7cfc9ef64bd28bc8ed78dd69071fd699a))





## [1.0.3](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@1.0.2...@faithlife/file-picker@1.0.3) (2020-01-02)


### Bug Fixes

* Protect against null children. ([1e598a5](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/1e598a51ca4dc9a47d1cefdfb1b89f1388fe7862))





## [1.0.2](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@1.0.1...@faithlife/file-picker@1.0.2) (2019-12-27)


### Bug Fixes

* Remove direct dependency on SME. ([8c57148](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/8c571484cd0c8e47d8de06b16b2d603412d19b14))





## [1.0.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@1.0.0...@faithlife/file-picker@1.0.1) (2019-12-27)


### Bug Fixes

* Create amberClient after server render. ([0a20026](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/0a200263cb9f78d0bb168da0cf88d9753a023e26))





# [1.0.0](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@0.3.3...@faithlife/file-picker@1.0.0) (2019-12-27)


* Add SmartMediaEditor to FilePicker (#4) ([b7b1643](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/b7b1643022f01f18c9a8a139ef3d413a0743ca24)), closes [#4](https://git.faithlife.dev/Logos/FaithlifeEquipment/issues/4)


### BREAKING CHANGES

* This component is now ready for public use.





## [0.3.3](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@0.3.2...@faithlife/file-picker@0.3.3) (2019-11-26)

**Note:** Version bump only for package @faithlife/file-picker





## [0.3.2](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@0.3.1...@faithlife/file-picker@0.3.2) (2019-11-26)

**Note:** Version bump only for package @faithlife/file-picker





## [0.3.1](https://git.faithlife.dev/Logos/FaithlifeEquipment/compare/@faithlife/file-picker@0.3.0...@faithlife/file-picker@0.3.1) (2019-11-26)

**Note:** Version bump only for package @faithlife/file-picker





# 0.3.0 (2019-11-26)


### Bug Fixes

* Add FilePicker.TestTab to test build. ([3554224](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/355422459f4011e983d75eb7621f21ec8fa6a306))



# 0.2.0 (2019-11-26)


### Bug Fixes

* Don't spread padding prop to TabPanel contents. ([cf2521a](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/cf2521a57be244fd17592683900c0624961825c8))


### Features

* Add FilePicker, FilePicker.Tab components. ([560834d](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/560834dfcdf3cc13b5a651e082b312b198c3d31b))
* Add FilePicker.AmberTab. ([d5ad0fd](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/d5ad0fdb39d74dea17a0873d9d4f2b94c639bb45))
* Add placeholder tests. ([5dcfed4](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/5dcfed4828701339822fe749e8ab4919d348736b))
* Add SmartMediaEditor to FilePicker package. ([1109942](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/1109942c605b344d5b7eb6cdfc84425580c52eff))
* Add working file-picker example. ([0991791](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/09917910979c034ffee4b5f686dfb04216781f6d))
* Initial working demo with SmartMediaEditor. ([0e1d2a6](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/0e1d2a6cc04a0980b64f59e892c5db8375910b65))
* Pass onCancel prop to FilePickerProvider. ([5a798ba](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/5a798ba50710f525a258eba21c8a71ad44879a40))





# 0.2.0 (2019-11-26)


### Bug Fixes

* Don't spread padding prop to TabPanel contents. ([cf2521a](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/cf2521a57be244fd17592683900c0624961825c8))


### Features

* Add FilePicker, FilePicker.Tab components. ([560834d](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/560834dfcdf3cc13b5a651e082b312b198c3d31b))
* Add FilePicker.AmberTab. ([d5ad0fd](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/d5ad0fdb39d74dea17a0873d9d4f2b94c639bb45))
* Add placeholder tests. ([5dcfed4](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/5dcfed4828701339822fe749e8ab4919d348736b))
* Add SmartMediaEditor to FilePicker package. ([1109942](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/1109942c605b344d5b7eb6cdfc84425580c52eff))
* Add working file-picker example. ([0991791](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/09917910979c034ffee4b5f686dfb04216781f6d))
* Initial working demo with SmartMediaEditor. ([0e1d2a6](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/0e1d2a6cc04a0980b64f59e892c5db8375910b65))
* Pass onCancel prop to FilePickerProvider. ([5a798ba](https://git.faithlife.dev/Logos/FaithlifeEquipment/commits/5a798ba50710f525a258eba21c8a71ad44879a40))
