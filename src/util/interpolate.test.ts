import { interpolate } from './interpolate'

describe(interpolate.name, () => {
    let values: Parameters<typeof interpolate>[1]
    beforeEach(() => {
        values = {
            a: '',
            b: null,
            c: undefined,
            d: 0,
            e: 1,
            f: 'two',
            A: 'A',
            a_b: 'a_b',
            'a-b': 'a-b',
            'a.b': 'a.b',
        }
    })

    it.each`
        case                                            | template                         | expected
        ${'pass through literals'}                      | ${'silly string'}                | ${'silly string'}
        ${'interpolate a value'}                        | ${'{{f}}'}                       | ${'two'}
        ${'interpolate many values'}                    | ${'!{{e}} / {{f}}!'}             | ${'!1 / two!'}
        ${'interpolate falsy values'}                   | ${'{{d}}'}                       | ${'0'}
        ${'interpolate uppercase keys'}                 | ${'{{A}}'}                       | ${'A'}
        ${'interpolate snake_case keys'}                | ${'{{a_b}}'}                     | ${'a_b'}
        ${'interpolate hyphen-case keys'}               | ${'{{a-b}}'}                     | ${'a-b'}
        ${'interpolate dot.delimited keys'}             | ${'{{a.b}}'}                     | ${'a.b'}
        ${'return null for unset variables'}            | ${'{{does_not_exist}}'}          | ${null}
        ${'return null for empty values'}               | ${'"{{a}}" / "{{b}}" / "{{c}}"'} | ${null}
        ${'return null for case-sensitive keys'}        | ${'{{B}}'}                       | ${null}
        ${'return an empty string for undefined input'} | ${undefined}                     | ${''}
    `('should $case', ({ template, expected }) => {
        expect(interpolate(template, values)).toBe(expected)
    })
})
