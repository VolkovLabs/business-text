# Dynamic text for Grafana

[![License](https://img.shields.io/github/license/marcusolsson/grafana-dynamictext-panel)](LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contribute)
[![Build](https://github.com/marcusolsson/grafana-dynamictext-panel/workflows/CI/badge.svg)](https://github.com/marcusolsson/grafana-dynamictext-panel/actions?query=workflow%3A%22CI%22)
[![Release](https://github.com/marcusolsson/grafana-dynamictext-panel/workflows/Release/badge.svg)](https://github.com/marcusolsson/grafana-dynamictext-panel/actions?query=workflow%3ARelease)

A panel plugin for [Grafana](https://grafana.com) for dynamic, data-driven text.

While the built-in Text panel in Grafana does support variables, that's about as dynamic it gets. This panel lets you define a text template using the data from your data source query.

The panel supports both [Markdown](https://commonmark.org/help/) and [Handlebars](https://handlebarsjs.com/guide/expressions.html#basic-usage).

![Screenshot](https://github.com/marcusolsson/grafana-dynamictext-panel/raw/master/src/img/screenshot.png)

## Example

Here's an example of what you can do.

**Data query response**

| app  | description                  | cluster | tier     |
|------|------------------------------|---------|----------|
| auth | Handles user authentication. | prod    | frontend |

**Content**

```md
# {{app}}

{{description}}

Deployed on {{join (variable "hostname") ", "}}.

{{#if (eq tier "frontend")}}
[Link](https://{{cluster}}.example.com/{{app}})
{{/if}}
```

**Result**

```md
# auth

Handles user authentication.

Deployed on server1, server2, server3.

[Link](https://prod.example.com/auth)
```

## Helpers

Helpers are functions that let you perform basic text transformation within your template.

### `{{date}}`

Formats the timestamp in a given field using a date format. Uses [helper-date](https://github.com/helpers/helper-date).

```
<!-- Time: 1598791377556 -->
{{date Time "YYYY-MM-DD"}}
<!-- results in: '2020-08-30'  -->
```

### `{{eq}}`

Compares two strings for equality.

```
<!-- app: foo -->
{{#if (eq app "foo")}}
Success!
{{/if}}
<!-- results in: 'Success!'  -->
```

### `{{join}}`

Join all elements of array into a string using a given separator.

```
<!-- array: ['a', 'b', 'c'] -->
{{join array "-"}}
<!-- results in: 'a-b-c'  -->
```

### `{{toFixed}}`

Formats the given number using fixed-point notation.

```
<!-- Value: 1.1234 -->
{{toFixed Value 2}}
<!-- results in: '1.12' -->
```

### `{{variable}}`

Returns a string array of the currently selected values for a certain [variable](https://grafana.com/docs/grafana/latest/variables/).

```
{{variable "hostname"}}
<!-- results in: ['server1', 'server2', 'server3']  -->
```

## Snippets

Check out these snippets for inspiration.

### Markdown list from variable

```md
{{#each (variable "hostname")}}
- {{.}}
{{/each}}
```

### Conditional content

```
{{#if app "auth"}}
This is the auth app.
{{/if}}
```
