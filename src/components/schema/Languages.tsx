import { isPopulated } from '~/util'
import { useResume } from '~/context'
import { Section, SimpleEntries } from '~/components/shared'

export const Languages = () => {
    const { languages } = useResume()
    const useableLanguages = languages?.filter((item) =>
        isPopulated(item, 'language', 'fluency')
    )

    if (!useableLanguages) {
        return null
    }

    return (
        <Section label="Languages">
            <SimpleEntries
                entries={useableLanguages.map(
                    ({ language: title, fluency: label }) => ({ title, label })
                )}
                css={{
                    marginBottom: '1rem',
                }}
            />
        </Section>
    )
}
