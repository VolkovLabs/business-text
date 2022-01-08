# Changelog

## 1.9.0 (2022-01-09)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.8.0...v1.9.0)

### Enhancements

- Add an option to render template for each row or as a single template. Useful for when you want to create tables from the query result. [#53](https://github.com/marcusolsson/grafana-dynamictext-panel/pull/53) (thanks [@andykingking](https://github.com/andykingking)!)

### Bug fixes

- The dropdown for selecting between multiple frames wasn't visible due to overflow. [#65](https://github.com/marcusolsson/grafana-dynamictext-panel/issues/65)

## 1.8.0 (2021-11-19)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.7.2...v1.8.0)

### Enhancements

- Add `contains` helper ([#48](https://github.com/marcusolsson/grafana-dynamictext-panel/issues/48))
- Upgrade dependencies

## 1.7.2 (2021-06-21)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.7.1...v1.7.2)

### Enhancements

- Improve error handling. Avoids having to refresh the dashboard on template errors.

## 1.7.1 (2021-06-15)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.7.0...v1.7.1)

### Enhancements

- Update docs and metadata
- Upgrade dependencies

## 1.7.0 (2021-03-08)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.6.0...v1.7.0)

### Enhancements

- Add options for default content for empty query results ([#15](https://github.com/marcusolsson/grafana-dynamictext-panel/issues/15))

## 1.6.0 (2021-03-04)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.5.0...v1.6.0)

### Enhancements

- Improved error handling

## 1.5.0 (2021-02-16)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.4.0...v1.5.0)

### Enhancements

- Avoid recompiling templates on every render

## 1.4.0 (2021-01-08)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.3.0...v1.4.0)

### Enhancements

- Update @grafana/* packages
- Improved styling for tables and blockquotes

## 1.3.0 (2021-01-08)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.2.1...v1.3.0)

### Enhancements

- Support for HTML tags in templates ([#4](https://github.com/marcusolsson/grafana-dynamictext-panel/issues/4))
- Add additional conditional operator ([#3](https://github.com/marcusolsson/grafana-dynamictext-panel/issues/3))

## 1.2.1 (2020-11-27)

[Full changelog](https://github.com/marcusolsson/grafana-dynamictext-panel/compare/v1.2.0...v1.2.1)

### Enhancements

- Updated `@grafana` dependencies from `^7.0.0` to `^7.3.0`
- Improved release process using the new [GitHub workflows](https://github.com/grafana/plugin-workflows) for Grafana plugins
- Add screenshot
