import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Section, KeywordEntries } from '~/components/shared'

export const Interests = () => {
    const i18n = useLocale('i18n')
    const { interests } = useResume()
    const useableInterest = interests?.filter(
        filterPopulated('name', 'keywords')
    )

    if (!useableInterest) {
        return null
    }

    return (
        <Section label={i18n('section.interests.title')}>
            <KeywordEntries
                css={{ marginBottom: '1rem' }}
                entries={useableInterest}
            />
        </Section>
    )
}
