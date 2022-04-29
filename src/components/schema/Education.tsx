import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Section, SubSection, Highlights } from '~/components/shared'

export const Education = () => {
    const i18n = useLocale('i18n')
    const { education } = useResume()
    const useableEducation = education?.filter(
        filterPopulated('area', 'institution', 'startDate')
    )

    if (!useableEducation) {
        return null
    }

    return (
        <Section label={i18n('section.education.title')}>
            {useableEducation.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[
                        item.studyType
                            ? `${item.studyType} ${item.area}`
                            : item.area,
                        !item.url
                            ? item.institution
                            : { to: item.url, children: item.institution },
                    ]}
                >
                    <Highlights css={{ marginBottom: '1rem' }}>
                        {item.courses}
                    </Highlights>
                </SubSection>
            ))}
        </Section>
    )
}
