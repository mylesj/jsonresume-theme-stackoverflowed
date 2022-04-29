/**
 * IMPORTANT: Dynamic imports must be relative to this file and include an explicit extension.
 * see: https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
 */

import { DEFAULT_LOCALE } from '~/constants'

import { shortCode } from './util'

type LocaleData = typeof import('../../../locales/i18n/en.json')
type LocaleKey = keyof LocaleData['language']

export const localCopyFactory = async (locale: string) => {
    let data: LocaleData

    try {
        data = await import(`../../../locales/i18n/${locale}.json`)
    } catch (e) {
        try {
            const short = shortCode(locale)
            data = await import(
                `../../../locales/i18n/${
                    short !== locale ? short : DEFAULT_LOCALE
                }.json`
            )
        } catch (e) {
            data = await import(
                `../../../locales/i18n/${shortCode(DEFAULT_LOCALE)}.json`
            )
        }
    }

    return {
        i18n: (key: LocaleKey): string => {
            return data.language[key]
        },
    }
}
