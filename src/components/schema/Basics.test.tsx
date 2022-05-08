import { compose } from 'ramda'

import { Renderer, getRenderer, withConfig } from '@/test-utils'

import { Basics } from './Basics'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

describe(Basics.name, () => {
    describe('Avatar', () => {
        it.each`
            case                                | name      | image             | gravatar
            ${'there is a name and an image'}   | ${'name'} | ${'http://image'} | ${undefined}
            ${'there is a name and a gravatar'} | ${'name'} | ${undefined}      | ${'http://gravatar'}
        `('should render when $case', ({ name, image, gravatar }) => {
            const { getByRole } = render(<Basics />, {
                resume: () => ({
                    basics: { name, image, gravatar },
                }),
            })
            expect(getByRole('img')).toBeInTheDocument()
        })

        it('should prioritise an image if both it and a gravatar are available', () => {
            const { getByRole } = render(<Basics />, {
                resume: () => ({
                    basics: {
                        name: 'name',
                        image: 'http://image',
                        gravatar: 'http://gravatar',
                    },
                }),
            })

            expect(getByRole('img').getAttribute('src')).toBe('http://image')
        })

        it.each`
            case                                          | name         | image             | gravatar
            ${'there is a name but no image or gravatar'} | ${'name'}    | ${undefined}      | ${undefined}
            ${'there is an image but no name'}            | ${undefined} | ${'http://image'} | ${undefined}
            ${'there is a gravatar but no name'}          | ${undefined} | ${undefined}      | ${'http://gravatar'}
        `('should not render when $case', ({ name, image, gravatar }) => {
            const { queryByRole } = render(<Basics />, {
                resume: () => ({
                    basics: { name, image, gravatar },
                }),
            })
            expect(queryByRole('img')).not.toBeInTheDocument()
        })

        it('should not render when configured as hidden', () => {
            const { queryByRole } = render(<Basics />, {
                resume: compose(
                    withConfig({
                        intro: {
                            avatar: {
                                hidden: true,
                            },
                        },
                    }),
                    () => ({
                        basics: {
                            name: 'name',
                            image: 'http://image',
                            gravatar: 'http://gravatar',
                        },
                    })
                ),
            })
            expect(queryByRole('img')).not.toBeInTheDocument()
        })

        it('should align right by default', () => {
            const { getByRole } = render(<Basics />, {
                resume: () => ({
                    basics: { name: 'name', image: 'http://image' },
                }),
            })
            expect(getByRole('img').parentElement).toHaveStyle({
                order: null,
            })
        })

        it('should align left when configured', () => {
            const { getByRole } = render(<Basics />, {
                resume: compose(
                    withConfig({
                        intro: {
                            avatar: {
                                align: 'left',
                            },
                        },
                    }),
                    () => ({
                        basics: { name: 'name', image: 'http://image' },
                    })
                ),
            })
            expect(getByRole('img').parentElement).toHaveStyle({
                order: '-1',
            })
        })
    })
})
