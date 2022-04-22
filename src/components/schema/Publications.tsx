import { isPopulated } from '~/util'
import { useResume } from '~/context'
import { Link, Paragraph, Section, SubSection } from '~/components/shared'

export const Publications = () => {
    const { publications } = useResume()
    const useablePublications = publications?.filter((item) =>
        isPopulated(item, 'name', 'releaseDate')
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
                        !item.url ? (
                            item.publisher
                        ) : (
                            <Link to={item.url}>{item.publisher}</Link>
                        ),
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
