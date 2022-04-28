import { Renderer, getRenderer } from '@/test-utils'

import { SubSection } from './SubSection'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

describe('labels', () => {
    const linkOneProps = { to: 'https://foo.com', children: 'one' }
    const linkTwoProps = { to: 'https://foo.com', children: 'two' }

    it.each`
        case                                            | label                                  | query    | expected
        ${'render a single label'}                      | ${'one'}                               | ${'one'} | ${true}
        ${'render a single link if passed valid props'} | ${linkOneProps}                        | ${'one'} | ${true}
        ${'render an array of length one with a label'} | ${['one']}                             | ${'one'} | ${true}
        ${'render an array of length one with props'}   | ${[linkOneProps]}                      | ${'one'} | ${true}
        ${'render a second label if passed an array'}   | ${['one', 'two']}                      | ${'two'} | ${true}
        ${'render a second link if passed an array'}    | ${['one', linkTwoProps]}               | ${'two'} | ${true}
        ${'not render an incorrect first label type'}   | ${[<span key="one">one</span>, 'two']} | ${'one'} | ${false}
        ${'not render an incorrect second label type'}  | ${['one', <span key="two">two</span>]} | ${'two'} | ${false}
    `('should $case', ({ label, query, expected }) => {
        const { queryByText } = render(
            <SubSection label={label}>foo</SubSection>
        )
        const el = queryByText(query)
        expected
            ? expect(el).toBeInTheDocument()
            : expect(el).not.toBeInTheDocument()
    })
})

describe('dates', () => {
    it('should render a single date', () => {
        const { getByText } = render(
            <SubSection label="" date="2000">
                foo
            </SubSection>
        )
        const el = getByText('Jan 2000')
        expect(el).toBeInTheDocument()
        expect(el.parentElement?.tagName).not.toBe('TIME')
    })

    it('should render a date range', () => {
        const { getByText } = render(
            <SubSection label="" startDate="2000" endDate="2001">
                foo
            </SubSection>
        )
        expect(getByText('Jan 2000')).toBeInTheDocument()
        expect(getByText('Jan 2001')).toBeInTheDocument()
    })

    it('should prioritize a date range if ambiguous input is recieved', () => {
        const { getByText } = render(
            <SubSection label="" date="2000" startDate="2001">
                foo
            </SubSection>
        )
        expect(getByText('Jan 2001')).toBeInTheDocument()
        expect(getByText('Current')).toBeInTheDocument()
    })
})
