import { filterPopulated } from '~/util'
import { useResume } from '~/context'
import { Section, KeywordEntries } from '~/components/shared'

export const Skills = () => {
    const { skills } = useResume()
    const useableSkills = skills?.filter(filterPopulated('name', 'keywords'))

    if (!useableSkills) {
        return null
    }

    return (
        <Section label="Technical Skills">
            <KeywordEntries
                css={{ marginBottom: '1rem' }}
                entries={useableSkills}
            />
        </Section>
    )
}
