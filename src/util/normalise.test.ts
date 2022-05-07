import { normaliseTag } from './normalise'

describe(normaliseTag.name, () => {
    it.each`
        input                | expected
        ${'GitHub'}          | ${'github'}
        ${'Stack Overflow'}  | ${'stackoverflow'}
        ${'  trim  edges  '} | ${'trimedges'}
    `('should resolve "$input" to "$expected"', ({ input, expected }) => {
        expect(normaliseTag(input)).toBe(expected)
    })
})
