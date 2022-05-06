export {}

describe('md5 module', () => {
    const ENV = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...ENV }
    })

    afterAll(() => {
        process.env = ENV
    })

    it('should work in development', async () => {
        process.env.NODE_ENV = 'development'
        const { md5 } = await import('./md5')
        expect(md5('hello world')).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3')
    })

    it('should work in production', async () => {
        process.env.NODE_ENV = 'production'
        const { md5 } = await import('./md5')
        expect(md5('hello world')).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3')
    })
})
