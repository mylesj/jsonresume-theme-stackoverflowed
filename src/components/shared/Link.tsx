import { ReactNode } from 'react'

type Props = {
    to: string
    type?: 'url' | 'tel' | 'mail'
    external?: boolean
    nofollow?: boolean
    children?: ReactNode
    className?: string
}

export const Link = ({
    to,
    type = 'url',
    external = true,
    nofollow = true,
    children,
    className,
}: Props) => {
    let link
    let text
    const rel: string[] = []
    switch (type) {
        case 'url':
            link = /^http/i.test(to) ? to : `https://${to.replace(/^\/\//, '')}`
            text = to.replace(/^(?:https?:)?\/\/(?:www\.)?/, '')

            if (external) {
                rel.push('external')
            }
            if (nofollow) {
                rel.push('nofollow')
            }
            break

        case 'tel':
            link = `tel:${to
                .replace(/^(\+\d{2})\s+\(0\)/, '$1')
                .replace(/[^0-9+]/g, '')}`
            text = to.replace(/^tel:/i, '')
            break

        case 'mail':
            link = /^mailto/i.test(to) ? to : `mailto:${to}`
            text = to.replace(/^mailto:/i, '')
            break
    }

    return (
        <a
            href={link}
            {...(rel.length && { rel: rel.join(' ') })}
            className={className}
            css={(theme) => ({
                textDecoration: 'none',
                color: theme.text.color.link,
                '&:hover': {
                    color: theme.text.color.linkHover,
                },
            })}
        >
            {children || text}
        </a>
    )
}
