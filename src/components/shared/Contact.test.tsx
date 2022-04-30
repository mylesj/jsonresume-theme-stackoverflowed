import { Renderer, getRenderer, withConfig } from '@/test-utils'

import { Contact } from './Contact'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

describe('renderer', () => {
    it('should render a phone number', () => {
        const { getByText } = render(<Contact phone="123456" />)
        expect(getByText('123456')).toBeInTheDocument()
    })

    it('should render an email address', () => {
        const { getByText } = render(<Contact email="foo@bar.com" />)
        expect(getByText('foo@bar.com')).toBeInTheDocument()
    })

    it('should render a location', () => {
        const { getByText } = render(<Contact location={{ city: 'City' }} />)
        expect(getByText('City')).toBeInTheDocument()
    })

    it('should render several details at once', () => {
        const { queryByText } = render(
            <Contact
                phone="123456"
                email="foo@bar.com"
                location={{ city: 'City' }}
            />
        )
        expect(queryByText('123456')).toBeInTheDocument()
        expect(queryByText('foo@bar.com')).toBeInTheDocument()
        expect(queryByText('City')).toBeInTheDocument()
    })
})

describe('location formats', () => {
    describe('when no configuration is provided', () => {
        it.each`
            case                                           | city      | region       | countryCode  | expected
            ${'prioritise city and region'}                | ${'City'} | ${'Region'}  | ${'US'}      | ${'City, Region'}
            ${'then prioritise city and country name'}     | ${'City'} | ${undefined} | ${'US'}      | ${'City, United States'}
            ${'fallback to city and country-code (as-is)'} | ${'City'} | ${undefined} | ${'BOGUS'}   | ${'City, BOGUS'}
            ${'then fallback to city name only'}           | ${'City'} | ${undefined} | ${undefined} | ${'City'}
        `('should $case', ({ city, region, countryCode, expected }) => {
            const { getByText } = render(
                <Contact location={{ city, region, countryCode }} />,
                { resume: () => ({}) }
            )
            expect(getByText(expected)).toBeInTheDocument()
        })
    })

    describe('when configuration is provided', () => {
        const CFG_VALID = '{{city}} - {{countryNameOfficial}}'
        const CFG_INVALID = '{{city}} - {{INVALID}}'
        const CFG_ARBITRARY = '{{city}} - {{postalCode}}'

        it.each`
            case                                                                   | config                        | expected
            ${'prioritise a single user-defined location format'}                  | ${CFG_VALID}                  | ${'City - United States of America'}
            ${'fallback to builtin defaults if a user-format is invalid'}          | ${CFG_INVALID}                | ${'City, Region'}
            ${'prioritise multiple user-defined locations and fallbacks'}          | ${[CFG_INVALID, CFG_VALID]}   | ${'City - United States of America'}
            ${'fallback to builtin defaults if multiple user-formats are invalid'} | ${[CFG_INVALID, CFG_INVALID]} | ${'City, Region'}
            ${'render any arbitrary location data not handled by this theme'}      | ${CFG_ARBITRARY}              | ${'City - 01234'}
        `('should $case', ({ config, expected }) => {
            const { getByText } = render(
                <Contact
                    location={{
                        city: 'City',
                        region: 'Region',
                        countryCode: 'US',
                        postalCode: '01234',
                    }}
                />,
                {
                    resume: withConfig({
                        format: {
                            location: config,
                        },
                    }),
                }
            )
            expect(getByText(expected)).toBeInTheDocument()
        })
    })

    describe('when a template contains newline characters', () => {
        it('should split the text across multiple lines', () => {
            const { getByText } = render(
                <Contact
                    location={{
                        address: '2712 Broadway St',
                        postalCode: 'CA 94115',
                        city: 'San Francisco',
                        region: 'California',
                    }}
                />,
                {
                    resume: withConfig({
                        format: {
                            location: JSON.parse(
                                '"{{address}}, {{postalCode}} \\n {{city}}, {{region}}"'
                            ),
                        },
                    }),
                }
            )

            expect(getByText('2712 Broadway St, CA 94115')).toBeInTheDocument()
            expect(getByText('San Francisco, California')).toBeInTheDocument()
        })
    })
})
