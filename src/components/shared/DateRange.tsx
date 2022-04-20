import { WithEmotionCss, MaybeInternalProps } from '~/types'
import { dateFormat } from '~/util'

import { ZeroWidthSpace } from './ZeroWidthSpace'

type Props = {
    startDate: string
    endDate?: string
}

export const DateRange = (props: WithEmotionCss<Props>) => {
    const { className } = props as MaybeInternalProps
    const fmt = dateFormat(props)

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
                    {props.endDate ? fmt.endDate : 'Current'}
                </time>
            </time>
        </div>
    )
}
