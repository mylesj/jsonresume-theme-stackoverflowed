import { Renderer, getRenderer } from '@/test-utils'

import { Link } from './Link'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

it.each`
    case                                 | type      | to                        | expectedHref             | expectedText
    ${'http URLs'}                       | ${'url'}  | ${'http://www.foo.com'}   | ${'http://www.foo.com'}  | ${'foo.com'}
    ${'https URLs'}                      | ${'url'}  | ${'https://www.foo.com'}  | ${'https://www.foo.com'} | ${'foo.com'}
    ${'agnostic URLs'}                   | ${'url'}  | ${'//www.foo.com'}        | ${'https://www.foo.com'} | ${'foo.com'}
    ${'ambiguous URLs'}                  | ${'url'}  | ${'foo.com'}              | ${'https://foo.com'}     | ${'foo.com'}
    ${'local telephone formats'}         | ${'tel'}  | ${'(0123) 555-1234'}      | ${'tel:01235551234'}     | ${'(0123) 555-1234'}
    ${'international telephone formats'} | ${'tel'}  | ${'+44 1234 123 456'}     | ${'tel:+441234123456'}   | ${'+44 1234 123 456'}
    ${'localization substitute formats'} | ${'tel'}  | ${'+44 (0) 1234 123 456'} | ${'tel:+441234123456'}   | ${'+44 (0) 1234 123 456'}
    ${'"tel:" prefixes in numbers'}      | ${'tel'}  | ${'tel:123456'}           | ${'tel:123456'}          | ${'123456'}
    ${'email addresses'}                 | ${'mail'} | ${'foo@bar.com'}          | ${'mailto:foo@bar.com'}  | ${'foo@bar.com'}
    ${'"mailto:" in addresses'}          | ${'mail'} | ${'mailto:foo@bar.com'}   | ${'mailto:foo@bar.com'}  | ${'foo@bar.com'}
`('should handle $case', ({ type, to, expectedHref, expectedText }) => {
    const { getByRole } = render(<Link type={type} to={to} />)
    const el = getByRole('link')
    expect(el.textContent).toBe(expectedText)
    expect(el.getAttribute('href')).toBe(expectedHref)
})

describe('the "rel" attribute', () => {
    it.each`
        case                                          | type      | to                       | external     | nofollow     | expected
        ${'set "external" & "nofollow" by default'}   | ${'url'}  | ${'https://www.foo.com'} | ${undefined} | ${undefined} | ${'external nofollow'}
        ${'allow "external" opt-out'}                 | ${'url'}  | ${'https://www.foo.com'} | ${false}     | ${undefined} | ${'nofollow'}
        ${'allow "nofollow" opt-out'}                 | ${'url'}  | ${'https://www.foo.com'} | ${undefined} | ${false}     | ${'external'}
        ${'allow "external" and "nofollow" opt-out'}  | ${'url'}  | ${'https://www.foo.com'} | ${false}     | ${false}     | ${null}
        ${'ignore the attribute for mail links'}      | ${'mail'} | ${'foo@bar.com'}         | ${true}      | ${true}      | ${null}
        ${'ignore the attribute for telephone links'} | ${'tel'}  | ${'123456'}              | ${true}      | ${true}      | ${null}
    `('should $case', ({ type, to, external, nofollow, expected }) => {
        const { getByRole } = render(
            <Link type={type} to={to} external={external} nofollow={nofollow} />
        )
        const el = getByRole('link')
        expect(el.getAttribute('rel')).toBe(expected)
    })
})

describe('when children are', () => {
    it.each`
        type      | to                      | children    | expected
        ${'url'}  | ${'http://www.foo.com'} | ${'custom'} | ${'custom'}
        ${'mail'} | ${'foo@bar.com'}        | ${'custom'} | ${'custom'}
        ${'tel'}  | ${'123456'}             | ${'custom'} | ${'custom'}
    `(
        'should override text for the "$type" type',
        ({ type, to, children, expected }) => {
            const { getByRole } = render(
                <Link type={type} to={to}>
                    {children}
                </Link>
            )
            const el = getByRole('link')
            expect(el.textContent).toBe(expected)
        }
    )
})
