import { render } from '@/test-utils'

import { Contact } from './Contact'

it('should render a phone number', () => {
    const { getByText } = render(<Contact phone="123456" />)
    expect(getByText('123456')).toBeInTheDocument()
})

it('should render an email address', () => {
    const { getByText } = render(<Contact email="foo@bar.com" />)
    expect(getByText('foo@bar.com')).toBeInTheDocument()
})

it('should render a location', () => {
    const { getByText } = render(
        <Contact location={{ city: 'Town', region: 'Somewhere' }} />
    )
    expect(getByText('Town, Somewhere')).toBeInTheDocument()
})

it('should render several details at once', () => {
    const { queryByText } = render(
        <Contact
            phone="123456"
            email="foo@bar.com"
            location={{ city: 'Town', region: 'Somewhere' }}
        />
    )
    expect(queryByText('123456')).toBeInTheDocument()
    expect(queryByText('foo@bar.com')).toBeInTheDocument()
    expect(queryByText('Town, Somewhere')).toBeInTheDocument()
})
