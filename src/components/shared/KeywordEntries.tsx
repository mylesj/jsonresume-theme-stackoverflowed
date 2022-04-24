import { ReactNode } from 'react'

import { FlexRow } from '~/components/layout'

type Entry = {
    name?: string
    keywords?: string[]
}

type Props = {
    entries: Entry[]
    className?: string
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

export const KeywordEntries = ({ entries, className }: Props) => {
    return <dl className={className}>{entries.map(renderer)}</dl>
}
