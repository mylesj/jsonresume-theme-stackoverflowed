import { WithEmotionCss, MaybeInternalProps } from '~/types'
import { ZeroWidthSpace } from './ZeroWidthSpace'

type Props = {
    entries: {
        title?: string
        label?: string
    }[]
}

export const SimpleEntries = ({ entries, ...rest }: WithEmotionCss<Props>) => {
    const { className } = rest as MaybeInternalProps
    return (
        <ul className={className}>
            {entries.map(({ title, label }, i) => (
                <li
                    key={i}
                    css={{
                        '&:not(:last-of-type)': {
                            marginBottom: '.4rem',
                        },
                    }}
                >
                    {title && (
                        <strong css={{ fontWeight: 'bold' }}>{title}</strong>
                    )}
                    {label && (
                        <span
                            css={{
                                '&::before': {
                                    content: '"—"',
                                    margin: '0 .5rem',
                                },
                            }}
                        >
                            <ZeroWidthSpace />
                            {label}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    )
}
