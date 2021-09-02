---
id: recipes
title: Recipes
---

This page lists some useful snippets that you can use in your templates.

## Markdown list from variable

```md
{{#each (variable "hostname")}}
- {{this}}
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

## Dynamic templates using dashboard variables

Use the `lookup` helper function to create dynamic templates based on dashboard variables.

The following template creates a key-value pair from every selected value in the `myvar` dashboard variable.

    ```yml
    book:
    {{#each (variable "props")}}
      {{this}}: {{lookup @root this}}
    {{/each}}
    ```

For example, for the following query result:

| title | author        | year |
|-------|---------------|------|
| Dune  | Frank Herbert | 1965 |

you'll end up with something like this:

![Dynamic template](/img/dynamic-template.gif)


## Render a single template

For the following query result:

| title | author        | year |
|-------|---------------|------|
| Dune  | Frank Herbert | 1965 |
| 1984  | George Orwell | 1949 |

Given that the **EveryRow** switch is turned off, the following template renders a table from the query result:

```md
| Title | Author | Year |
|-------|--------|------|
{{#each data}}
| {{title}} | {{author}} | {{year}} |
{{/each}}
```
