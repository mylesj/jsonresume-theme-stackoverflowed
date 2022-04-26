import { asArray } from './asArray'

describe(asArray.name, () => {
    it('should always return a shallow clone', () => {
        const arrayReference: unknown[] = []
        expect(asArray(arrayReference)).not.toBe(arrayReference)
    })

    it.each`
        case                                                     | input      | expected
        ${'encapsulate singular input as an array of input'}     | ${0}       | ${[0]}
        ${'return an equivalent array if the input is an array'} | ${[0]}     | ${[0]}
        ${'not be confused by iterable input'}                   | ${'input'} | ${['input']}
    `('should $case', ({ input, expected }) => {
        expect(asArray(input)).toEqual(expected)
    })
})
