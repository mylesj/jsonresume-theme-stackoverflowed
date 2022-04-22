import { ReactNode } from 'react'

import { isPopulated } from '~/util'
import { Resume } from '~/types'
import { useResume } from '~/context'
import { Section } from '~/components/shared'
import { FlexRow } from '~/components/layout'

type Skill = NonNullable<Resume['skills']>[number]

const skillRenderer = ({ name, keywords }: Skill, i: number): ReactNode => {
    return (
        <FlexRow
            key={i}
            css={{
                justifyContent: 'start',
                flexWrap: 'wrap',
                whiteSpace: 'nowrap',
                marginBottom: '1rem',
                '& > *': {
                    flexGrow: 0,
                },
            }}
        >
            {keywords?.map((keyword, i) => (
                <dt
                    key={i}
                    css={(theme) => ({
                        marginLeft: '.5rem',
                        '&::before': {
                            content: '"-"',
                            marginRight: '.5rem',
                            color: theme.text.color.tertiary,
                        },
                    })}
                >
                    {keyword}
                </dt>
            ))}
            <dd css={{ order: -1, fontWeight: 'bold' }}>{name}</dd>
        </FlexRow>
    )
}

export const Skills = () => {
    const { skills } = useResume()
    const useableSkills = skills?.filter((item) =>
        isPopulated(item, 'name', 'keywords')
    )

    if (!useableSkills) {
        return null
    }

    return (
        <Section label="Technical Skills">
            <dl>{useableSkills.map(skillRenderer)}</dl>
        </Section>
    )
}
