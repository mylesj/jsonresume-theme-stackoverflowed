import axios from 'axios'

import { profileImage } from './profileImage'

jest.mock('axios')

describe(profileImage.name, () => {
    it('should do nothing if there is no profile data', async () => {
        axios.head = jest.fn()
        const recipe = await profileImage({})
        expect(axios.head).not.toHaveBeenCalled()
        expect(recipe?.({})).toEqual(undefined)
    })

    describe('profile image', () => {
        const image = 'http://foo.com/bar.png'

        it('should return the profile image when valid', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            axios.head = jest.fn(() => Promise.resolve()) as any
            const recipe = await profileImage({
                basics: { image },
            })
            const state = { basics: {} }
            const returnVal = recipe?.(state)
            expect(returnVal).toBe(undefined)
            expect(state).toEqual({
                basics: expect.objectContaining({ image }),
            })
        })

        it('should nullify the profile image when invalid', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            axios.head = jest.fn(() => Promise.reject()) as any
            const recipe = await profileImage({
                basics: { image },
            })
            const state = { basics: {} }
            const returnVal = recipe?.(state)
            expect(returnVal).toBe(undefined)
            expect(state).toEqual({
                basics: expect.objectContaining({
                    image: '',
                }),
            })
        })
    })

    describe('gravatar image', () => {
        const email = 'richard.hendriks@mail.com'

        it('should return the profile image when valid', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            axios.head = jest.fn(() => Promise.resolve()) as any
            const recipe = await profileImage({
                basics: { email },
            })
            expect(axios.head).toHaveBeenCalledWith(
                'https://gravatar.com/avatar/9acdb04e603c1cac2b893190f6dd5911?size=200&d=404'
            )

            const state = { basics: {} }
            const returnVal = recipe?.(state)
            expect(returnVal).toBe(undefined)
            expect(state).toEqual({
                basics: expect.objectContaining({
                    gravatar:
                        'https://gravatar.com/avatar/9acdb04e603c1cac2b893190f6dd5911?size=200',
                }),
            })
        })

        it('should nullify the profile image when invalid', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            axios.head = jest.fn(() => Promise.reject()) as any
            const recipe = await profileImage({
                basics: {
                    email,
                },
            })
            const state = { basics: {} }
            const returnVal = recipe?.(state)
            expect(returnVal).toBe(undefined)
            expect(state).toEqual({
                basics: expect.objectContaining({
                    gravatar: '',
                }),
            })
        })
    })
})
