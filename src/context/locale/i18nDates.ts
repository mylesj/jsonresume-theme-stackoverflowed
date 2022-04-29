/**
 * IMPORTANT: do not relocate this file - see note in `rollup.config.ts`
 */

import {
    fromUnixTime,
    parseISO,
    isValid,
    format as dateFormatter,
    formatISO,
    intervalToDuration,
    formatISODuration,
    Locale as LocaleData,
} from 'date-fns'

import { DEFAULT_LOCALE } from '~/constants'

import { shortCode } from './util'

const DEFAULT_DATE_FORMAT = 'MMM yyyy'

const getLocaleData = async (locale: string) => {
    if (process.env.NODE_ENV === 'development') {
        const dFnsLocale = (await import('date-fns/locale')) as unknown as {
            [key in string]: LocaleData
        }
        const dFnsKey = locale.replace('-', '')
        const shortKey = shortCode(locale)
        const defaultKey = DEFAULT_LOCALE.replace('-', '')

        if (dFnsKey in dFnsLocale) {
            return dFnsLocale[dFnsKey]
        }

        if (shortKey in dFnsLocale) {
            return dFnsLocale[shortKey]
        }

        return dFnsLocale[defaultKey]
    }

    let localeData: LocaleData

    try {
        localeData = await import(
            `../../../node_modules/date-fns/locale/${locale}/index.js`
        )
    } catch (e) {
        try {
            const short = shortCode(locale)
            localeData = await import(
                `../../../node_modules/date-fns/locale/${
                    short !== locale ? short : DEFAULT_LOCALE
                }/index.js`
            )
        } catch (e) {
            localeData = await import(
                `../../../node_modules/date-fns/locale/${DEFAULT_LOCALE}/index.js`
            )
        }
    }

    return localeData
}

export const dateFormatterFactory = async (locale: string) => {
    const localeData = await getLocaleData(locale)

    type DateFormats = {
        dateISO: string
        date: string
    }

    const formatDate = (date: string, format?: string): DateFormats | null => {
        const _date = parseISO(date)
        const _format = format ? format : DEFAULT_DATE_FORMAT

        if (!isValid(_date)) {
            return null
        }

        return {
            dateISO: formatISO(_date),
            date: dateFormatter(_date, _format, { locale: localeData }),
        }
    }

    type RangeProps = {
        startDate: string
        endDate?: string
        format?: string
    }

    type RangeFormats = {
        durationISO: string
        startDateISO: string
        endDateISO: string
        startDate: string
        endDate: string
    }

    const formatDateRange = ({
        startDate,
        endDate,
        format,
    }: RangeProps): RangeFormats | null => {
        const start = parseISO(startDate)
        const _format = format ? format : DEFAULT_DATE_FORMAT
        let end: Date

        if (!isValid(start)) {
            return null
        }

        if (endDate) {
            end = parseISO(endDate)
            if (!isValid(end)) {
                return null
            }
        } else {
            end = fromUnixTime(Date.now())
        }

        return {
            durationISO: formatISODuration(intervalToDuration({ start, end })),
            startDateISO: formatISO(start),
            endDateISO: formatISO(end),
            startDate: dateFormatter(start, _format, { locale: localeData }),
            endDate: dateFormatter(end, _format, { locale: localeData }),
        }
    }

    return {
        formatDate,
        formatDateRange,
    }
}
