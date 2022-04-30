import countries, { LocaleData } from 'i18n-iso-countries'

import { DEFAULT_LOCALE } from '~/constants'

import { shortCode } from './util'

type CountryName = {
    countryNameOfficial: string
    countryNameAlias: string
}

const importLocale = (locale: string): Promise<LocaleData> => {
    if (process.env.NODE_ENV === 'development') {
        return import(
            `../../../node_modules/i18n-iso-countries/langs/${locale}.json`
        )
    } else {
        return import(
            /* @vite-ignore */ `i18n-iso-countries/langs/${locale}.json`
        )
    }
}

export const countryNameFactory = async (locale: string) => {
    let data: LocaleData
    let shortLocale: string

    try {
        shortLocale = shortCode(locale)
        data = await importLocale(shortLocale)
    } catch (e) {
        shortLocale = shortCode(DEFAULT_LOCALE)
        data = await importLocale(shortCode(shortLocale))
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
