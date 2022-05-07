import { Renderer, getRenderer } from '@/test-utils'

import { PageBreak } from './PageBreak'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

it('should render by default', () => {
    const { container } = render(<PageBreak />)
    expect(container.childNodes.length).toBe(1)
})

it('should not render when disabled', () => {
    const { container } = render(<PageBreak enable={false} />)
    expect(container.childNodes.length).toBe(0)
})
