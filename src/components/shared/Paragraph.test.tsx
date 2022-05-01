import { Renderer, getRenderer } from '@/test-utils'

import { Paragraph } from './Paragraph'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

it('should render nothing if it has no children', () => {
    const { container } = render(<Paragraph />)
    expect(container.childElementCount).toBe(0)
})
