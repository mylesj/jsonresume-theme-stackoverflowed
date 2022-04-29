import { filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Section, SimpleEntries } from '~/components/shared'

export const Languages = () => {
    const i18n = useLocale('i18n')
    const { languages } = useResume()
    const useableLanguages = languages?.filter(
        filterPopulated('language', 'fluency')
    )

    if (!useableLanguages) {
        return null
    }

    return (
        <Section label={i18n('section.languages.title')}>
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
