# Business Text for Grafana

![Text](https://github.com/VolkovLabs/business-text/raw/main/src/img/screenshot.png)

![Grafana](https://img.shields.io/badge/Grafana-11.4-orange)
![CI](https://github.com/volkovlabs/business-text/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/business-text/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/business-text/branch/main/graph/badge.svg)](https://codecov.io/gh/VolkovLabs/business-text)
[![CodeQL](https://github.com/VolkovLabs/business-text/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/business-text/actions/workflows/codeql-analysis.yml)

## Introduction

The Business Text panel plugin allows you to construct a text visualization template from the values of a dataset returned by a data source query.

[![Business Text plugin for Grafana | Use HTML, Markdown, JavaScript and CSS | Community use cases](https://raw.githubusercontent.com/volkovlabs/business-text/main/img/business-text.png)](https://youtu.be/UVMysEjouNo)

## Requirements

- Business Text panel 5.X requires **Grafana 10** or **Grafana 11**.
- Dynamic Text panel 4.X requires **Grafana 9.2** or **Grafana 10**.
- Dynamic Text panel 2.X and 3.X require **Grafana 8.5** or **Grafana 9**.
- Dynamic Text panel 1.X requires **Grafana 7**.

## Getting Started

You can install the Business Text panel from the [Grafana Plugins catalog](https://grafana.com/grafana/plugins/marcusolsson-dynamictext-panel/) or use the Grafana command line tool.

For the latter, please use the following command:

```bash
grafana cli plugins install marcusolsson-dynamictext-panel
```

[![Install Business Suite plugins in Cloud, OSS, Enterprise | Open source community plugins](https://raw.githubusercontent.com/volkovlabs/.github/main/started.png)](https://youtu.be/1qYzHfPXJF8)

## Highlights

- Uses Monaco Code Editor with automatic JavaScript code formatting.
- Supports [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage).
- Renders [markdown-it](https://github.com/markdown-it/markdown-it) into HTML elements.
  - Supports the highlighting of code syntax using A11Y styles.
- Provides code sanitization:
  - HTML inside templates is sanitized using [XSS](https://jsxss.com/en/index.html).
  - Can be disabled in the Grafana configuration through the `disable_sanitize_html` parameter.
- Supports display of nested objects using the `{{json object}}` Handlebars helper.
- Supports display of time global variables (`__to` and `__from`) as seconds, ISO timestamps, or formatted using the `dayjs` library.
- Supports adding the Handlebars helpers and event handlers.
- Supports adding CSS styles with dashboard variables.
- Supports internationalization using custom helpers.

## Documentation

| Section                                                               | Description                                                   |
| --------------------------------------------------------------------- | ------------------------------------------------------------- |
| [Rendering](https://volkovlabs.io/plugins/business-text/content/)     | Explains how to create a visualization template for your data |
| [Recipes](https://volkovlabs.io/plugins/business-text/recipes/)       | Useful snippets that you can use in your templates            |
| [Features](https://volkovlabs.io/plugins/business-text/features/)     | Demonstrates panel features.templates                         |
| [Tutorials](https://volkovlabs.io/plugins/business-text/tutorials/)   | Easy to follow tutorials                                      |
| [Release Notes](https://volkovlabs.io/plugins/business-text/release/) | Stay up to date with the latest features and updates          |

## Business Suite for Grafana

The Business Suite is a collection of open source plugins created and actively maintained by Volkov Labs.

The collection aims to solve the most frequent business tasks by providing an intuitive interface with detailed written documentation, examples, and video tutorials.

[![Business Suite for Grafana](https://raw.githubusercontent.com/VolkovLabs/.github/main/business.png)](https://volkovlabs.io/plugins/)

### Enterprise Support

With the [Business Suite Enterprise](https://volkovlabs.io/pricing/), you're not just getting a product, you're getting a complete support system. You'll have a designated support team ready to tackle any issues.

You can contact us via Zendesk, receive priority in feature requests and bug fixes, meet with us for in-person consultation, and get access to the Business Intelligence. It's a package that's designed to make your life easier.

## Always happy to hear from you

- Ask a question, request a new feature, or report an issue at [GitHub issues](https://github.com/volkovlabs/business-text/issues).
- Subscribe to our [YouTube Channel](https://youtube.com/@volkovlabs) and leave your comments.
- Become a [Business Suite sponsor](https://github.com/sponsors/VolkovLabs).

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/business-text/blob/main/LICENSE).
