import { shortCode } from './util'

describe(shortCode.name, () => {
    it.each`
        case                               | code       | expected
        ${'leave a short code as-is'}      | ${'en'}    | ${'en'}
        ${'lowercase locale codes'}        | ${'EN'}    | ${'en'}
        ${'truncate hyphenated variants'}  | ${'en-US'} | ${'en'}
        ${'truncate underscored variants'} | ${'en_US'} | ${'en'}
    `('should $case', ({ code, expected }) => {
        expect(shortCode(code)).toBe(expected)
    })
})
