import { DEFAULT_LOCALE } from '~/constants'

import { countryNameFactory } from './i18nCountries'
import { dateFormatterFactory } from './i18nDates'

export type Locale = unknown &
    Awaited<ReturnType<typeof countryNameFactory>> &
    Awaited<ReturnType<typeof dateFormatterFactory>>

const MEMO: {
    [key in string]: Locale
} = {}

export const getLocale = async (locale = DEFAULT_LOCALE) => {
    if (!(locale in MEMO)) {
        const [countryNameFormatters, dateFormatters] = await Promise.all([
            countryNameFactory(locale),
            dateFormatterFactory(locale),
        ])

        MEMO[locale] = {
            ...countryNameFormatters,
            ...dateFormatters,
        }
    }

    return MEMO[locale]
}
