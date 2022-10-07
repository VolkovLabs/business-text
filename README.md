# Dynamic text panel plugin for Grafana

![Text](https://github.com/VolkovLabs/volkovlabs-dynamictext-panel/raw/main/src/img/screenshot.png)

[![Grafana 8](https://img.shields.io/badge/Grafana-8.2.7-orange)](https://www.grafana.com)
![CI](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-dynamictext-panel)

## Introduction

A panel plugin for Grafana for dynamic, data-driven text.

While the built-in Text panel in Grafana does support variables, that's about as dynamic it gets. This panel lets you define a text template using the data from your data source query.

### Requirements

- Grafana 7.0+ is required for version 1.X.

## Getting Started

The Dynamic Text panel can be installed from the Grafana Catalog or use the `grafana-cli` tool to install from the command line:

```bash
grafana-cli plugins install marcusolsson-dynamictext-panel
```

## Features

- Supports [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage).
- Uses [markdown-it](https://github.com/markdown-it/markdown-it) for rendering Markdown to HTML.
- HTML inside templates is sanitized using [XSS](https://jsxss.com/en/index.html) through [textUtil](https://grafana.com/docs/grafana/latest/packages_api/data/textutil/).

## Documentation

Full documentation for the plugin is available on the [volkovlabs.io](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel).

## Feedback

We love to hear from users, developers, and the whole community interested in this plugin. These are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/issues/new/choose).
- Star the repository to show your support.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-dynamictext-panel/blob/main/LICENSE).
