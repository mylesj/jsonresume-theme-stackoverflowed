import { capitalise } from './capitalise'

describe(capitalise.name, () => {
    it.each`
        case                                                  | input    | expected
        ${'upper case the first character of a word'}         | ${'foo'} | ${'Foo'}
        ${'not alter an already capitalised word'}            | ${'Foo'} | ${'Foo'}
        ${'not alter the case of other characters in a word'} | ${'fOO'} | ${'FOO'}
    `('should $case', ({ input, expected }) => {
        expect(capitalise(input)).toBe(expected)
    })
})
