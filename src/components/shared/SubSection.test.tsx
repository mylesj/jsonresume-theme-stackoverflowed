import { render } from '@/test-utils'

import { Link } from './Link'
import { SubSection } from './SubSection'

describe('labels', () => {
    const linkOne = <Link to="https://foo.com">one</Link>
    const linkTwo = <Link to="https://foo.com">two</Link>

    it.each`
        case                                           | label                        | query    | expected
        ${'render a single label'}                     | ${'one'}                     | ${'one'} | ${true}
        ${'render a single link'}                      | ${linkOne}                   | ${'one'} | ${true}
        ${'render an array of one label'}              | ${['one']}                   | ${'one'} | ${true}
        ${'render an array of one link'}               | ${[linkOne]}                 | ${'one'} | ${true}
        ${'render a second label'}                     | ${['one', 'two']}            | ${'two'} | ${true}
        ${'render a second link'}                      | ${['one', linkTwo]}          | ${'two'} | ${true}
        ${'not render an incorrect first label type'}  | ${[<span>one</span>, 'two']} | ${'one'} | ${false}
        ${'not render an incorrect second label type'} | ${['one', <span>two</span>]} | ${'two'} | ${false}
    `('should $case', ({ label, query, expected }) => {
        const { queryByText } = render(<SubSection label={label} children="" />)
        const el = queryByText(query)
        expected
            ? expect(el).toBeInTheDocument()
            : expect(el).not.toBeInTheDocument()
    })
})
