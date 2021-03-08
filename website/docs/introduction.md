---
id: introduction
title: Introduction
slug: /
hide_title: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

export const Logo= ({ children }) =>(
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "72px 0",
    }}>
    <img alt="Logo" src={useBaseUrl('img/logo.svg')} width="64px" height="64px" />
    <h1
      style={{
        fontSize: "3rem",
        margin: 0,
        marginLeft: "1rem",
      }}>
      Dynamic text
    </h1>
  </div>
)

<Logo />

Dynamic text is a panel for Grafana that dynamically renders Markdown based on the query results.

For example, let's say that your data source returns the following data:

| app  | description                  | cluster | tier     |
|------|------------------------------|---------|----------|
| auth | Handles user authentication. | prod    | frontend |

You can then write Markdown with placeholders for the data you want to use. The value inside each double brace expression refers to a field in the query result.

```md
# {{app}}

{{description}}

{{#if (eq tier "frontend")}}
https://{{cluster}}.example.com/{{app}}
{{/if}}
```

The panel renders Handlebars → Markdown → HTML and displays the final result.

![Apps](../static/img/example.png)
