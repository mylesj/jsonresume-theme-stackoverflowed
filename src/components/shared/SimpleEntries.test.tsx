import { Renderer, getRenderer } from '@/test-utils'

import { SimpleEntries } from './SimpleEntries'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

let entries: {
    [key in string]: Parameters<typeof SimpleEntries>[0]['entries'][number]
}
beforeEach(() => {
    entries = {
        titleOne: { title: 'one' },
        titleTwo: { title: 'two' },
        titleLabel: { title: 'foo', label: 'bar' },
        titleUrl: { title: 'foo', url: 'https://foo.com' },
        titleLabelUrl: { title: 'foo', label: 'bar', url: 'https://foo.com' },
        titleIcon: { title: 'icon entry', icon: 'stackoverflow' },
    }
})

it('should render a simple entry', () => {
    const { getByText } = render(<SimpleEntries entries={[entries.titleOne]} />)
    expect(getByText('one')).toBeInTheDocument()
})

it('should render multiple simple entries', () => {
    const { getByText } = render(
        <SimpleEntries entries={[entries.titleOne, entries.titleTwo]} />
    )
    expect(getByText('one')).toBeInTheDocument()
    expect(getByText('two')).toBeInTheDocument()
})

it('should render titles and labels', () => {
    const { getByText } = render(
        <SimpleEntries entries={[entries.titleLabel]} />
    )
    expect(getByText('foo')).toBeInTheDocument()
    expect(getByText('bar')).toBeInTheDocument()
})

it('should render titles and URLs', () => {
    const { getByText } = render(<SimpleEntries entries={[entries.titleUrl]} />)
    expect(getByText('foo')).toBeInTheDocument()
    expect(getByText('foo.com')).toBeInTheDocument()
})

it('should render URLs substituting labels if present', () => {
    const { getByText } = render(
        <SimpleEntries entries={[entries.titleLabelUrl]} />
    )
    expect(getByText('foo')).toBeInTheDocument()
    expect(getByText('bar')).toBeInTheDocument()
    expect(getByText('bar').getAttribute('href')).toBe('https://foo.com')
})

it('should prioritise rendering URLs if the showUrl prop is true', () => {
    const { getByText } = render(
        <SimpleEntries showUrl entries={[entries.titleLabelUrl]} />
    )
    expect(getByText('foo')).toBeInTheDocument()
    expect(getByText('foo.com')).toBeInTheDocument()
    expect(getByText('foo.com').getAttribute('href')).toBe('https://foo.com')
})

it('should render an icon for valid social network types', () => {
    const { getByText } = render(
        <SimpleEntries showUrl entries={[entries.titleIcon]} />
    )
    const svg = getByText('icon entry').parentElement?.querySelector('svg')
    expect(svg).toBeInTheDocument()
})
