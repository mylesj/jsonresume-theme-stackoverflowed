import { useConfig, useLocale } from '~/context'

type Props = {
    date: string
    className?: string
}

export const Date = ({ date, className }: Props) => {
    const configDateFormat = useConfig('format')?.date
    const formatDate = useLocale('formatDate')
    const fmt = formatDate(date, configDateFormat)

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
            })}
        >
            <time dateTime={fmt.dateISO}>{fmt.date}</time>
        </div>
    )
}
