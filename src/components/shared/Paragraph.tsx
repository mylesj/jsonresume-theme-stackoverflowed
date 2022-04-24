type Props = {
    children?: string
    className?: string
}

export const Paragraph = ({ children, className }: Props) => {
    if (!children) {
        return null
    }
    return <p className={className}>{children}</p>
}
