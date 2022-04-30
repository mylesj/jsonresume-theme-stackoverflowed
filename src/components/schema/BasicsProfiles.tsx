import { filterAny, filterPopulated } from '~/util'
import { useLocale, useResume } from '~/context'
import { Section, SimpleEntries } from '~/components/shared'

export const BasicsProfiles = () => {
    const i18n = useLocale('i18n')
    const profiles = useResume().basics?.profiles || []
    const useableProfiles = profiles.filter(
        filterAny(
            filterPopulated('network', 'username'),
            filterPopulated('network', 'url')
        )
    )

    if (!useableProfiles) {
        return null
    }

    // todo: social icons
    // todo: map usernames to URLs
    return (
        <Section label={i18n('section.profiles.title')}>
            <SimpleEntries
                showUrl
                entries={useableProfiles.map(
                    ({ network: title, username: label, url }) => ({
                        title,
                        label,
                        url,
                    })
                )}
                css={{
                    marginBottom: '1rem',
                }}
            />
        </Section>
    )
}