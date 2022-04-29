import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Section, KeywordEntries } from '~/components/shared'

export const Skills = () => {
    const i18n = useLocale('i18n')
    const { skills } = useResume()
    const useableSkills = skills?.filter(filterPopulated('name', 'keywords'))

    if (!useableSkills) {
        return null
    }

    return (
        <Section label={i18n('section.skills.title')}>
            <KeywordEntries
                css={{ marginBottom: '1rem' }}
                entries={useableSkills}
            />
        </Section>
    )
}
