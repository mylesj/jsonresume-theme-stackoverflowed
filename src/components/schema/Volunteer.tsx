import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Paragraph, Section, SubSection, Highlights } from '~/components/shared'

export const Volunteer = () => {
    const i18n = useLocale('i18n')
    const { volunteer } = useResume()
    const useableVolunteer = volunteer?.filter(
        filterPopulated('organization', 'position', 'startDate')
    )

    if (!useableVolunteer) {
        return null
    }

    return (
        <Section label={i18n('section.volunteer.title')}>
            {useableVolunteer.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[
                        item.position,
                        !item.url
                            ? item.organization
                            : { to: item.url, children: item.organization },
                    ]}
                >
                    <Paragraph css={{ marginBottom: '1rem' }}>
                        {item.summary}
                    </Paragraph>
                    <Highlights css={{ marginBottom: '1rem ' }}>
                        {item.highlights}
                    </Highlights>
                </SubSection>
            ))}
        </Section>
    )
}
