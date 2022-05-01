import { Renderer, getRenderer } from '@/test-utils'

import { Highlights } from './Highlights'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

it('should render nothing if it has no children', () => {
    const { container } = render(<Highlights />)
    expect(container.childElementCount).toBe(0)
})
