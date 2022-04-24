import { ZeroWidthSpace } from './ZeroWidthSpace'
import { Link } from './Link'

type Props = {
    entries: {
        title?: string
        label?: string
        url?: string
    }[]
    showUrl?: boolean
    className?: string
}

export const SimpleEntries = ({ showUrl, entries, className }: Props) => {
    return (
        <ul className={className}>
            {entries.map(({ title, label, url }, i) => (
                <li
                    key={i}
                    css={{
                        '&:not(:last-of-type)': {
                            marginBottom: '.4rem',
                        },
                    }}
                >
                    {title && (
                        <strong css={{ fontWeight: 'bold' }}>
                            {title}
                            {(label || url) && <ZeroWidthSpace />}
                        </strong>
                    )}
                    {!url && label && (
                        <span
                            css={{
                                '&::before': {
                                    content: '"—"',
                                    margin: '0 .5rem',
                                },
                            }}
                        >
                            {label}
                        </span>
                    )}
                    {url && (
                        <Link
                            css={{
                                '&::before': {
                                    content: '"—"',
                                    margin: '0 .5rem',
                                },
                            }}
                            to={url}
                        >
                            {showUrl ? undefined : label}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    )
}
