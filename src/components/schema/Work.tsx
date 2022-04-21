import { isPopulated } from '~/util'
import { useResume } from '~/context'
import {
    Paragraph,
    Link,
    Section,
    SubSection,
    Highlights,
} from '~/components/shared'

export const Work = () => {
    const { work } = useResume()
    if (!work) {
        return null
    }
    const useableWork = work.filter((item) =>
        isPopulated(item, 'name', 'position', 'startDate')
    )

    return (
        <Section label="Experience">
            {useableWork.map((item, i) => (
                <SubSection
                    key={i}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    label={[
                        item.position,
                        !item.url ? (
                            item.name
                        ) : (
                            <Link to={item.url}>{item.name}</Link>
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
