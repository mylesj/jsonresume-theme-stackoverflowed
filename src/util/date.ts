import {
    fromUnixTime,
    parseISO,
    isValid,
    format,
    formatISO,
    intervalToDuration,
    formatISODuration,
} from 'date-fns'
import { enUS as locale } from 'date-fns/locale'

type FormatParameters = {
    startDate: string
    endDate?: string
}

type FormatReturnValue = {
    durationISO: string
    startDateISO: string
    endDateISO: string
    startDate: string
    endDate: string
}

export const dateFormat = ({
    startDate,
    endDate,
}: FormatParameters): FormatReturnValue | null => {
    const start = parseISO(startDate)
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
        startDate: format(start, 'MMM yyyy', { locale }),
        endDate: format(end, 'MMM yyyy', { locale }),
    }
}
