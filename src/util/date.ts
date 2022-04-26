import {
    fromUnixTime,
    parseISO,
    isValid,
    format as formatDate,
    formatISO,
    intervalToDuration,
    formatISODuration,
} from 'date-fns'
import { enUS as locale } from 'date-fns/locale'

type FormatParameters = {
    startDate: string
    endDate?: string
    format?: string
}

type FormatReturnValue = {
    durationISO: string
    startDateISO: string
    endDateISO: string
    startDate: string
    endDate: string
}

// todo: format related error handling
export const dateFormat = ({
    startDate,
    endDate,
    format,
}: FormatParameters): FormatReturnValue | null => {
    const start = parseISO(startDate)
    const _format = format ? format : 'MMM yyyy'
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
        startDate: formatDate(start, _format, { locale }),
        endDate: formatDate(end, _format, { locale }),
    }
}
