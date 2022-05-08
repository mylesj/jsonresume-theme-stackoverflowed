import axios from 'axios'

import { stackOverflow } from './stackOverflow'

import topTagsResponse from './stackOverflow.test.top-tags.json'

jest.mock('axios')
beforeEach(() => {
    axios.get = jest.fn((api) => {
        if (api.includes('top-tags')) {
            return Promise.resolve({ data: topTagsResponse })
        }
        if (api.includes('answers')) {
            return Promise.resolve({ data: { total: 250 } })
        }
        return Promise.reject()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any
})

describe(stackOverflow.name, () => {
    const ENV = process.env

    beforeEach(() => {
        process.env = { ...ENV }
    })

    afterAll(() => {
        process.env = ENV
    })

    it('should do nothing if there is no basic data', async () => {
        const recipe = await stackOverflow({})
        expect(axios.get).not.toHaveBeenCalled()
        expect(recipe?.({})).toEqual(undefined)
    })

    it('should do nothing if there is no StackOverflow profile', async () => {
        const recipe = await stackOverflow({
            basics: {
                profiles: [
                    {
                        network: 'foo',
                        url: 'https://foo.com',
                    },
                ],
            },
        })
        expect(axios.get).not.toHaveBeenCalled()
        expect(recipe?.({})).toEqual(undefined)
    })

    it('should do nothing if there is no StackExchange API key', async () => {
        const recipe = await stackOverflow({
            basics: {
                profiles: [
                    {
                        network: 'stackoverflow',
                        url: 'https://stackoverflow.com/users/123456/thedude',
                    },
                ],
            },
        })
        expect(axios.get).not.toHaveBeenCalled()
        expect(recipe?.({})).toEqual(undefined)
    })

    it('should used the StackExchange API anonymously if explicitly set to', async () => {
        process.env.STACK_EXCHANGE_API_KEY = 'anon'
        await stackOverflow({
            basics: {
                profiles: [
                    {
                        network: 'stackoverflow',
                        url: 'https://stackoverflow.com/users/123456/thedude',
                    },
                ],
            },
        })
        expect(axios.get).toHaveBeenCalled()
    })

    it('should resolve meta data if there is a StackOverflow profile', async () => {
        process.env.STACK_EXCHANGE_API_KEY = 'key'
        const recipe = await stackOverflow({
            basics: {
                profiles: [
                    {
                        network: 'stackoverflow',
                        url: 'https://stackoverflow.com/users/123456/thedude',
                    },
                ],
            },
        })
        const state = { basics: {} }
        const returnVal = recipe?.(state)
        expect(returnVal).toBe(undefined)
        expect(state).toEqual({
            basics: expect.objectContaining({
                stackOverflow: {
                    answersTotal: 250,
                    activeTags: ['javascript', 'php', 'arrays', 'sorting'],
                },
            }),
        })
    })

    it('should resolve empty defaults on API failure', async () => {
        process.env.STACK_EXCHANGE_API_KEY = 'key'
        axios.get = jest.fn(() => Promise.reject())
        const recipe = await stackOverflow({
            basics: {
                profiles: [
                    {
                        network: 'stackoverflow',
                        url: 'https://stackoverflow.com/users/123456/thedude',
                    },
                ],
            },
        })
        const state = { basics: {} }
        const returnVal = recipe?.(state)
        expect(returnVal).toBe(undefined)
        expect(state).toEqual({
            basics: expect.objectContaining({
                stackOverflow: expect.objectContaining({
                    answersTotal: 0,
                    activeTags: [],
                }),
            }),
        })
    })
})
