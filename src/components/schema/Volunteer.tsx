import { isPopulated } from '~/util'
import { useResume } from '~/context'
import {
    Paragraph,
    Link,
    Section,
    SubSection,
    Highlights,
} from '~/components/shared'

export const Volunteer = () => {
    const { volunteer } = useResume()
    const useableVolunteer = volunteer?.filter((item) =>
        isPopulated(item, 'organization', 'position', 'startDate')
    )

    if (!useableVolunteer) {
        return null
    }

    return (
        <Section label="Volunteering">
            {useableVolunteer.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[
                        item.position,
                        !item.url ? (
                            item.organization
                        ) : (
                            <Link to={item.url}>{item.organization}</Link>
                        ),
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
