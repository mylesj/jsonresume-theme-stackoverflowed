import { produce } from 'immer'

import { Renderer, getRenderer } from '@/test-utils'

import { BasicsProfiles } from './BasicsProfiles'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

describe(BasicsProfiles.name, () => {
    describe('network details - stackoverflow', () => {
        it.each`
            case                                           | answersTotal | activeTags                          | expected
            ${'not render for zero answers'}               | ${0}         | ${['javascript']}                   | ${false}
            ${'not render for empty tag activity'}         | ${1}         | ${[]}                               | ${false}
            ${'render when there are answers and tags'}    | ${10}        | ${['javascript']}                   | ${'Written 10 answers. Active in javascript.'}
            ${'render only tags mentioned under "skills"'} | ${10}        | ${['javascript', 'INVALID', 'css']} | ${'Written 10 answers. Active in javascript, css.'}
        `('should $case', ({ answersTotal, activeTags, expected }) => {
            const { queryByRole, getByText } = render(<BasicsProfiles />, {
                resume: produce((resume) => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    resume.basics!.stackOverflow = {
                        answersTotal,
                        activeTags,
                    }
                }),
            })

            !expected
                ? expect(queryByRole('emphasis')).not.toBeInTheDocument()
                : expect(getByText(expected)).toBeInTheDocument()
        })
    })
})
