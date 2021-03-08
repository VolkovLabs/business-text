---
id: recipes
title: Recipes
---

This page lists some useful snippets that you can use in your templates.

## Markdown list from variable

```md
{{#each (variable "hostname")}}
- {{.}}
{{/each}}
```

## Conditional content

```md
{{#if app "auth"}}
This is the auth app.
{{/if}}
```

## Render HTML from data

If you'd like to render HTML returned by the data source, you need to use three-brace expressions, `{{{htmlValue}}}`, otherwise Handlebars escapes the HTML content.

```md
<ul>
{{{htmlValue}}}
</ul>
```

`htmlValue` is `<li>foo</li><li>bar</li>`.
