import { render } from '@/test-utils'

import { DateRange } from './DateRange'

it('should render valid dates', () => {
    const { getByText } = render(<DateRange startDate="2000" endDate="2001" />)
    expect(getByText('Jan 2000')).toBeInTheDocument()
    expect(getByText('Jan 2001')).toBeInTheDocument()
})

it('should render nothing for invalid dates', () => {
    const { queryByText } = render(<DateRange startDate="INVALID" />)
    expect(queryByText('Jan 2000')).not.toBeInTheDocument()
})

it('should substitute the current date when there is no end date', () => {
    const { getByText } = render(<DateRange startDate="2000" />)
    expect(getByText('Current')).toBeInTheDocument()
})

it('should render dates as "time" elements', () => {
    const { getByText } = render(<DateRange startDate="2000" endDate="2001" />)
    const startEl = getByText('Jan 2000')
    const endEl = getByText('Jan 2001')
    expect(startEl.tagName).toBe('TIME')
    expect(endEl.tagName).toBe('TIME')
    expect(startEl.parentElement?.tagName).toBe('TIME')
    expect(startEl.parentElement).toBe(endEl.parentElement)
})
