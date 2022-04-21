/**
 * Hides whitespace characters in the DOM for elements injecting pseudo content that
 * otherwise results in select and copying of text not including spaces as expected.
 */
export const ZeroWidthSpace = () => {
    return (
        <span
            css={(theme) => ({
                flex: 0,
                width: '1px',
                height: '1px',
                marginLeft: '-1px',
                marginBottom: '-1px',
                overflow: 'hidden',
                display: 'inline-block',
                verticalAlign: 'baseline',
                ...theme.when('print', {
                    display: 'none',
                }),
            })}
            dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
        />
    )
}
