/**
 * @jest-environment node
 */

import { render } from './main'
import { useResume } from './context'

jest.mock('./view', () => ({
    __esModule: true,
    default: () => useResume().basics?.name,
}))

it('should render a basic html document', () => {
    const rendered = render({
        basics: {
            name: 'Richard Hendriks',
            label: 'Programmer',
        },
    })

    expect(rendered).toMatchSnapshot()
})
