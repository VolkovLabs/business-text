---
id: options
title: Options
---

This page lists the available options you can use to configure your panel.

## Display

The **Display** category contains options related to how the panel is displayed.

### Content

A [Handlebars](https://handlebarsjs.com/) template with support for Markdown.

To use display data from your query result, enter the name of the field surrounded by double braces. For example, to display the value from the `Time` field, enter `{{Time}}`.

Grafana renders the template for every row in the query result. If a query returns multiple query results, you can select the query result you wish to display from a drop-down menu.

You can even do basic text processing using one or more [helpers](helpers.md) inside your template.

### Default content

Whenever the data source query returns an empty result, Grafana displays the template in **Default content** instead of **Content**.

This can be useful to provide users with instructions on what to do, or who to contact, when the query returns an empty result.

Even though there's no data from the data source, you can still use the available [helpers](helpers.md).

### Every row

By default, the template configured in the **Content** field is rendered for each record in the result.

You can render this template only once by turning this switch off. In this case, the query results are passed in as the `data` field to the template.

Handlebars provides a [builtin-helper](https://handlebarsjs.com/guide/builtin-helpers.html#each) to iterate over these records. 
