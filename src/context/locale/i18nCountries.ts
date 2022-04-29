/**
 * IMPORTANT: do not relocate this file - see note in `rollup.config.ts`
 */

import countries, { LocaleData } from 'i18n-iso-countries'

import { DEFAULT_LOCALE } from '~/constants'

import { shortCode } from './util'

type CountryName = {
    countryNameOfficial: string
    countryNameAlias: string
}

export const countryNameFactory = async (locale: string) => {
    let data: LocaleData
    let shortLocale: string

    try {
        shortLocale = shortCode(locale)
        data = await import(
            `../../../node_modules/i18n-iso-countries/langs/${shortLocale}.json`
        )
    } catch (e) {
        shortLocale = shortCode(DEFAULT_LOCALE)
        data = await import(
            `../../../node_modules/i18n-iso-countries/langs/${shortCode(
                DEFAULT_LOCALE
            )}.json`
        )
    }

    countries.registerLocale(data)

    return {
        countryName: (code?: string): CountryName | null => {
            if (!code) {
                return null
            }

            return {
                countryNameOfficial: countries.getName(code, shortLocale, {
                    select: 'official',
                }),
                countryNameAlias: countries.getName(code, shortLocale, {
                    select: 'alias',
                }),
            }
        },
    }
}
