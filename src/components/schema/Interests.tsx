import { isPopulated } from '~/util'
import { useResume } from '~/context'
import { Section, KeywordEntries } from '~/components/shared'

export const Interests = () => {
    const { interests } = useResume()
    const useableInterest = interests?.filter((item) =>
        isPopulated(item, 'name', 'keywords')
    )

    if (!useableInterest) {
        return null
    }

    return (
        <Section label="Interests">
            <KeywordEntries
                css={{ marginBottom: '1rem' }}
                entries={useableInterest}
            />
        </Section>
    )
}
