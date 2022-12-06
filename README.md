# Dynamic Text Panel for Grafana

![Text](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/raw/main/src/img/screenshot.png)

[![Grafana](https://img.shields.io/badge/Grafana-9.3.1-orange)](https://www.grafana.com)
![CI](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/actions/workflows/codeql-analysis.yml)

## Introduction

A Dynamic Text panel is a plugin for Grafana for dynamic, data-driven text with Markdown and Handlebars support.

While the built-in Text panel in Grafana does support variables, that's about as dynamic it gets. This panel lets you define a text template using the data from your data source query.

[![Dynamic Text Plugin for Grafana | Markdown, HTML and Handlebars to transform data visualizations](https://raw.githubusercontent.com/volkovlabs/volkovlabs-dynamictext-panel/main/img/video.png)](https://youtu.be/MpNZ4Yl-p0U)

### Requirements

- **Grafana 8.5+**, **Grafana 9.0+** is required for version 2.X.
- **Grafana 7.0+** is required for version 1.X.

## Getting Started

The Dynamic Text panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/marcusolsson-dynamictext-panel/) or use the `grafana-cli` tool to install from the command line:

```bash
grafana-cli plugins install marcusolsson-dynamictext-panel
```

## Features

- Uses Monaco Code Editor with Auto formatting to update Templates.
- Supports [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage).
- Uses [markdown-it](https://github.com/markdown-it/markdown-it) for rendering Markdown to HTML.
- HTML inside templates is sanitized using [XSS](https://jsxss.com/en/index.html) through `textUtil`.
- Allows to display Time global variables (`__to` and `__from`) as seconds, ISO, and formatted using `dayjs`.
- Supports disable Sanitizing using Grafana configuration `disable_sanitize_html`.
- Allows to display nested objects using `{{json object}}` Handlebars helper.

## Content

To display data from your query result, enter the name of the field surrounded by double braces. For example, to display the value from the `Time` field:

```
{{Time}}
```

Panels renders the template for every row in the query result. If a query returns multiple query results, you can select the query result you wish to display from a drop-down menu.

Template support text processing using one or more helpers and recipies:

- [Helpers](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/helpers) - functions that let you perform text transformation within your template.
- [Recipes](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/recipes) - useful snippets that you can use in your templates.

The panel renders Handlebars → Markdown → Sanitized HTML and displays the final result.

### Default content

Whenever the data source query returns an empty result, Grafana displays the template in **Default content**. This can be useful to provide users with instructions on what to do, or who to contact, when the query returns an empty result.

Even though there's no data from the data source, you can still use the available [helpers](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/helpers).

### Sanitizing

Sanitizing is enabled by default and some elements like `<button>` are unavailable in the content.

To disable sanitizing, panel depends on the Grafana configuration option [`disable_sanitize_html`](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#disable_sanitize_html). For Docker container and Docker Compose, use as:

```bash
- GF_PANELS_DISABLE_SANITIZE_HTML=true
```

## Every row vs All rows

By default, the template configured in the **Content** field is rendered for each record in the result. You can render this template only once by selecting `All rows`. In this case, the query results are passed in as the `data` field to the template.

Handlebars provides a [builtin-helper](https://handlebarsjs.com/guide/builtin-helpers.html#each) to iterate over these records.

If your data source returns the following data:

```md
| app  | description                  | cluster | tier     |
| ---- | ---------------------------- | ------- | -------- |
| auth | Handles user authentication. | prod    | frontend |
```

You can then write Markdown with placeholders for the data you want to use. The value inside each double brace expression refers to a field in the query result.

```md
# {{app}}

{{description}}

{{#if (eq tier "frontend")}}
Link: <a href='https://{{cluster}}.example.com/{{app}}'>https://{{cluster}}.example.com/{{app}}</a>
{{/if}}
```

## Feedback

We love to hear from users, developers, and the whole community interested in this plugin. These are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/blob/main/LICENSE).
