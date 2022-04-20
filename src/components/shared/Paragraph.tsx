import { WithEmotionCss, MaybeInternalProps } from '~/types'

type Props = {
    children?: string
}

export const Paragraph = ({ children, ...rest }: WithEmotionCss<Props>) => {
    const { className } = rest as MaybeInternalProps
    if (!children) {
        return null
    }
    return <p className={className}>{children}</p>
}
