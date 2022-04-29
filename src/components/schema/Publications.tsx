import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Paragraph, Section, SubSection } from '~/components/shared'

export const Publications = () => {
    const i18n = useLocale('i18n')
    const { publications } = useResume()
    const useablePublications = publications?.filter(
        filterPopulated('name', 'releaseDate')
    )

    if (!useablePublications) {
        return null
    }

    return (
        <Section label={i18n('section.publications.title')}>
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
