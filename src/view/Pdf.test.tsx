import { render } from '@/test-utils'

import { Pdf } from './Pdf'

it('should render schema basics', () => {
    const { getByText } = render(<Pdf />, {
        resume: ({ basics }) => ({ basics }),
    })
    expect(getByText('Richard Hendriks')).toBeInTheDocument()
})

it('should render schema skills', () => {
    const { getByText } = render(<Pdf />, {
        resume: ({ skills }) => ({ skills }),
    })
    expect(getByText('Technical Skills')).toBeInTheDocument()
})
