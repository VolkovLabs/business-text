# Dynamic text for Grafana

[![Build](https://github.com/marcusolsson/grafana-dynamictext-panel/workflows/CI/badge.svg)](https://github.com/marcusolsson/grafana-dynamictext-panel/actions?query=workflow%3A%22CI%22)
[![Release](https://github.com/marcusolsson/grafana-dynamictext-panel/workflows/Release/badge.svg)](https://github.com/marcusolsson/grafana-dynamictext-panel/actions?query=workflow%3ARelease)
[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-dynamictext-panel%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-dynamictext-panel)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-dynamictext-panel%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-dynamictext-panel)
[![License](https://img.shields.io/github/license/marcusolsson/grafana-dynamictext-panel)](LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/marcusolsson?color=%231DA1F2&label=twitter&style=plastic)](https://twitter.com/marcusolsson)

> **Maintenance**: As I'm no longer working at Grafana Labs, nor am I using Grafana where I'm at now, **I'm no longer able to actively maintain this plugin**. I'm exploring ways to keep the project going. Check back here to stay updated!

A panel plugin for [Grafana](https://grafana.com) for dynamic, data-driven text.

While the built-in Text panel in Grafana does support variables, that's about as dynamic it gets. This panel lets you define a text template using the data from your data source query.

- Supports [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage)
- Uses [markdown-it](https://github.com/markdown-it/markdown-it) for rendering Markdown to HTML

![Screenshot](https://github.com/marcusolsson/grafana-dynamictext-panel/raw/main/src/img/dark.png)

## Documentation

Full documentation for the plugin is available on the [website](https://marcusolsson.github.io/grafana-dynamictext-panel).

## Security

HTML inside templates is sanitized using [XSS](https://jsxss.com/en/index.html) through [textUtil](https://grafana.com/docs/grafana/latest/packages_api/data/textutil/).

## Maintenance

I maintain [several plugins](https://marcus.se.net/projects/) for Grafana. While my employer allows me to spend some time on developing plugins, most of the work happens on evenings and weekends. At the moment, I'm prioritizing fixing bugs and reviewing PRs over introducing new features.

If you'd still like to propose a new feature, [create a new Discussion](https://github.com/marcusolsson/grafana-dynamictext-panel/discussions/new?category=ideas). While I likely won't be able to work on features myself, I'd be happy to accept pull requests. If you'd like to contribute a feature, please let me know before you start working on it.
