/**
 * @jest-environment node
 */

import { promises as fs } from 'fs'
import path from 'path'

const VALID_SCHEMA_ENTRIES = [
    'component.date.now',
    'component.avatar.alt',
    'component.picture.alt',
    'section.skills.title',
    'section.work.title',
    'section.volunteer.title',
    'section.projects.title',
    'section.education.title',
    'section.awards.title',
    'section.publications.title',
    'section.languages.title',
    'section.interests.title',
    'section.profiles.title',
    'section.references.title',
]

type LocaleData = {
    locale?: string
    language: {
        [key in string]: string
    }
}

let locales: {
    [key in string]: LocaleData
}

beforeAll(async () => {
    const localeImports = (await fs.readdir(path.join(__dirname, 'locales')))
        .filter((file: string) => file.endsWith('.json'))
        .map((file) => {
            return new Promise<[string, LocaleData]>((resolve) =>
                fs
                    .readFile(path.join(__dirname, 'locales', file))
                    .then((data) => {
                        let json: LocaleData
                        try {
                            json = JSON.parse(data as unknown as string)
                        } catch (e) {
                            throw new Error(`Invalid JSON: ${file}`)
                        }
                        resolve([
                            file.substring(0, file.lastIndexOf('.')),
                            json,
                        ])
                    })
            )
        })

    locales = (await Promise.all(localeImports)).reduce<typeof locales>(
        (acc, [locale, data]) => {
            acc[locale] = data
            return acc
        },
        {}
    )
})

describe('locales', () => {
    it('should contain only valid country codes', () => {
        Object.keys(locales).forEach((key) => {
            expect(key).toMatch(/^[a-z]{2}(?:-[A-Z]{2})?$/)
        })
    })

    it('should have consistent indexing and structure', () => {
        Object.keys(locales).forEach((key) => {
            expect(locales).toEqual(
                expect.objectContaining({
                    [key]: {
                        locale: key,
                        language: expect.any(Object),
                    },
                })
            )
        })
    })

    it('should conform to the current schema', () => {
        Object.values(locales).forEach((locale) => {
            expect(locale).toEqual({
                locale: expect.any(String),
                language: VALID_SCHEMA_ENTRIES.reduce<LocaleData['language']>(
                    (acc, key) => {
                        acc[key] = expect.any(String)
                        return acc
                    },
                    {}
                ),
            })
        })
    })
})
