import { useResume } from '~/context'
import { Paragraph, Contact } from '~/components/shared'
import { FlexRow, FlexColumn } from '~/components/layout'

type TitleProps = {
    name?: string
    label?: string
}

const Title = ({ name, label }: TitleProps) => {
    return (
        <FlexColumn>
            {name && (
                <h1
                    css={(theme) => ({
                        fontSize: '2.8rem',
                        lineHeight: '1.2',
                        fontWeight: 'bold',
                        color: theme.text.color.title,
                        ...theme.when('print', {
                            marginTop: !label ? '4rem' : '2rem',
                            marginBottom: !label ? '4rem' : 0,
                        }),
                        ...theme.when(['screen', 'normal'], {
                            marginTop: !label ? '4rem' : '2rem',
                            marginBottom: !label ? '4rem' : 0,
                        }),
                        ...theme.when(['screen', 'narrow'], {
                            marginTop: !label ? '2rem' : '1rem',
                            marginBottom: !label ? '2rem' : 0,
                        }),
                    })}
                >
                    {name}
                </h1>
            )}
            {label && (
                <h2
                    css={(theme) => ({
                        fontSize: '2rem',
                        lineHeight: '1.1',
                        color: theme.text.color.tertiary,
                        ...theme.when('print', {
                            marginTop: !name ? '4rem' : 0,
                            marginBottom: !name ? '4rem' : '2rem',
                        }),
                        ...theme.when(['screen', 'normal'], {
                            marginTop: !name ? '4rem' : 0,
                            marginBottom: !name ? '4rem' : '2rem',
                        }),
                        ...theme.when(['screen', 'narrow'], {
                            marginTop: !name ? '2rem' : 0,
                            marginBottom: !name ? '2rem' : '1rem',
                        }),
                    })}
                >
                    {label}
                </h2>
            )}
        </FlexColumn>
    )
}

type SummaryProps = {
    summary?: string
}

const Summary = ({ summary }: SummaryProps) => {
    return (
        <Paragraph
            css={(theme) => ({
                fontFamily: theme.text.font.secondary,
                textAlign: 'justify',
                fontStyle: 'italic',
                fontSize: '1.2rem',
                letterSpacing: '0.03125rem',
                color: theme.text.color.secondary,
                ...theme.when('print', {
                    padding: '2rem 6rem 2rem 7rem',
                }),
                ...theme.when(['screen', 'normal'], {
                    padding: '2rem 6rem 2rem 7rem',
                }),
                ...theme.when(['screen', 'narrow'], {
                    padding: '1rem 3rem 2rem 3.5rem',
                }),
            })}
        >
            {summary || ''}
        </Paragraph>
    )
}

export const Basics = () => {
    const { basics } = useResume()
    if (!basics) {
        return null
    }
    return (
        <>
            <FlexRow>
                <Title name={basics.name} label={basics.label} />
                <Contact
                    phone={basics.phone}
                    email={basics.email}
                    location={basics.location}
                    css={{ alignSelf: 'start' }}
                />
            </FlexRow>
            <Summary summary={basics.summary} />
        </>
    )
}
