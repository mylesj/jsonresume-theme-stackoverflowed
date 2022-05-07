[![NPM Package Version][shield-npm-version]][npm]
[![GitHub Repository][shield-github]][repo]
[![Changelog][shield-changelog]][releases]
[![GitHub Workflow Status (main)][shield-ci-main]][status-ci-main]
[![Test Coverage][shield-coverage]][codacy-dashboard]

# jsonresume-theme-stackoverflowed

> _A [JSON Resume][json-resume] Theme inspired by the Stack Overflow Developer Story resume format._

## Motivation

Sadly the Stack Overflow team decided to [discontinue the Jobs and Developer Story][so-meta] platform
on March 31, 2022. Having had much career success particularly thanks to their product this came as
disappointing news - there is something about this resume format that seems to translate well with
recruiters, so with a little artistic license this project aims to create a faithful replica that
is compatible with the [Resume CLI][resume-cli] tool.

## Sample

![Screenshot: Resume Sample][img-sample]

## Configuration

The JSON Resume schema allows space for arbitrary meta data. This theme will consume a custom
configuration from JSON defined under the following namespace, all further parameters listed on
this page will assume that they are configured at this level. For the avoidance of doubt a
[sample configuration][sample-config] is available, which matches the default values if
otherwise unspecified.

```json
{
    "meta": {
        "theme-stackoverflowed": {
            /* configuration */
        }
    }
}
```

---

### Localisation

```typescript
{
    "locale": string
}
```

**`locale`** &mdash; `string`

A language (_e.g._ `en`) or regional variant (_e.g._ `en-GB`) that will localise dates
and text content.

-   defaults to `en-US`

---

### Formatting

```typescript
{
    "format": {
        "date": string,
        "location": string | string[]
    }
}
```

**`format.date`** &mdash; `string`

A [`date-fns`][date-fns-format] format for rendering dates.

**`format.location`** &mdash; `string` &vert; `string[]`

A template or list of templates (fallbacks) that will be passed the values of `basics.location`
from the resume - interpolated keys use the syntax `{{var}}`. In addition to the schema properties,
the following keys are also available.

| Key                   | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `countryNameAlias`    | A colloquial name resolved from the `countryCode`.    |
| `countryNameOfficial` | A full country title resolved from the `countryCode`. |

If it is preferable to split an address across multiple lines, this can be achieved by inserting
a newline character in the template - note that this needs to be doubly escaped to be valid JSON.

```json
{
    "format": {
        "location": "{{address}}, {{postalCode}} \\n {{city}}, {{region}}"
    }
}
```

### Introduction

```typescript
{
    "intro": {
        "avatar": {
            "show": boolean,
            "align": string
        }
    }
}
```

**`intro.avatar.show`** &mdash; `boolean`

All resume data will be displayed by default, where content exists - however the profile image can
be hidden if preferable. If a profile `image` is not available, then this theme will lookup a
[Gravatar][gravatar] for the `email` field under the `basics` profile data.

**`intro.avatar.align`** &mdash; `string` &mdash; `"left"` &vert; `"right"`

By default the avatar will align to the `right` of the address and contact details - however can
be configured to align to the `left` of the name and title.

### Sections

```typescript
{
    "section": {
        [string]: {
            "order": number
            "break": boolean
            "hidden": boolean
        }
    }
}
```

Sections map directly to resume schema fields and the currently supported names are: `skills`
&vert; `work` &vert; `volunteer` &vert; `projects` &vert; `education` &vert; `awards` &vert;
`publications` &vert; `languages` &vert; `interests` &vert; `profiles` &vert; `references`.
Sections are only rendered if there is sufficient data for each in a given resume.

**`section.<name>.order`** &mdash; `number`

Sections are by default laid out with the same priority as stated above - each section relevant
to a resume will be assigned a number (starting from 1). This may be overridden on a per-section
basis to customise the order.

**`section.<name>.break`** &mdash; `boolean`

Sometimes a page break may split a section in an awkward place - this is difficult to compensate
for programmatically given the unknown nature of the configuration and / or data being rendered.
As such, this escape hatch allows a section to force a page break (above) by setting it to `true`.

**`section.<name>.hidden`** &mdash; `boolean`

If it is preferable to maintain data in a resume but not have it rendered, a section can be
disabled by setting this to `true`.

<!-- project links -->

[npm]: https://www.npmjs.com/package/jsonresume-theme-stackoverflowed
[repo]: https://github.com/mylesj/jsonresume-theme-stackoverflowed
[releases]: https://github.com/mylesj/jsonresume-theme-stackoverflowed/releases
[status-ci-main]: https://github.com/mylesj/jsonresume-theme-stackoverflowed/actions/workflows/integration.yml?query=branch%3Amain
[codacy-dashboard]: https://app.codacy.com/gh/mylesj/jsonresume-theme-stackoverflowed/dashboard?branch=main
[sample-config]: https://github.com/mylesj/jsonresume-theme-stackoverflowed/blob/main/src/__dev__/sample.config.json

<!-- external links -->

[json-resume]: https://jsonresume.org
[resume-cli]: https://github.com/jsonresume/resume-cli
[so-meta]: https://meta.stackoverflow.com/questions/415293/sunsetting-jobs-developer-story
[date-fns-format]: https://date-fns.org/v2.28.0/docs/format
[gravatar]: https://en.gravatar.com/

<!--
[simple-icons]: https://simpleicons.org/
-->

<!-- images -->

[img-sample]: https://repository-images.githubusercontent.com/482519223/7a3c02dd-2f3f-401e-af71-7f3aebf7ff3f
[shield-github]: https://img.shields.io/badge/%20-Source-555555?logo=github&style=for-the-badge
[shield-changelog]: https://img.shields.io/badge/%20-Changelog-555555?logo=github&style=for-the-badge
[shield-ci-main]: https://img.shields.io/github/workflow/status/mylesj/jsonresume-theme-stackoverflowed/CI/main?label=CI&logo=github&style=for-the-badge
[shield-npm-version]: https://img.shields.io/npm/v/jsonresume-theme-stackoverflowed?&label=%20&logo=npm&style=for-the-badge
[shield-coverage]: https://img.shields.io/codacy/coverage/ec2d137d62154c418920da787f08b79f/main?logo=codacy&style=for-the-badge

<!--
[shield-quality]: https://img.shields.io/codacy/grade/ec2d137d62154c418920da787f08b79f/main?label=quality&logo=codacy&style=for-the-badge
-->
