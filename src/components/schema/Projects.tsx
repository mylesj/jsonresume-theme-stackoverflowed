import { isPopulated } from '~/util'
import { useResume } from '~/context'
import {
    Paragraph,
    Link,
    Section,
    SubSection,
    Highlights,
} from '~/components/shared'

export const Projects = () => {
    const { projects } = useResume()
    if (!projects) {
        return null
    }
    const useableProjects = projects.filter((item) =>
        isPopulated(item, 'name', 'description', 'startDate')
    )

    return (
        <Section label="Projects">
            {useableProjects.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[item.name, item.url && <Link to={item.url} />]}
                >
                    <Paragraph css={{ marginBottom: '1rem' }}>
                        {item.description}
                    </Paragraph>
                    <Highlights css={{ marginBottom: '1rem ' }}>
                        {item.highlights}
                    </Highlights>
                </SubSection>
            ))}
        </Section>
    )
}
