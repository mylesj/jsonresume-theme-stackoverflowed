import { DEFAULT_LOCALE } from '~/constants'

import { shortCode } from './util'

type LocaleData = typeof import('../../../i18n/locales/en.json')
type LocaleKey = keyof LocaleData['language']

const importLocale = (locale: string): Promise<LocaleData> => {
    if (process.env.NODE_ENV === 'development') {
        return import(`../../../i18n/locales/${locale}.json`)
    } else {
        return import(`../i18n/locales/${locale}.json`)
    }
}

export const localCopyFactory = async (locale: string) => {
    let data: LocaleData

    try {
        data = await importLocale(locale)
    } catch (e) {
        try {
            if (shortCode(locale) === locale) {
                throw 'no point... try next'
            }
            data = await importLocale(shortCode(locale))
        } catch (e) {
            data = await importLocale(shortCode(DEFAULT_LOCALE))
        }
    }

    return {
        i18n: (key: LocaleKey): string => {
            return data.language[key]
        },
    }
}
