import { filterPopulated } from '~/util'
import { useResume } from '~/context'
import { Paragraph, Section, SubSection } from '~/components/shared'

export const Publications = () => {
    const { publications } = useResume()
    const useablePublications = publications?.filter(
        filterPopulated('name', 'releaseDate')
    )

    if (!useablePublications) {
        return null
    }

    return (
        <Section label="Publications">
            {useablePublications.map((item, i) => (
                <SubSection
                    key={i}
                    date={item.releaseDate}
                    label={[
                        item.name,
                        !item.url
                            ? item.publisher
                            : { to: item.url, children: item.publisher },
                    ]}
                >
                    <Paragraph css={{ marginBottom: '1rem' }}>
                        {item.summary}
                    </Paragraph>
                </SubSection>
            ))}
        </Section>
    )
}
