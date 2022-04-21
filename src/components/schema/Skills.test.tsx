import { render } from '@/test-utils'

import { Skills } from './Skills'

it.each`
    definition           | terms
    ${'Web Development'} | ${['HTML', 'CSS', 'Javascript']}
    ${'Compression'}     | ${['Mpeg', 'MP4', 'GIF']}
`('should define "$definition" as terms: $terms', ({ definition, terms }) => {
    const { getByText } = render(<Skills />)
    const dd = getByText(definition)
    const dt = Array.from(dd.parentElement?.childNodes || [])
        .filter((el) => el !== dd)
        .map((el) => el.textContent)

    expect(dt).toEqual(terms)
})
