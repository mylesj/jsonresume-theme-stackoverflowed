import { DEFAULT_LOCALE } from '~/constants'

import { getCountryNameFactory } from './i18nCountries'

export type Locale = {
    getCountryName: Awaited<ReturnType<typeof getCountryNameFactory>>
}

const MEMO: {
    [key in string]: Locale
} = {}

export const getLocale = async (locale = DEFAULT_LOCALE) => {
    if (!(locale in MEMO)) {
        MEMO[locale] = {
            getCountryName: await getCountryNameFactory(locale),
        }
    }

    return MEMO[locale]
}
