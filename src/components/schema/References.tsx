import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Paragraph, Section, SubSection } from '~/components/shared'

export const References = () => {
    const i18n = useLocale('i18n')
    const { references } = useResume()
    const useableReferences = references?.filter(
        filterPopulated('name', 'reference')
    )

    if (!useableReferences) {
        return null
    }

    return (
        <Section label={i18n('section.references.title')}>
            {useableReferences.map((item, i) => (
                <SubSection key={i} label={item.name}>
                    <Paragraph
                        css={(theme) => ({
                            marginBottom: '1rem',
                            color: theme.text.color.secondary,
                            fontFamily: theme.text.font.secondary,
                            fontStyle: 'italic',
                            '&::before': {
                                content: '"“"',
                                display: 'inline-block',
                                paddingRight: '.2rem',
                            },
                            '&::after': {
                                content: '"”"',
                                display: 'inline-block',
                                paddingLeft: '.2rem',
                            },
                        })}
                    >
                        {item.reference}
                    </Paragraph>
                </SubSection>
            ))}
        </Section>
    )
}
