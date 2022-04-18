import { render } from '@/test-utils'

import { Link } from './Link'

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
