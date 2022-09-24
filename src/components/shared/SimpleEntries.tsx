import { useMemo, ReactNode } from 'react'

import { normaliseTag, getIconSvg } from '~/util'

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
            const svg = key && getIconSvg(key)
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
                    css={(theme) => {
                        const svg = getIcon(icon)
                        return {
                            '&:not(:last-of-type)': {
                                marginBottom: '.6rem',
                            },
                            paddingLeft: hasIcons
                                ? 'calc(1.25rem + 0.8rem)'
                                : 0,
                            ...(svg && {
                                position: 'relative',
                                '&::before': {
                                    display: 'block',
                                    position: 'absolute',
                                    top: '0.15rem',
                                    left: 0,
                                    width: '1.25rem',
                                    height: '100%',
                                    backgroundColor: theme.text.color.tertiary,
                                    content: `""`,
                                    maskImage: `url(data:image/svg+xml;utf8,${encodeURIComponent(
                                        svg
                                    )})`,
                                    maskRepeat: 'no-repeat',
                                },
                            }),
                        }
                    }}
                >
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
