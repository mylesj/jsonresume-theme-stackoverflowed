import { filterAll, filterAny, filterPopulated } from './filters'

describe(filterAll.name, () => {
    it('should return a thunk', () => {
        expect(filterAll(() => true)).toEqual(expect.any(Function))
    })

    it.each`
        case                                        | predicateReturnValues  | expected
        ${'true for any true predicate'}            | ${[true]}              | ${true}
        ${'false for any false predicate'}          | ${[false]}             | ${false}
        ${'true when all predicates return true'}   | ${[true, true, true]}  | ${true}
        ${'false when any predicate returns false'} | ${[true, false, true]} | ${false}
    `('should return $case', ({ predicateReturnValues, expected }) => {
        const composedPredicate = filterAll(
            ...(predicateReturnValues as boolean[]).map((v) => () => v)
        )
        expect(composedPredicate({})).toBe(expected)
    })
})

describe(filterAny.name, () => {
    it('should return a thunk', () => {
        expect(filterAny(() => true)).toEqual(expect.any(Function))
    })

    it.each`
        case                                        | predicateReturnValues    | expected
        ${'true for any true predicate'}            | ${[true]}                | ${true}
        ${'false for any false predicate'}          | ${[false]}               | ${false}
        ${'true when any predicate returns true'}   | ${[false, true, false]}  | ${true}
        ${'false when all predicates return false'} | ${[false, false, false]} | ${false}
    `('should return $case', ({ predicateReturnValues, expected }) => {
        const composedPredicate = filterAny(
            ...(predicateReturnValues as boolean[]).map((v) => () => v)
        )
        expect(composedPredicate({})).toBe(expected)
    })
})

describe(filterPopulated.name, () => {
    let input: Record<string, unknown>
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

    it('should return a thunk', () => {
        expect(filterPopulated('key')).toEqual(expect.any(Function))
    })

    it.each`
        case                                     | keys                    | expected
        ${'for unset keys'}                      | ${['a']}                | ${false}
        ${'for undefined keys'}                  | ${['b']}                | ${false}
        ${'for null keys'}                       | ${['c']}                | ${false}
        ${'for keys with zero values'}           | ${['d']}                | ${true}
        ${'for keys with non-zero values'}       | ${['e']}                | ${true}
        ${'for keys with a boolean false value'} | ${['f']}                | ${true}
        ${'for keys with empty string values'}   | ${['g']}                | ${false}
        ${'when all keys are valid'}             | ${['d', 'e', 'f']}      | ${true}
        ${'when at least one key is invalid'}    | ${['d', 'e', 'c', 'f']} | ${false}
    `('should resolve $expected $case', ({ keys, expected }) => {
        const result = filterPopulated(...keys)(input)
        expect(result).toBe(expected)
    })
})
