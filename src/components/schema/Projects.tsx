import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Paragraph, Section, SubSection, Highlights } from '~/components/shared'

export const Projects = () => {
    const i18n = useLocale('i18n')
    const { projects } = useResume()
    const useableProjects = projects?.filter(
        filterPopulated('name', 'description', 'startDate')
    )

    if (!useableProjects) {
        return null
    }

    return (
        <Section label={i18n('section.projects.title')}>
            {useableProjects.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[item.name, item.url && { to: item.url }]}
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
