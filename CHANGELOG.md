# Changelog

## 2.0.0 (2022-11-02)

### Breaking changes

This release bumps the minimum required Grafana to >=8.5.

### Features / Enhancements

- Maintained by Volkov Labs (#100)
- Updated based on Volkov Labs Panel Template (#100)
- Update to Grafana 9.1.6 (#104)
- Add "Dynamic Text Plugin for Grafana" video in README (#106)
- Update CI to Node 16 and Synchronize with Release workflow (#107)
- Update to Grafana 9.2.2 (#108)
- Update screenshot and provisioning (#109)

## 1.9.0 (2022-01-09)

### Features / Enhancements

- Add an option to render template for each row or as a single template. Useful for when you want to create tables from the query result. (#53) Thanks @andykingking.

### Bug fixes

- The dropdown for selecting between multiple frames wasn't visible due to overflow. (#65)

## 1.8.0 (2021-11-19)

### Features / Enhancements

- Add `contains` helper (#48)
- Upgrade dependencies

## 1.7.2 (2021-06-21)

### Features / Enhancements

- Improve error handling. Avoids having to refresh the dashboard on template errors.

## 1.7.1 (2021-06-15)

### Features / Enhancements

- Update docs and metadata
- Upgrade dependencies

## 1.7.0 (2021-03-08)

### Features / Enhancements

- Add options for default content for empty query results (#15)

## 1.6.0 (2021-03-04)

### Features / Enhancements

- Improved error handling

## 1.5.0 (2021-02-16)

### Features / Enhancements

- Avoid recompiling templates on every render

## 1.4.0 (2021-01-08)

### Features / Enhancements

- Update @grafana/\* packages
- Improved styling for tables and blockquotes

## 1.3.0 (2021-01-08)

### Features / Enhancements

- Support for HTML tags in templates (#4)
- Add additional conditional operator (#3)

## 1.2.1 (2020-11-27)

### Features / Enhancements

- Updated `@grafana` dependencies from `^7.0.0` to `^7.3.0`
- Improved release process using the new [GitHub workflows](https://github.com/grafana/plugin-workflows) for Grafana plugins
- Add screenshot
