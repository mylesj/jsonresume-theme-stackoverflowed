import { Renderer, getRenderer, pickResumeFields } from '@/test-utils'

import { Pdf } from './Pdf'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

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
`('should render schema $type', async ({ type, text }) => {
    const { getByText } = render(<Pdf />, {
        resume: pickResumeFields(type),
    })
    expect(getByText(text)).toBeInTheDocument()
})
