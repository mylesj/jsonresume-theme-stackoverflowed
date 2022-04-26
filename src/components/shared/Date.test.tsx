import { render, withConfig } from '@/test-utils'

import { Date } from './Date'

it('should render a valid date', () => {
    const { getByText } = render(<Date date="2000" />)
    expect(getByText('Jan 2000')).toBeInTheDocument()
})

it('should render nothing for an invalid date', () => {
    const { queryByText } = render(<Date date="INVALID" />)
    expect(queryByText('Jan 2000')).not.toBeInTheDocument()
})

it('should render a date as a "time" element', () => {
    const { getByText } = render(<Date date="2000" />)
    expect(getByText('Jan 2000').tagName).toBe('TIME')
})

it('should consume a date format configuration', () => {
    const { getByText } = render(<Date date="2000" />, {
        resume: withConfig({
            format: {
                date: 'MM/dd/yyyy',
            },
        }),
    })
    expect(getByText('01/01/2000')).toBeInTheDocument()
})
