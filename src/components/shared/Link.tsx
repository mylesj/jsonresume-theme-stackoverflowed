import { WithEmotionCss, MaybeInternalProps } from '~/types'

type Props = {
    to: string
    type?: 'url' | 'tel' | 'mail'
}

export const Link = ({ to, type = 'url', ...rest }: WithEmotionCss<Props>) => {
    let link
    let text
    switch (type) {
        case 'url':
            link = /^http/i.test(to) ? to : `https://${to.replace(/^\/\//, '')}`
            text = to.replace(/^(?:https?:)?\/\/(?:www\.)?/, '')
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

    const { className } = rest as MaybeInternalProps

    return (
        <a
            href={link}
            className={className}
            css={(theme) => ({
                textDecoration: 'none',
                color: theme.text.color.link,
                '&:hover': {
                    color: theme.text.color.linkHover,
                },
            })}
        >
            {text}
        </a>
    )
}
