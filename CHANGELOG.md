# Changelog

## 6.0.0 (2025-07-10)

### Breaking Changes

We're excited to announce an update for the Business Text Panel! The latest version, fully compatible with Grafana 11 and Grafana 12, is now available under our new plugin ID: `volkovlabs-text-panel`. This enhancement ensures seamless integration and improved functionality for your dashboards.

### Changed

- Updated Decimals setting support in panel options (#422)
- Updated to Grafana 12 and dependencies (#424)
- Updated status color settings to prevent render extra column (#421)

## 5.7.0 (2025-03-05)

### Added

- Added context.grafana.refresh (#387)

### Changed

- Updated external resources usage (#384)
- Updated to Grafana 11.5 and dependencies (#402)
- Updated release workflow to include attestation (#402)

## 5.6.0 (2024-12-15)

### Changed

- Updated packages for Code Editor (#380)

## 5.5.0 (2024-12-09)

### Added

- Added helper statusColor from specific field (#375)
- Added replace variables in URLs (#376)

### Changed

- Updated Autosize Code Editor toolbar (#362)
- Updated E2E tests (#377)
- Updated to Grafana 11.4 and dependencies (#378)

## 5.4.0 (2024-09-12)

### Added

- Added wrap button in the code editor (#359)

### Changed

- Updated panel render if first data source does not have data (#353)
- Updated Partials loading (#358)
- Updated hyperlinks style (#358)

## 5.3.0 (2024-08-22)

### Added

- Added partials to load external HTML (#345)
- Added Expandable Editors (#348)

### Changed

- Updated Provisioning Dashboard (#346)

## 5.2.0 (2024-07-25)

### Changed

- Updated helpers migration (#338)
- Updated to Grafana 11.1 and dependencies (#339)

## 5.1.0 (2024-07-01)

### Added

- Added running e2e tests in docker (#323)

### Changed

- Updated before render code async and pass markdown instance (#322)
- Updated Video tutorial (#330)

## 5.0.0 (2024-06-06)

### Breaking Changes

- Requires Grafana 10 and Grafana 11.
- Removed external scripts deprecated in Grafana 11. Use import instead.
- Removed non-context code parameters. Please update parameters to use `context`.

### Code Parameters Migration Guide

- data -> context.data
- dataFrame -> context.dataFrame
- eventBus -> context.grafana.eventBus
- getLocale -> context.grafana.getLocale
- handlebars -> context.handlebars
- locationService -> context.grafana.locationService
- panelData -> context.panelData
- replaceVariables -> context.grafana.replaceVariables
- timeRange -> context.grafana.timeRange
- timezone -> context.grafana.timezone

### Added

- Added plugin e2e tests and remove cypress (#301)
- Added ES6 Modules Support (#312)
- Added Units and Decimal in panel options (#311)

### Changed

- Updated name to Business Text Panel (#304)
- Prepared for Grafana 11 (#304)
- Updated to Grafana 11.0 and dependencies (#315)

## 4.5.0 (2024-03-13)

### Added

- Added Info message if sanitize enabled (#290)

### Changed

- Updated CSS styles responsive and supporting themes (#281)
- Updated to Grafana 10.4.0 (#291)

## 4.4.0 (2024-03-06)

### Breaking Changes

- Requires Grafana 9.2 and Grafana 10

### Added

- Added theme object, notifySuccess & notifyError (#270)
- Added Replace custom code parameters with Code Parameters Builder (#285)

### Changed

- Updated context parameter (#270)
- Updated dependencies and Actions (#271)
- Updated CSS class for the Panel instead of a Row (#272)
- Updated Editor auto height from fixed value (#278)
- Disabled unitScale and fieldMinMax standard panel options (#286)

### Bug Fixes

- Fixed statusColor for Row (#280)

## 4.3.0 (2023-12-25)

### Added

- Added data render mode and passing selected data frame (#246)
- Added variableValue helper (#252)
- Added re-render on dashboard refresh (#252)

### Changed

- Updated ESLint configuration and refactor (#239)
- Updated Collapse from @volkovlabs/components (#239)
- Updated Introduction video in README (#240)
- Updated to Grafana 10.2.2 and Volkov labs packages (#247)

### Bug Fixes

- Fixed draggable icon in Grafana 10.3 (#249)

## 4.2.0 (2023-11-20)

### Added

- Added ESLint deprecation check (#203)
- Added custom code option which is called after content is ready (#231)
- Added option to enabled/disable wrapping to support empty lines in HTML (#235)
- Added handlebars (startsWith, endsWith, match) (#211)

### Changed

- Updated ESLint configuration and sort imports (#236)
- Updated to Plugin Tools 2.1.1 (#236)
- Used Grafana Access Policy to sign plugin (#236)
- Updated to Grafana 10.2.1 (#237)

## 4.1.0 (2023-07-16)

### Added

- Added status field (#196)
- Added External JavaScript, CSS Resources (#197)

### Changed

- Updated ESLint configuration (#192)
- Increased Tests Coverage (#194)
- Updated to Grafana 10.0.2 dependencies (#201)

## 4.0.0 (2023-06-26)

### Breaking Changes

- Requires Grafana 9 and Grafana 10

### Added

- Added Event Bus object to JavaScript function (#179)
- Added E2E Cypress testing (#184)
- Added Support Variables in CSS styles editor (#185)

### Changed

- Increased Test Coverage and updated to testing-library/react (#177)
- Migrated to Plugin Tools 1.5.2 (#183)
- Updated to Grafana 10.0.0 (#166, #178, #183)
- Updated to Node 18 and npm (#183)
- Removed Grafana 8.5 support (#183)

## 3.1.0 (2023-03-12)

### Added

- Added Time Zone and Range parameters for Javascript Code (#155)
- Added Magic (JavaScript) Trio tutorial in README (#157)
- Added Replace variables and Location service parameters for Javascript Code (#160)

### Changed

- Updated to Grafana 9.4.3 (#156)
- Updated replace variables with scoped function (#160)

## 3.0.0 (2023-02-19)

### Breaking Changes

The default Content and JavaScript editors are not displayed by default unless values were modified. To display required editors, including the new Styles, they should be selected in the list.

### Added

- Added custom styles (#149)
- Added option to display optional editors (#149)
- Added Code Syntax Highlight (#151)
- Added Breaking Changes for displaying optional editors (#152)

### Changed

- Updated README features with new JavaScript Code Editor (#141)
- Updated to Grafana 9.3.6 (#147)
- Updated CI and Release workflows (#147)
- Updated README to include JavaScript tutorial (#148)
- Removed Panel Padding (#150)

## 2.2.0 (2023-01-09)

### Added

- Added JSON helper to show objects and arrays (#121)
- Added Split Helper (#132)
- Added JavaScript Code to add Handlebars helpers and Event handlers (#134)
- Added `getLocale()` parameter to JavaScript Code (#137)

### Changed

- Updated to Grafana 9.3.1 (#122)
- Updated Documentation links (#130, #131)
- Refactored Text Component and Styles (#133)
- Updated default Content to `{{json @root}}` and Code Editor height to `200px` (#134)
- Updated CSS to fit images to screen (#135)

## 2.1.0 (2022-11-27)

### Breaking Changes

Refactoring may introduce breaking changes. Please test before upgrading in Production.

### Added

- Added feature of parsing time formatting syntax (#86)
- Added Support for Disable Sanitize HTML configuration (#118)

### Changed

- Fixed broken link in README (#111)
- Updated CI to upload signed artifacts (#113)
- Fixed data rendering when using transformations (#98)
- Updated Panel Options to Monaco Code Editor (#114)
- Increased Test Coverage (#114)
- Refactored and updated images (#116)
- Refactored Alert Message and Text Options (#117)

## 2.0.0 (2022-11-02)

### Breaking Changes

This release bumps the minimum required Grafana to >=8.5.

### Added

- Added "Dynamic Text Plugin for Grafana" video in README (#106)

### Changed

- Maintained by Volkov Labs (#100)
- Updated based on Volkov Labs Panel Template (#100)
- Updated to Grafana 9.1.6 (#104)
- Updated CI to Node 16 and Synchronize with Release workflow (#107)
- Updated to Grafana 9.2.2 (#108)
- Updated screenshot and provisioning (#109)

## 1.9.0 (2022-01-09)

### Added

- Added an option to render template for each row or as a single template. Useful for when you want to create tables from the query result. (#53) Thanks @andykingking.

### Bug Fixes

- The dropdown for selecting between multiple frames wasn't visible due to overflow. (#65)

## 1.8.0 (2021-11-19)

### Added

- Added `contains` helper (#48)

### Changed

- Upgraded dependencies

## 1.7.2 (2021-06-21)

### Changed

- Improved error handling. Avoids having to refresh the dashboard on template errors.

## 1.7.1 (2021-06-15)

### Changed

- Updated docs and metadata
- Upgraded dependencies

## 1.7.0 (2021-03-08)

### Added

- Added options for default content for empty query results (#15)

## 1.6.0 (2021-03-04)

### Changed

- Improved error handling

## 1.5.0 (2021-02-16)

### Changed

- Avoided recompiling templates on every render

## 1.4.0 (2021-01-08)

### Changed

- Updated @grafana/\* packages
- Improved styling for tables and blockquotes

## 1.3.0 (2021-01-08)

### Added

- Added support for HTML tags in templates (#4)
- Added additional conditional operator (#3)

## 1.2.1 (2020-11-27)

### Changed

- Updated `@grafana` dependencies from `^7.0.0` to `^7.3.0`
- Improved release process using the new [GitHub workflows](https://github.com/grafana/plugin-workflows) for Grafana plugins
- Added screenshot
