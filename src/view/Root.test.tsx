import { Renderer, getRenderer } from '@/test-utils'

import Root from './Root'
import * as pdf from './Pdf'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

beforeEach(() => {
    jest.spyOn(pdf, 'Pdf').mockImplementation(() => <></>)
})

it('should wrap the view container with css', () => {
    const { container } = render(<Root />)
    expect(container).toHaveStyle({
        // arbitrary check for something that isn't going to change
        backgroundColor: '"rgb(255, 255, 255)"',
    })
})
