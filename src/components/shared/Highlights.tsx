type Props = {
    children?: string[]
    className?: string
}

export const Highlights = ({ children, className }: Props) => {
    if (!children) {
        return null
    }

    return (
        <ul
            className={className}
            css={(theme) => ({
                '& > li': {
                    position: 'relative',
                    paddingLeft: '2.5rem',
                },
                '& > li::before': {
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    content: '"\u2022"',
                    fontWeight: 'bold',
                    color: theme.text.color.tertiary,
                    margin: '0 1rem',
                },
                '& > li:not(:last-of-type)': {
                    marginBottom: '.4rem',
                },
            })}
        >
            {children.map((highlight, i) => (
                <li key={i}>{highlight}</li>
            ))}
        </ul>
    )
}
