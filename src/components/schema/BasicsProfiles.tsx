import { useMemo, ReactNode } from 'react'

import { TAG_STACKOVERFLOW } from '~/constants'
import { filterAny, filterPopulated, normaliseTag } from '~/util'
import { useLocale, useResume } from '~/context'
import { Section, SimpleEntries } from '~/components/shared'

type StackOverflowMetaProps = {
    answers?: number
    tags?: string[]
}

const StackOverflowMeta = ({ answers, tags }: StackOverflowMetaProps) => {
    const i18n = useLocale('i18n')
    if (!answers || !tags || answers <= 0 || tags.length <= 0) {
        return null
    }

    return (
        <em
            css={{
                fontStyle: 'italic',
                marginTop: '.3rem',
            }}
        >
            {i18n('section.profiles.stackoverflow-activity', {
                answers,
                tags: tags.join(', '),
            })}
        </em>
    )
}

const useNetworkDetail = () => {
    const i18n = useLocale('i18n')
    const basics = useResume().basics
    const skills = useResume().skills

    return useMemo(
        () => (network?: string) => {
            const key = network && normaliseTag(network)
            let networkDetail: ReactNode

            if (key === TAG_STACKOVERFLOW) {
                const meta = basics?.stackOverflow
                if (!meta || !skills) {
                    return
                }
                const relevantKeywords = skills.reduce<string[]>(
                    (acc, { keywords = [] }) => {
                        acc.push(...keywords.map(normaliseTag))
                        return acc
                    },
                    []
                )
                const relevantTags = meta.activeTags.filter((tag) =>
                    relevantKeywords.includes(tag)
                )

                networkDetail = (
                    <StackOverflowMeta
                        answers={meta.answersTotal}
                        tags={relevantTags}
                    />
                )
            }

            return networkDetail
        },
        [i18n, basics, skills]
    )
}

export const BasicsProfiles = () => {
    const i18n = useLocale('i18n')
    const networkDetail = useNetworkDetail()
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

    return (
        <Section label={i18n('section.profiles.title')}>
            <SimpleEntries
                showUrl
                entries={useableProfiles.map(
                    ({ network, username: label, url }) => ({
                        title: network,
                        icon: network,
                        label,
                        url,
                        children: networkDetail(network),
                    })
                )}
                css={{
                    marginBottom: '1rem',
                }}
            />
        </Section>
    )
}
