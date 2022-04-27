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

<!-- images -->

[img-sample]: https://repository-images.githubusercontent.com/482519223/ddfa650d-29ce-4672-9523-ac3737b9f950
[shield-github]: https://img.shields.io/badge/%20-Source-555555?logo=github&style=for-the-badge
[shield-changelog]: https://img.shields.io/badge/%20-Changelog-555555?logo=github&style=for-the-badge
[shield-ci-main]: https://img.shields.io/github/workflow/status/mylesj/jsonresume-theme-stackoverflowed/CI/main?label=CI&logo=github&style=for-the-badge
[shield-npm-version]: https://img.shields.io/npm/v/jsonresume-theme-stackoverflowed?&label=%20&logo=npm&style=for-the-badge
[shield-coverage]: https://img.shields.io/codacy/coverage/ec2d137d62154c418920da787f08b79f/main?logo=codacy&style=for-the-badge

<!--
[shield-quality]: https://img.shields.io/codacy/grade/ec2d137d62154c418920da787f08b79f/main?label=quality&logo=codacy&style=for-the-badge
-->
