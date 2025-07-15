# Changelog

All notable changes to the **Business Text Panel** (formerly Dynamic Text Plugin) for Grafana will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.0.0] - 2025-07-15

### Breaking Changes

- Now requires Grafana 11 or 12.

### Added

- Added User Preferences functionality ([#425](https://github.com/VolkovLabs/business-text/issues/425)).

### Changed

- Enhanced Decimals setting support in panel options ([#422](https://github.com/VolkovLabs/business-text/issues/422)).
- Updated to Grafana 12 with dependency upgrades ([#424](https://github.com/VolkovLabs/business-text/issues/424)).
- Fixed status color settings to avoid rendering extra columns ([#421](https://github.com/VolkovLabs/business-text/issues/421)).

## [5.7.0] - 2025-03-05

### Added

- Introduced `context.grafana.refresh` for improved refresh handling ([#387](https://github.com/VolkovLabs/business-text/issues/387)).

### Changed

- Optimized external resource usage ([#384](https://github.com/VolkovLabs/business-text/issues/384)).
- Updated to Grafana 11.5 with dependency updates ([#402](https://github.com/VolkovLabs/business-text/issues/402)).
- Added attestation to release workflow ([#402](https://github.com/VolkovLabs/business-text/issues/402)).

## [5.6.0] - 2024-12-15

### Changed

- Updated packages for Code Editor functionality ([#380](https://github.com/VolkovLabs/business-text/issues/380)).

## [5.5.0] - 2024-12-09

### Added

- Added `statusColor` helper for specific field styling ([#375](https://github.com/VolkovLabs/business-text/issues/375)).
- Enabled variable replacement in URLs ([#376](https://github.com/VolkovLabs/business-text/issues/376)).

### Changed

- Improved Autosize Code Editor toolbar ([#362](https://github.com/VolkovLabs/business-text/issues/362)).
- Updated E2E tests ([#377](https://github.com/VolkovLabs/business-text/issues/377)).
- Updated to Grafana 11.4 with dependency upgrades ([#378](https://github.com/VolkovLabs/business-text/issues/378)).

## [5.4.0] - 2024-09-12

### Added

- Added wrap button to the code editor ([#359](https://github.com/VolkovLabs/business-text/issues/359)).

### Changed

- Improved panel rendering when the first data source has no data ([#353](https://github.com/VolkovLabs/business-text/issues/353)).
- Enhanced partials loading and hyperlinks styling ([#358](https://github.com/VolkovLabs/business-text/issues/358)).

## [5.3.0] - 2024-08-22

### Added

- Introduced partials for loading external HTML ([#345](https://github.com/VolkovLabs/business-text/issues/345)).
- Added expandable editors for better usability ([#348](https://github.com/VolkovLabs/business-text/issues/348)).

### Changed

- Updated provisioning dashboard features ([#346](https://github.com/VolkovLabs/business-text/issues/346)).

## [5.2.0] - 2024-07-25

### Changed

- Streamlined helpers migration process ([#338](https://github.com/VolkovLabs/business-text/issues/338)).
- Updated to Grafana 11.1 with dependency updates ([#339](https://github.com/VolkovLabs/business-text/issues/339)).

## [5.1.0] - 2024-07-01

### Added

- Added support for running E2E tests in Docker ([#323](https://github.com/VolkovLabs/business-text/issues/323)).

### Changed

- Made before-render code asynchronous and passed markdown instance ([#322](https://github.com/VolkovLabs/business-text/issues/322)).
- Updated video tutorial content ([#330](https://github.com/VolkovLabs/business-text/issues/330)).

## [5.0.0] - 2024-06-06

### Breaking Changes

- Now requires Grafana 10 or 11.
- Removed external scripts (deprecated in Grafana 11); use `import` instead.
- Deprecated non-context code parameters; update to use `context` (see migration guide below).

### Code Parameters Migration Guide

- `data` → `context.data`
- `dataFrame` → `context.dataFrame`
- `eventBus` → `context.grafana.eventBus`
- `getLocale` → `context.grafana.getLocale`
- `handlebars` → `context.handlebars`
- `locationService` → `context.grafana.locationService`
- `panelData` → `context.panelData`
- `replaceVariables` → `context.grafana.replaceVariables`
- `timeRange` → `context.grafana.timeRange`
- `timezone` → `context.grafana.timezone`

### Added

- Introduced plugin E2E tests, replacing Cypress ([#301](https://github.com/VolkovLabs/business-text/issues/301)).
- Added ES6 Modules support ([#312](https://github.com/VolkovLabs/business-text/issues/312)).
- Added Units and Decimals in panel options ([#311](https://github.com/VolkovLabs/business-text/issues/311)).

### Changed

- Renamed to **Business Text Panel** ([#304](https://github.com/VolkovLabs/business-text/issues/304)).
- Prepared for Grafana 11 compatibility ([#304](https://github.com/VolkovLabs/business-text/issues/304)).
- Updated to Grafana 11.0 with dependency upgrades ([#315](https://github.com/VolkovLabs/business-text/issues/315)).

## [4.5.0] - 2024-03-13

### Added

- Added info message when sanitize is enabled ([#290](https://github.com/VolkovLabs/business-text/issues/290)).

### Changed

- Improved CSS styles for responsiveness and theme support ([#281](https://github.com/VolkovLabs/business-text/issues/281)).
- Updated to Grafana 10.4.0 ([#291](https://github.com/VolkovLabs/business-text/issues/291)).

## [4.4.0] - 2024-03-06

### Breaking Changes

- Requires Grafana 9.2 or 10.

### Added

- Added theme object, `notifySuccess`, and `notifyError` functions ([#270](https://github.com/VolkovLabs/business-text/issues/270)).
- Introduced Code Parameters Builder to replace custom code parameters ([#285](https://github.com/VolkovLabs/business-text/issues/285)).

### Changed

- Updated context parameter handling ([#270](https://github.com/VolkovLabs/business-text/issues/270)).
- Updated dependencies and GitHub Actions ([#271](https://github.com/VolkovLabs/business-text/issues/271)).
- Changed CSS class from Row to Panel ([#272](https://github.com/VolkovLabs/business-text/issues/272)).
- Adjusted editor auto-height from fixed value ([#278](https://github.com/VolkovLabs/business-text/issues/278)).
- Disabled `unitScale` and `fieldMinMax` standard panel options ([#286](https://github.com/VolkovLabs/business-text/issues/286)).

### Bug Fixes

- Fixed `statusColor` for Row elements ([#280](https://github.com/VolkovLabs/business-text/issues/280)).

## [4.3.0] - 2023-12-25

### Added

- Added data render mode and selected data frame passing ([#246](https://github.com/VolkovLabs/business-text/issues/246)).
- Introduced `variableValue` helper and re-render on dashboard refresh ([#252](https://github.com/VolkovLabs/business-text/issues/252)).

### Changed

- Updated ESLint configuration and refactored code ([#239](https://github.com/VolkovLabs/business-text/issues/239)).
- Updated Collapse component from `@volkovlabs/components` ([#239](https://github.com/VolkovLabs/business-text/issues/239)).
- Updated introduction video in README ([#240](https://github.com/VolkovLabs/business-text/issues/240)).
- Updated to Grafana 10.2.2 and Volkov Labs packages ([#247](https://github.com/VolkovLabs/business-text/issues/247)).

### Bug Fixes

- Fixed draggable icon issue in Grafana 10.3 ([#249](https://github.com/VolkovLabs/business-text/issues/249)).

## [4.2.0] - 2023-11-20

### Added

- Added ESLint deprecation check ([#203](https://github.com/VolkovLabs/business-text/issues/203)).
- Introduced custom code option called after content is ready ([#231](https://github.com/VolkovLabs/business-text/issues/231)).
- Added option to enable/disable wrapping for empty lines in HTML ([#235](https://github.com/VolkovLabs/business-text/issues/235)).
- Added Handlebars helpers (`startsWith`, `endsWith`, `match`) ([#211](https://github.com/VolkovLabs/business-text/issues/211)).

### Changed

- Updated ESLint configuration and sorted imports ([#236](https://github.com/VolkovLabs/business-text/issues/236)).
- Updated to Plugin Tools 2.1.1 ([#236](https://github.com/VolkovLabs/business-text/issues/236)).
- Used Grafana Access Policy to sign plugin ([#236](https://github.com/VolkovLabs/business-text/issues/236)).
- Updated to Grafana 10.2.1 ([#237](https://github.com/VolkovLabs/business-text/issues/237)).

## [4.1.0] - 2023-07-16

### Added

- Added status field support ([#196](https://github.com/VolkovLabs/business-text/issues/196)).
- Introduced external JavaScript and CSS resource loading ([#197](https://github.com/VolkovLabs/business-text/issues/197)).

### Changed

- Updated ESLint configuration ([#192](https://github.com/VolkovLabs/business-text/issues/192)).
- Increased test coverage ([#194](https://github.com/VolkovLabs/business-text/issues/194)).
- Updated to Grafana 10.0.2 dependencies ([#201](https://github.com/VolkovLabs/business-text/issues/201)).

## [4.0.0] - 2023-06-26

### Breaking Changes

- Requires Grafana 9 or 10.

### Added

- Added Event Bus object to JavaScript functions ([#179](https://github.com/VolkovLabs/business-text/issues/179)).
- Introduced E2E Cypress testing ([#184](https://github.com/VolkovLabs/business-text/issues/184)).
- Added support for variables in CSS styles editor ([#185](https://github.com/VolkovLabs/business-text/issues/185)).

### Changed

- Increased test coverage and updated to `testing-library/react` ([#177](https://github.com/VolkovLabs/business-text/issues/177)).
- Migrated to Plugin Tools 1.5.2 ([#183](https://github.com/VolkovLabs/business-text/issues/183)).
- Updated to Grafana 10.0.0 ([#166](https://github.com/VolkovLabs/business-text/issues/166), [#178](https://github.com/VolkovLabs/business-text/issues/178), [#183](https://github.com/VolkovLabs/business-text/issues/183)).
- Updated to Node 18 and npm ([#183](https://github.com/VolkovLabs/business-text/issues/183)).
- Removed Grafana 8.5 support ([#183](https://github.com/VolkovLabs/business-text/issues/183)).

## [3.1.0] - 2023-03-12

### Added

- Added Time Zone and Range parameters for JavaScript code ([#155](https://github.com/VolkovLabs/business-text/issues/155)).
- Added "Magic (JavaScript) Trio" tutorial in README ([#157](https://github.com/VolkovLabs/business-text/issues/157)).
- Introduced Replace Variables and Location Service parameters for JavaScript code ([#160](https://github.com/VolkovLabs/business-text/issues/160)).

### Changed

- Updated to Grafana 9.4.3 ([#156](https://github.com/VolkovLabs/business-text/issues/156)).
- Enhanced replace variables with scoped function ([#160](https://github.com/VolkovLabs/business-text/issues/160)).

## [3.0.0] - 2023-02-19

### Breaking Changes

- Default Content and JavaScript editors are hidden unless modified. Select required editors (including new Styles) from the list to display them.

### Added

- Added custom styles support ([#149](https://github.com/VolkovLabs/business-text/issues/149)).
- Introduced option to display optional editors ([#149](https://github.com/VolkovLabs/business-text/issues/149)).
- Added code syntax highlighting ([#151](https://github.com/VolkovLabs/business-text/issues/151)).
- Documented breaking changes for optional editors ([#152](https://github.com/VolkovLabs/business-text/issues/152)).

### Changed

- Updated README with JavaScript Code Editor features ([#141](https://github.com/VolkovLabs/business-text/issues/141)).
- Updated to Grafana 9.3.6 ([#147](https://github.com/VolkovLabs/business-text/issues/147)).
- Updated CI and release workflows ([#147](https://github.com/VolkovLabs/business-text/issues/147)).
- Added JavaScript tutorial to README ([#148](https://github.com/VolkovLabs/business-text/issues/148)).
- Removed panel padding ([#150](https://github.com/VolkovLabs/business-text/issues/150)).

## [2.2.0] - 2023-01-09

### Added

- Added JSON helper for displaying objects and arrays ([#121](https://github.com/VolkovLabs/business-text/issues/121)).
- Introduced Split Helper ([#132](https://github.com/VolkovLabs/business-text/issues/132)).
- Added JavaScript code support for Handlebars helpers and event handlers ([#134](https://github.com/VolkovLabs/business-text/issues/134)).
- Added `getLocale()` parameter to JavaScript code ([#137](https://github.com/VolkovLabs/business-text/issues/137)).

### Changed

- Updated to Grafana 9.3.1 ([#122](https://github.com/VolkovLabs/business-text/issues/122)).
- Updated documentation links ([#130](https://github.com/VolkovLabs/business-text/issues/130), [#131](https://github.com/VolkovLabs/business-text/issues/131)).
- Refactored Text Component and styles ([#133](https://github.com/VolkovLabs/business-text/issues/133)).
- Set default Content to `{{json @root}}` and Code Editor height to `200px` ([#134](https://github.com/VolkovLabs/business-text/issues/134)).
- Adjusted CSS to fit images to screen ([#135](https://github.com/VolkovLabs/business-text/issues/135)).

## [2.1.0] - 2022-11-27

### Breaking Changes

- Refactoring may introduce breaking changes; test before upgrading in production.

### Added

- Added support for time formatting syntax parsing ([#86](https://github.com/VolkovLabs/business-text/issues/86)).
- Introduced option to disable HTML sanitization ([#118](https://github.com/VolkovLabs/business-text/issues/118)).

### Changed

- Fixed broken link in README ([#111](https://github.com/VolkovLabs/business-text/issues/111)).
- Updated CI to upload signed artifacts ([#113](https://github.com/VolkovLabs/business-text/issues/113)).
- Fixed data rendering with transformations ([#98](https://github.com/VolkovLabs/business-text/issues/98)).
- Updated Panel Options to Monaco Code Editor ([#114](https://github.com/VolkovLabs/business-text/issues/114)).
- Increased test coverage ([#114](https://github.com/VolkovLabs/business-text/issues/114)).
- Refactored alert message and text options ([#117](https://github.com/VolkovLabs/business-text/issues/117)).

## [2.0.0] - 2022-11-02

### Breaking Changes

- Minimum required Grafana version bumped to >=8.5.

### Added

- Added "Dynamic Text Plugin for Grafana" video in README ([#106](https://github.com/VolkovLabs/business-text/issues/106)).

### Changed

- Maintained by Volkov Labs ([#100](https://github.com/VolkovLabs/business-text/issues/100)).
- Updated based on Volkov Labs Panel Template ([#100](https://github.com/VolkovLabs/business-text/issues/100)).
- Updated to Grafana 9.1.6 ([#104](https://github.com/VolkovLabs/business-text/issues/104)).
- Updated CI to Node 16 and synchronized with release workflow ([#107](https://github.com/VolkovLabs/business-text/issues/107)).
- Updated to Grafana 9.2.2 ([#108](https://github.com/VolkovLabs/business-text/issues/108)).
- Updated screenshot and provisioning ([#109](https://github.com/VolkovLabs/business-text/issues/109)).

## [1.9.0] - 2022-01-09

### Added

- Added option to render templates per row or as a single template, useful for creating tables from query results ([#53](https://github.com/VolkovLabs/business-text/issues/53)) (Thanks @andykingking).

### Bug Fixes

- Fixed visibility of dropdown for selecting multiple frames due to overflow ([#65](https://github.com/VolkovLabs/business-text/issues/65)).

## [1.8.0] - 2021-11-19

### Added

- Added `contains` helper ([#48](https://github.com/VolkovLabs/business-text/issues/48)).

### Changed

- Upgraded dependencies.

## [1.7.2] - 2021-06-21

### Changed

- Improved error handling to avoid dashboard refresh on template errors.

## [1.7.1] - 2021-06-15

### Changed

- Updated docs and metadata.
- Upgraded dependencies.

## [1.7.0] - 2021-03-08

### Added

- Added options for default content on empty query results ([#15](https://github.com/VolkovLabs/business-text/issues/15)).

## [1.6.0] - 2021-03-04

### Changed

- Improved error handling.

## [1.5.0] - 2021-02-16

### Changed

- Avoided recompiling templates on every render.

## [1.4.0] - 2021-01-08

### Changed

- Updated `@grafana/*` packages.
- Improved styling for tables and blockquotes.

## [1.3.0] - 2021-01-08

### Added

- Added support for HTML tags in templates ([#4](https://github.com/VolkovLabs/business-text/issues/4)).
- Added additional conditional operator ([#3](https://github.com/VolkovLabs/business-text/issues/3)).

## [1.2.1] - 2020-11-27

### Changed

- Updated `@grafana` dependencies from `^7.0.0` to `^7.3.0`.
- Improved release process using GitHub workflows for Grafana plugins.
- Added screenshot.
