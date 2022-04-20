import { isPopulated } from './is'

describe(isPopulated.name, () => {
    let input: any
    beforeEach(() => {
        input = {
            b: undefined,
            c: null,
            d: 0,
            e: 1,
            f: false,
            g: '',
        }
    })

    it.each`
        case                                  | keys                         | expected
        ${'unset keys'}                       | ${['a']}                     | ${false}
        ${'undefined keys'}                   | ${['b']}                     | ${false}
        ${'null keys'}                        | ${['c']}                     | ${false}
        ${'keys with zero values'}            | ${['d']}                     | ${true}
        ${'keys with non-zero values'}        | ${['e']}                     | ${true}
        ${'keys with a boolean false value'}  | ${['f']}                     | ${true}
        ${'keys with empty string values'}    | ${['g']}                     | ${true}
        ${'when all keys are valid'}          | ${['d', 'e', 'f', 'g']}      | ${true}
        ${'when at least one key is invalid'} | ${['d', 'e', 'c', 'f', 'g']} | ${false}
    `('should resolve $case', ({ keys, expected }) => {
        const result = isPopulated(input, ...keys)
        expect(result).toBe(expected)
    })
})
