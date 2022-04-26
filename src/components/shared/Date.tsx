import { useConfig } from '~/context'
import { dateFormat } from '~/util'

type Props = {
    date: string
    className?: string
}

// todo: restructure dateFormat() into a singular dateFormat()
//       and dateRangeFormat() utilities (this was a quick fudge)
export const Date = ({ date: startDate, className }: Props) => {
    const configDateFormat = useConfig('format')?.date
    const fmt = dateFormat({ startDate, format: configDateFormat })

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
            <time dateTime={fmt.startDateISO}>{fmt.startDate}</time>
        </div>
    )
}
