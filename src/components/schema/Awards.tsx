import { filterPopulated } from '~/util'
import { useResume } from '~/context'
import { Paragraph, Section, SubSection } from '~/components/shared'

export const Awards = () => {
    const { awards } = useResume()
    const useableAwards = awards?.filter(filterPopulated('title', 'date'))

    if (!useableAwards) {
        return null
    }

    return (
        <Section label="Awards">
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
