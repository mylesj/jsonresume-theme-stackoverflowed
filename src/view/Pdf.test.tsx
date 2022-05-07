import { compose } from 'ramda'
import { getAllByRole } from '@testing-library/react'

import {
    Renderer,
    getRenderer,
    pickResumeFields,
    withConfig,
} from '@/test-utils'

import { SectionName } from '~/types'

import { Pdf } from './Pdf'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

describe('visibility', () => {
    it.each`
        type              | text
        ${'basics'}       | ${'Richard Hendriks'}
        ${'skills'}       | ${'Technical Skills'}
        ${'work'}         | ${'Experience'}
        ${'volunteer'}    | ${'Volunteering'}
        ${'projects'}     | ${'Projects'}
        ${'education'}    | ${'Education'}
        ${'awards'}       | ${'Awards'}
        ${'publications'} | ${'Publications'}
        ${'languages'}    | ${'Languages'}
        ${'interests'}    | ${'Interests'}
        ${'basics'}       | ${'Profiles'}
        ${'references'}   | ${'References'}
    `('should render schema $type by default', async ({ type, text }) => {
        const { getByText } = render(<Pdf />, {
            resume: pickResumeFields(type),
        })
        expect(getByText(text)).toBeInTheDocument()
    })

    it.each`
        section           | text
        ${'skills'}       | ${'Technical Skills'}
        ${'work'}         | ${'Experience'}
        ${'volunteer'}    | ${'Volunteering'}
        ${'projects'}     | ${'Projects'}
        ${'education'}    | ${'Education'}
        ${'awards'}       | ${'Awards'}
        ${'publications'} | ${'Publications'}
        ${'languages'}    | ${'Languages'}
        ${'interests'}    | ${'Interests'}
        ${'profiles'}     | ${'Profiles'}
        ${'references'}   | ${'References'}
    `(
        'should not render schema $section if configured hidden',
        async ({ section, text }) => {
            const { queryByText } = render(<Pdf />, {
                resume: compose(
                    pickResumeFields(section),
                    withConfig({
                        section: {
                            [section]: {
                                hidden: true,
                            },
                        },
                    })
                ),
            })
            expect(queryByText(text)).not.toBeInTheDocument()
        }
    )
})

describe('ordering', () => {
    it('should honour the default order for sections', () => {
        const sections: [SectionName, string][] = [
            ['skills', 'Technical Skills'],
            ['work', 'Experience'],
            ['volunteer', 'Volunteering'],
            ['projects', 'Projects'],
            ['education', 'Education'],
            ['awards', 'Awards'],
            ['publications', 'Publications'],
            ['languages', 'Languages'],
            ['interests', 'Interests'],
            ['profiles', 'Profiles'],
            ['references', 'References'],
        ]

        const { getByRole } = render(<Pdf />, {
            resume: compose(
                pickResumeFields(
                    ...sections.map(([section]) =>
                        section === 'profiles' ? 'basics' : section
                    )
                )
            ),
        })

        const expected = sections.map(([, text]) => text)
        const result = getAllByRole(getByRole('main'), 'heading', {
            level: 2,
        }).map((el) => el.textContent)

        expect(result).toEqual(expected)
    })

    it('should honour a configured order for sections', () => {
        const sections: [number, SectionName, string][] = [
            [0, 'publications', 'Publications'],
            [1, 'projects', 'Projects'],
            [2, 'profiles', 'Profiles'],
            [3, 'awards', 'Awards'],
            [4, 'languages', 'Languages'],
            [5, 'volunteer', 'Volunteering'],
            [6, 'interests', 'Interests'],
            [7, 'work', 'Experience'],
            [8, 'references', 'References'],
            [9, 'skills', 'Technical Skills'],
            [10, 'education', 'Education'],
        ]

        const { getByRole } = render(<Pdf />, {
            resume: compose(
                pickResumeFields(
                    ...sections.map(([, section]) =>
                        section === 'profiles' ? 'basics' : section
                    )
                ),
                withConfig(
                    sections.reduce(
                        (acc, [order, section]) => {
                            Object.assign(acc.section, {
                                [section]: { order },
                            })
                            return acc
                        },
                        { section: {} }
                    )
                )
            ),
        })

        const expected = sections.map(([, , text]) => text)
        const result = getAllByRole(getByRole('main'), 'heading', {
            level: 2,
        }).map((el) => el.textContent)

        expect(result).toEqual(expected)
    })
})

describe('page breaks', () => {
    it('should render a page-break if configured', () => {
        const { getByRole } = render(<Pdf />, {
            resume: compose(
                pickResumeFields('work'),
                withConfig({
                    section: {
                        work: {
                            break: true,
                        },
                    },
                })
            ),
        })
        expect(
            getByRole('main').querySelector('[class$="PageBreak"]')
        ).toBeInTheDocument()
    })

    it('should not render a page-break if not configured', () => {
        const { getByRole } = render(<Pdf />, {
            resume: pickResumeFields('work'),
        })
        expect(
            getByRole('main').querySelector('[class$="PageBreak"]')
        ).not.toBeInTheDocument()
    })
})
