type Props = {
    enable?: boolean
}

export const PageBreak = ({ enable = true }: Props) => {
    return !enable ? null : (
        <div
            css={(theme) => ({
                ...theme.when('print', {
                    breakBefore: enable ? 'page' : 'initial',
                }),
            })}
        />
    )
}
