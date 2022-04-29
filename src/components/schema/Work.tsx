import { filterPopulated } from '~/util'
import { useResume, useLocale } from '~/context'
import { Paragraph, Section, SubSection, Highlights } from '~/components/shared'

export const Work = () => {
    const i18n = useLocale('i18n')
    const { work } = useResume()
    const useableWork = work?.filter(
        filterPopulated('name', 'position', 'startDate')
    )

    if (!useableWork) {
        return null
    }

    return (
        <Section label={i18n('section.work.title')}>
            {useableWork.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[
                        item.position,
                        !item.url
                            ? item.name
                            : { to: item.url, children: item.name },
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
