import { ReactNode } from 'react'

import { FlexRow, FLEX } from '~/components/layout'

import { Link } from './Link'
import { Date } from './Date'
import { DateRange } from './DateRange'
import { ZeroWidthSpace } from './ZeroWidthSpace'

type Label = Parameters<typeof Link>[0] | string | null | undefined

type Props = {
    label: Label | [Label] | [Label, Label]
    children: ReactNode
    startDate?: string
    endDate?: string
    date?: string
}

const renderLabel = (label: Label, style: 'primary' | 'secondary') => {
    if (!label) {
        return null
    }

    const styles = {
        primary: {
            fontWeight: 'bold',
        },
        secondary: {
            '&::before': {
                content: '"—"',
                margin: '0 .5rem',
            },
        },
    }[style]

    switch (typeof label) {
        case 'string':
            return style === 'primary' ? (
                <strong css={styles}>{label}</strong>
            ) : (
                <span css={styles}>
                    <ZeroWidthSpace />
                    {label}
                </span>
            )

        // Link Props
        case 'object':
            return style === 'primary' ? (
                <strong css={styles}>
                    <Link {...label} />
                </strong>
            ) : (
                <span css={styles}>
                    <ZeroWidthSpace />
                    <Link {...label} />
                </span>
            )

        default:
            return null
    }
}

export const SubSection = ({
    label,
    children,
    date,
    startDate,
    endDate,
}: Props) => {
    const [primaryLabel, secondaryLabel] = Array.isArray(label)
        ? label
        : [label]

    return (
        <section
            css={(theme) => ({
                ...FLEX.COLUMN,
                '&:not(:first-of-type)': {
                    borderTopWidth: '2px',
                    borderTopStyle: 'solid',
                    borderTopColor: theme.spacing.color.divider,
                    paddingTop: '1rem',
                },
                '&:not(:last-of-type)': {
                    paddingBottom: '1rem',
                },
            })}
        >
            <FlexRow
                css={{
                    marginBottom: '1rem',
                }}
            >
                <h3
                    css={{
                        fontSize: '1rem',
                        alignSelf: 'start',
                    }}
                >
                    {renderLabel(primaryLabel, 'primary')}
                    {renderLabel(secondaryLabel, 'secondary')}
                </h3>
                {startDate && (
                    <DateRange
                        css={{ flex: 0, alignSelf: 'start' }}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
                {date && !startDate && (
                    <Date css={{ flex: 0, alignSelf: 'start' }} date={date} />
                )}
            </FlexRow>
            {children}
        </section>
    )
}
