import { Renderer, getRenderer } from '@/test-utils'
import * as context from '~/context'
import * as sharedModule from '.'

let render: Renderer
beforeAll(async () => {
    render = await getRenderer()
})

const sharedComponents = Object.values(sharedModule).filter(
    (component) => typeof component === 'function'
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nullifyIterable: any = new Proxy([], {
    get(_, prop) {
        switch (prop) {
            case 'map':
            case 'filter':
            case 'keys':
            case 'values':
            case 'entries':
                return () => []
            case 'forEach':
                return () => undefined
            default:
                return () => null
        }
    },
})

const BIG_LAZY_MAP_OF_PROPS = {
    to: 'https://',
    label: 'string',
    date: 'string',
    startDate: 'string',
    endDate: 'string',
    entries: nullifyIterable,
    children: nullifyIterable,
} as const

describe('shared components', () => {
    describe('should be resume data agnostic', () => {
        let useResume: jest.SpyInstance
        beforeEach(() => {
            useResume = jest.spyOn(context, 'useResume')
        })

        Object.values(sharedComponents).forEach((Component) => {
            it(Component.name, () => {
                render(<Component {...BIG_LAZY_MAP_OF_PROPS} />)
                expect(useResume).not.toHaveBeenCalled()
            })
        })
    })
})
