import { useMemo, ReactNode } from 'react'
import icons from 'simple-icons'

import { normaliseTag } from '~/util'

import { ZeroWidthSpace } from './ZeroWidthSpace'
import { Link } from './Link'

type Props = {
    entries: {
        icon?: string
        title?: string
        label?: string
        url?: string
        children?: ReactNode
    }[]
    showUrl?: boolean
    className?: string
}

const useSvgIcons = (entries: Props['entries']) => {
    const svgIcons = useMemo(() => {
        return entries.reduce<Record<string, string>>((acc, { icon }) => {
            const key = icon && normaliseTag(icon)
            const svg = key && icons.Get(key)?.svg
            if (svg) {
                acc[key] = svg
            }
            return acc
        }, {})
    }, [entries])

    const hasIcons = Boolean(svgIcons && Object.keys(svgIcons).length)
    const getIcon = (key?: string) =>
        (key && svgIcons[normaliseTag(key)]) ?? null

    return [hasIcons, getIcon] as const
}

export const SimpleEntries = ({ showUrl, entries, className }: Props) => {
    const [hasIcons, getIcon] = useSvgIcons(entries)
    return (
        <ul className={className}>
            {entries.map(({ icon, title, label, url, children = null }, i) => (
                <li
                    key={i}
                    css={{
                        '&:not(:last-of-type)': {
                            marginBottom: '.6rem',
                        },
                    }}
                >
                    {hasIcons && (
                        <div
                            css={(theme) => ({
                                float: 'left',
                                marginRight: '.8rem',
                                width: '1.25rem',
                                // force dimensions when inner content is empty
                                minHeight: '1px',
                                '& > svg': {
                                    display: 'block',
                                    fill: theme.text.color.tertiary,
                                },
                            })}
                            dangerouslySetInnerHTML={{
                                __html: getIcon(icon) || '',
                            }}
                        />
                    )}
                    <div>
                        {title && (
                            <strong
                                css={{
                                    fontWeight: 'bold',
                                }}
                            >
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
                    </div>
                    {children && <div>{children}</div>}
                </li>
            ))}
        </ul>
    )
}
