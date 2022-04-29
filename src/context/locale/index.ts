import { DEFAULT_LOCALE } from '~/constants'

import { countryNameFactory } from './i18nCountries'
import { dateFormatterFactory } from './i18nDates'
import { localCopyFactory } from './i18nLocalCopy'

export type Locale = unknown &
    Awaited<ReturnType<typeof countryNameFactory>> &
    Awaited<ReturnType<typeof dateFormatterFactory>> &
    Awaited<ReturnType<typeof localCopyFactory>>

const MEMO: {
    [key in string]: Locale
} = {}

export const getLocale = async (locale = DEFAULT_LOCALE) => {
    if (!(locale in MEMO)) {
        const [countryNameFormatters, dateFormatters, copyFormatters] =
            await Promise.all([
                countryNameFactory(locale),
                dateFormatterFactory(locale),
                localCopyFactory(locale),
            ])

        MEMO[locale] = {
            ...countryNameFormatters,
            ...dateFormatters,
            ...copyFormatters,
        }
    }

    return MEMO[locale]
}
