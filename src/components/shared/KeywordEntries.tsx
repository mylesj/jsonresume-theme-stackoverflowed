import { ReactNode } from 'react'

import { WithEmotionCss, MaybeInternalProps } from '~/types'

import { FlexRow } from '~/components/layout'

type Entry = {
    name?: string
    keywords?: string[]
}

type Props = {
    entries: Entry[]
}

const renderer = ({ name, keywords }: Entry, i: number): ReactNode => {
    return (
        <FlexRow
            key={i}
            css={{
                justifyContent: 'start',
                flexWrap: 'wrap',
                whiteSpace: 'nowrap',
                '&:not(:last-of-type)': {
                    marginBottom: '1rem',
                },
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

export const KeywordEntries = ({ entries, ...rest }: WithEmotionCss<Props>) => {
    const { className } = rest as MaybeInternalProps
    return <dl className={className}>{entries.map(renderer)}</dl>
}
