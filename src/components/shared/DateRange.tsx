import { useConfig, useLocale } from '~/context'

import { ZeroWidthSpace } from './ZeroWidthSpace'

type Props = {
    startDate: string
    endDate?: string
    className?: string
}

export const DateRange = ({ startDate, endDate, className }: Props) => {
    const i18n = useLocale('i18n')
    const configDateFormat = useConfig('format')?.date
    const formatDateRange = useLocale('formatDateRange')
    const fmt = formatDateRange({
        startDate,
        endDate,
        format: configDateFormat,
    })

    if (!fmt) {
        return null
    }

    return (
        <div
            className={className}
            css={(theme) => ({
                fontStyle: 'italic',
                whiteSpace: 'nowrap',
                color: theme.text.color.tertiary,
                '& > time > time:last-of-type::before': {
                    content: '"→"',
                    margin: '0 .5rem',
                },
            })}
        >
            <time dateTime={fmt.durationISO}>
                <time dateTime={fmt.startDateISO}>{fmt.startDate}</time>
                <ZeroWidthSpace />
                <time dateTime={fmt.endDateISO}>
                    {endDate ? fmt.endDate : i18n('component.date.now')}
                </time>
            </time>
        </div>
    )
}
