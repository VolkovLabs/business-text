# Dynamic Text Panel for Grafana

![Text](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/raw/main/src/img/screenshot.png)

![Grafana](https://img.shields.io/badge/Grafana-10.2-orange)
![CI](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/actions/workflows/codeql-analysis.yml)

## Introduction

Dynamic Text Panel is a Grafana visualization plugin that converts plain text and table data into visually appealing, easy-to-read information cards.

The Dynamic Text Panel plugin allows you to construct a text visualization template from the values of a dataset returned by a data source query.

[![Dynamic Text plugin for Grafana | Use HTML, Markdown, JavaScript and CSS | Community use cases](https://raw.githubusercontent.com/volkovlabs/volkovlabs-dynamictext-panel/main/img/video.png)](https://youtu.be/AcQi-6GCrNU)

## Requirements

- Dynamic Text Panel 4.X requires **Grafana 9** or **Grafana 10**.
- Dynamic Text Panel 2.X and 3.X require **Grafana 8.5** or **Grafana 9**.
- Dynamic Text Panel 1.X requires **Grafana 7**.

## Getting Started

You can install Dynamic Text Panel from the [Grafana Plugins catalog](https://grafana.com/grafana/plugins/marcusolsson-dynamictext-panel/) or using the Grafana command line tool.

For the latter, please use the following command:

```bash
grafana-cli plugins install marcusolsson-dynamictext-panel
```

## Highlights

- Uses Monaco Code Editor with automatic formatting supporting templates, JS code snippets, and CSS styling.
- Supports [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage).
- Renders [markdown-it](https://github.com/markdown-it/markdown-it) into HTML elements.
  - Supports the highlighting of code syntax using A11Y styles.
- Provides code sanitization:
  - HTML inside templates is sanitized using [XSS](https://jsxss.com/en/index.html).
  - Can be disabled in the Grafana configuration through the `disable_sanitize_html` parameter.
- Supports display of nested objects using the `{{json object}}` Handlebars helper.
- Supports display of time global variables (`__to` and `__from`) as seconds, ISO timestamps, or formatted using the `dayjs` library.
- Supports adding the Handlebars helpers and event handlers.
- Supports adding CSS styles.
- Supports internationalization using custom helpers.

## Documentation

| Section                                                                              | Description                                                    |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| [Content](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/content/)       | Explains how to create a visualization template for your data. |
| [Recipes](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/recipes/)       | Useful snippets that you can use in your templates.            |
| [Features](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/features/)     | Demonstrates panel features.templates.                         |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/release/) | Stay up to date with the latest features and updates.          |

## Feedback

We're looking forward to hearing from you. You can use different ways to get in touch with us.

- Ask a question, request a new feature, or report an issue at [GitHub issues](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/issues).
- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and leave your comments.
- Sponsor our open-source plugins for Grafana at [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Support our project by starring the repository.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/blob/main/LICENSE).
