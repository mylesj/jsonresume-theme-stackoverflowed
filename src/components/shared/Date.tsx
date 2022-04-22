import { WithEmotionCss, MaybeInternalProps } from '~/types'
import { dateFormat } from '~/util'

type Props = {
    date: string
}

// todo: restructure dateFormat() into a singular dateFormat()
//       and dateRangeFormat() utilities (this was a quick fudge)
export const Date = (props: WithEmotionCss<Props>) => {
    const { className } = props as MaybeInternalProps
    const fmt = dateFormat({ startDate: props.date })

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
