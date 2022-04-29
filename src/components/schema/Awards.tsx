import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Paragraph, Section, SubSection } from '~/components/shared'

export const Awards = () => {
    const i18n = useLocale('i18n')
    const { awards } = useResume()
    const useableAwards = awards?.filter(filterPopulated('title', 'date'))

    if (!useableAwards) {
        return null
    }

    return (
        <Section label={i18n('section.awards.title')}>
            {useableAwards.map((item, i) => (
                <SubSection
                    key={i}
                    date={item.date}
                    label={[item.title, item.awarder]}
                >
                    <Paragraph css={{ marginBottom: '1rem' }}>
                        {item.summary}
                    </Paragraph>
                </SubSection>
            ))}
        </Section>
    )
}
