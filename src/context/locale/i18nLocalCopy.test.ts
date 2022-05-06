import { localCopyFactory } from './i18nLocalCopy'

jest.mock('../../../i18n/locales/en.json', () => ({
    locale: 'en',
    language: {
        'section.work.title': 'foo',
        'component.picture.alt': 'image of {{name}}',
    },
}))

describe(localCopyFactory.name, () => {
    it('should asynchronously return a thunk', async () => {
        const { i18n } = await localCopyFactory('en')
        expect(i18n).toEqual(expect.any(Function))
    })

    it('should resolve copy from short codes', async () => {
        const { i18n } = await localCopyFactory('en')
        expect(i18n('section.work.title')).toBe('foo')
    })

    it('should resolve copy from full codes', async () => {
        const { i18n } = await localCopyFactory('en-US')
        expect(i18n('section.work.title')).toBe('foo')
    })

    it('should interpolate values when given correct input', async () => {
        const { i18n } = await localCopyFactory('en')
        const actual = i18n('component.picture.alt', { name: 'person' })
        expect(actual).toBe('image of person')
    })

    it('should return an empty string when given invalid input', async () => {
        const { i18n } = await localCopyFactory('en')
        const actual = i18n('component.picture.alt', { NOPE: 'person' })
        expect(actual).toBe('')
    })
})
