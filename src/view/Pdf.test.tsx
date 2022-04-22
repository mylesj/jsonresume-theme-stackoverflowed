import { render, pickResumeFields } from '@/test-utils'

import { Pdf } from './Pdf'

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
    ${'interests'}    | ${'Interests'}
    ${'languages'}    | ${'Languages'}
    ${'references'}   | ${'References'}
`('should render schema $type', ({ type, text }) => {
    const { getByText } = render(<Pdf />, {
        resume: pickResumeFields(type),
    })
    expect(getByText(text)).toBeInTheDocument()
})
