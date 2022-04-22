import { isPopulated } from '~/util'
import { useResume } from '~/context'
import { Section, SubSection } from '~/components/shared'

export const Awards = () => {
    const { awards } = useResume()
    if (!awards) {
        return null
    }

    const useableAwards = awards.filter((item) =>
        isPopulated(item, 'title', 'date')
    )

    return (
        <Section label="Awards">
            {useableAwards.map((item, i) => (
                <SubSection
                    key={i}
                    date={item.date}
                    label={[item.title, item.awarder]}
                >
                    <p css={{ marginBottom: '1rem' }}>{item.summary}</p>
                </SubSection>
            ))}
        </Section>
    )
}
