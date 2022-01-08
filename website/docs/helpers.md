---
id: helpers
title: Helpers
---

Helpers are functions that let you perform basic text transformation within your template.

## `{{date}}`

Formats the timestamp in a given field using a date format. Uses [helper-date](https://github.com/helpers/helper-date).

The field value must be a Unix timestamp or any of the formats supported by [date.js](https://date.js.org/).

```md
<!-- Time: 1598791377556 -->
{{date Time "YYYY-MM-DD"}}
<!-- results in: '2020-08-30'  -->
```

## `{{eq}}`

Compares two strings for equality.

```md
<!-- app: foo -->
{{#if (eq app "foo")}}
Success!
{{/if}}
<!-- results in: 'Success!'  -->
```

## `{{join}}`

Join all elements of array into a string using a given separator.

```md
<!-- array: ['a', 'b', 'c'] -->
{{join array "-"}}
<!-- results in: 'a-b-c'  -->
```

## `{{contains}}`

Checks if given value exists within an array

```md
<!-- array: ['a', 'b', 'c'] -->
{{#if (contains array "a")}}
Success!
{{/if}}
<!-- results in: 'Success!'  -->
```

## `{{toFixed}}`

Formats the given number using fixed-point notation.

```md
<!-- Value: 1.1234 -->
{{toFixed Value 2}}
<!-- results in: '1.12' -->
```

## `{{variable}}`

Returns a string array of the currently selected values for a certain [variable](https://grafana.com/docs/grafana/latest/variables/).

```md
{{variable "hostname"}}
<!-- results in: ['server1', 'server2', 'server3']  -->
```
