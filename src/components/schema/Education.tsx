import { isPopulated } from '~/util'
import { useResume } from '~/context'
import { Link, Section, SubSection, Highlights } from '~/components/shared'

export const Education = () => {
    const { education } = useResume()
    const useableEducation = education?.filter((item) =>
        isPopulated(item, 'area', 'institution', 'startDate')
    )

    if (!useableEducation) {
        return null
    }

    return (
        <Section label="Education">
            {useableEducation.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[
                        item.studyType
                            ? `${item.studyType} ${item.area}`
                            : item.area,
                        !item.url ? (
                            item.institution
                        ) : (
                            <Link to={item.url}>{item.institution}</Link>
                        ),
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
