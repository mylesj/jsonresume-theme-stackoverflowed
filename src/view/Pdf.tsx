import { useMemo, Fragment } from 'react'

import { FlexColumn } from '~/components/layout'

import {
    Basics,
    BasicsProfiles,
    Skills,
    Work,
    Volunteer,
    Projects,
    Education,
    Awards,
    Publications,
    Languages,
    Interests,
    References,
} from '~/components/schema'

import { PageBreak } from '~/components/shared'

import { useConfig } from '~/context'

import { SectionName, Component } from '~/types'

type Sections = {
    [key in SectionName]?: Component
}

const SECTIONS: Sections = {
    skills: Skills,
    work: Work,
    volunteer: Volunteer,
    projects: Projects,
    education: Education,
    awards: Awards,
    publications: Publications,
    languages: Languages,
    interests: Interests,
    profiles: BasicsProfiles,
    references: References,
}

// [name, Component, pageBreak, order]
const useSections = () => {
    const config = useConfig('section')
    const sectionConfig = (name: string) => config?.[name as SectionName]

    return useMemo(() => {
        return Object.entries(SECTIONS)
            .filter(([name]) => !sectionConfig(name)?.hidden)
            .map(
                ([name, Component], i) =>
                    [
                        name,
                        Component,
                        sectionConfig(name)?.break ?? false,
                        sectionConfig(name)?.order ?? i + 1,
                    ] as const
            )
            .sort(([, , , aOrder], [, , , bOrder]) => aOrder - bOrder)
    }, [config])
}

export const Pdf = () => {
    const sections = useSections()

    return (
        <FlexColumn
            css={(theme) => ({
                fontFamily: theme.text.font.primary,
                color: theme.text.color.primary,
                lineHeight: '1.5',
                ...theme.when(['screen', 'normal'], {
                    padding: '4rem 4rem 4rem 6rem',
                }),
                ...theme.when(['screen', 'narrow'], {
                    padding: '2rem 2rem 2rem 3rem',
                }),
            })}
        >
            <header>
                <Basics />
            </header>
            <main>
                {sections.map(([name, Component, pageBreak]) => (
                    <Fragment key={name}>
                        <PageBreak enable={pageBreak} />
                        <Component />
                    </Fragment>
                ))}
            </main>
        </FlexColumn>
    )
}
