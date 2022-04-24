import { ReactNode } from 'react'

type Props = {
    children: ReactNode
    className?: string
}

const Box = ({ children, className }: Props) => {
    return <div className={className}>{children}</div>
}

const FLEX_DEFAULTS = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
        flex: 1,
        width: '100%',
        height: '100%',
    },
} as const

export const FLEX = {
    ROW: {
        ...FLEX_DEFAULTS,
        flexDirection: 'row',
    },
    COLUMN: {
        ...FLEX_DEFAULTS,
        flexDirection: 'column',
    },
} as const

export const FlexRow: typeof Box = (props) => <Box {...props} css={FLEX.ROW} />

export const FlexColumn: typeof Box = (props) => (
    <Box {...props} css={FLEX.COLUMN} />
)
