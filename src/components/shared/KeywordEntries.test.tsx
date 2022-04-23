import { render } from '@/test-utils'

import { KeywordEntries } from './KeywordEntries'

it.each`
    name            | keywords
    ${'Category A'} | ${['One', 'Two', 'Three']}
    ${'Category B'} | ${['Foo', 'Bar', 'Baz']}
`('should define "$name" as terms: $keywords', ({ name, keywords }) => {
    const { getByText } = render(
        <KeywordEntries entries={[{ name, keywords }]} />
    )
    const dd = getByText(name)
    const dt = Array.from(dd.parentElement?.childNodes || [])
        .filter((el) => el !== dd)
        .map((el) => el.textContent)

    expect(dt).toEqual(keywords)
})
