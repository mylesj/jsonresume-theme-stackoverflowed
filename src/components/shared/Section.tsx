import { ReactNode } from 'react'

import { FLEX } from '~/components/layout'

type Props = {
    label: string
    children: ReactNode
}

export const Section = ({ label, children }: Props) => {
    return (
        <section
            css={(theme) => ({
                ...FLEX.ROW,
                borderTopWidth: '2px',
                borderTopStyle: 'solid',
                borderTopColor: theme.spacing.color.divider,
                paddingTop: '1rem',
            })}
        >
            <h2
                css={(theme) => ({
                    color: theme.text.color.subTitle,
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    letterSpacing: '-0.03125rem',
                    paddingTop: '1rem',
                    margin: 0,
                    alignSelf: 'start',
                })}
            >
                {label}
            </h2>
            <div
                css={{
                    flex: 3,
                    alignSelf: 'start',
                }}
            >
                {children}
            </div>
        </section>
    )
}
