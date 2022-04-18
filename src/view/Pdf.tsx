import { FlexColumn } from '~/components/layout'
import { Basics, Skills } from '~/components/schema'

export const Pdf = () => {
    return (
        <FlexColumn
            css={(theme) => ({
                fontFamily: theme.text.font.primary,
                color: theme.text.color.primary,
                lineHeight: '1.2',
                ...theme.whenPageNormal({
                    padding: '4rem 4rem 4rem 6rem',
                }),
                ...theme.whenPageNarrow({
                    padding: '2rem 2rem 2rem 3rem',
                }),
            })}
        >
            <Basics />
            <Skills />
            <main></main>
        </FlexColumn>
    )
}
