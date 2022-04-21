import { FlexColumn } from '~/components/layout'
import { Basics, Skills, Work, Education, Projects } from '~/components/schema'

export const Pdf = () => {
    return (
        <FlexColumn
            css={(theme) => ({
                fontFamily: theme.text.font.primary,
                color: theme.text.color.primary,
                lineHeight: '1.5',
                ...theme.when(['screen', 'normal'], {
                    padding: '4rem 4rem 4rem 6rem',
                }),
                ...theme.when(['screen', 'narrow'], {
                    padding: '2rem 2rem 2rem 3rem',
                }),
            })}
        >
            <header>
                <Basics />
            </header>
            <main>
                <Skills />
                <Work />
                <Education />
                <Projects />
            </main>
        </FlexColumn>
    )
}
