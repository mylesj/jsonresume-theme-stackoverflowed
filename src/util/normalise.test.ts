import { normaliseNetwork } from './normalise'

describe(normaliseNetwork.name, () => {
    it.each`
        input                | expected
        ${'GitHub'}          | ${'github'}
        ${'Stack Overflow'}  | ${'stackoverflow'}
        ${'  trim  edges  '} | ${'trimedges'}
    `('should resolve "$input" to "$expected"', ({ input, expected }) => {
        expect(normaliseNetwork(input)).toBe(expected)
    })
})
