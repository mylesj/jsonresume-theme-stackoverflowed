import { Children, ReactNode, ReactElement } from 'react'

import { FlexRow, FLEX } from '~/components/layout'

import { Link } from './Link'
import { DateRange } from './DateRange'
import { ZeroWidthSpace } from './ZeroWidthSpace'

type Label = null | undefined | string | ReactElement // Link

type Props = {
    label: Label | [Label] | [Label, Label]
    startDate?: string
    endDate?: string
    children: ReactNode
}

const renderLabel = (label: ReactNode, style: 'primary' | 'secondary') => {
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

    // todo: figure out proper type checking
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

        case 'object':
            if ('type' in label && label.type !== Link) {
                return null
            }
            return style === 'primary' ? (
                <strong css={styles}>{label}</strong>
            ) : (
                <span css={styles}>
                    <ZeroWidthSpace />
                    {label}
                </span>
            )

        default:
            console.warn(
                '[err] SubSection - Invalid label component',
                '\n - accepts: string | Link'
            )
            return null
    }
}

export const SubSection = ({ label, startDate, endDate, children }: Props) => {
    const [primaryLabel, secondaryLabel] =
        Children.toArray(label).filter(Boolean)
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
            <FlexRow>
                <h3
                    css={{
                        fontSize: '1rem',
                        marginBottom: '1rem',
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
            </FlexRow>
            {children}
        </section>
    )
}
