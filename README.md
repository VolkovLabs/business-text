# Dynamic Text Panel for Grafana

![Text](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/raw/main/src/img/screenshot.png)

![Grafana](https://img.shields.io/badge/Grafana-10.0.0-orange)
![CI](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/actions/workflows/codeql-analysis.yml)

## Introduction

A Dynamic Text visualization panel is a Grafana plugin that transforms monotone text/table data into vibrant, easy-to-read information cards. The panel supports variables, Markdown and Handlebars.

The Dynamic Text visualization panel lets you define a text template using the data from your data source query.

[![Dynamic Text Plugin for Grafana | Markdown, HTML and Handlebars to transform data visualizations](https://raw.githubusercontent.com/volkovlabs/volkovlabs-dynamictext-panel/main/img/video.png)](https://youtu.be/MpNZ4Yl-p0U)

## Requirements

- **Grafana 9** and **Grafana 10** are required for major version 4.
- **Grafana 8.5** and **Grafana 9** are required for major versions 2 and 3.
- **Grafana 7** is required for major version 1.

## Getting Started

The Dynamic Text visualization panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/marcusolsson-dynamictext-panel/) or utilizing the Grafana command line tool.

For the latter, use the following command.

```bash
grafana-cli plugins install marcusolsson-dynamictext-panel
```

## Highlights

- Uses Monaco Code Editor with Auto formatting to update Templates, JavaScript Code and Styles.
- Supports [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage).
- Uses [markdown-it](https://github.com/markdown-it/markdown-it) for rendering Markdown to HTML.
  - Supports Code syntax highlight using a11y styles.
- Sanitizing
  - HTML inside templates is sanitized using [XSS](https://jsxss.com/en/index.html).
  - Can be disabled using Grafana configuration `disable_sanitize_html`.
- Allows to display nested objects using `{{json object}}` Handlebars helper.
- Allows displaying Time global variables (`__to` and `__from`) as seconds, ISO, and formatted using `dayjs`.
- Allows adding Handlebars helpers and Event handlers.
- Allows adding CSS styles.

## Documentation

| Section                  | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| [Content](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/content)       | Explains how to create a visualization template for your data. |
| [Recipes](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/recipes)      | Useful snippets that you can use in your templates.                                        |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/release) | Stay up to date with the latest features and updates.          |

### Features

| Section                 | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| [Data](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/data)            | Demonstrates how to use the Every Row and All Rows options.                                |
| [JavaScript Code](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/code) | Demonstrates how to add Handlebars helpers and Event handlers.                             |
| [Styles](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/styles)        | Demonstrates how to add CSS styles.                                                        |
| [Helpers](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/helpers)      | Helpers are functions that let you perform basic text transformation within your template. |
| [Variables](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/variables)  | Demonstrates how to use variables.                                                         |

## Tutorial

This video outlines all the new features we implemented, including the most asked-for JavaScript area code.

[![JavaScript code in the Dynamic text panel | Grafana functionality explodes](https://raw.githubusercontent.com/volkovlabs/volkovlabs-dynamictext-panel/main/img/javascript.png)](https://youtu.be/lJqk5Gobec4)

Three plugins that make Grafana complete. Dynamic Text, Data Manipulation, and Apache ECharts are all you need to create functional real-world web applications.

[![Magic JavaScript trio for Grafana | Dynamic Text, Data Manipulation and Apache ECharts plugins](https://raw.githubusercontent.com/volkovlabs/volkovlabs-dynamictext-panel/main/img/magic-trio.png)](https://youtu.be/wPr4gZYzUVA)

## Feedback

We love to hear from you. There are various ways to get in touch with us.

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/issues/new/choose).
- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and add a comment.
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/blob/main/LICENSE).
