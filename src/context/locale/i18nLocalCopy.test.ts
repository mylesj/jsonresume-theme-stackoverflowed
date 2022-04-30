import { localCopyFactory } from './i18nLocalCopy'

jest.mock('../../../i18n/locales/en.json', () => ({
    locale: 'en',
    language: {
        'section.work.title': 'foo',
    },
}))

describe(localCopyFactory.name, () => {
    it('should asynchronously return a thunk', async () => {
        const { i18n } = await localCopyFactory('en')
        expect(i18n).toEqual(expect.any(Function))
    })

    it('should resolve copy from short codes', async () => {
        const { i18n } = await localCopyFactory('en')
        expect(i18n('section.work.title')).toEqual('foo')
    })

    it('should resolve copy from full codes', async () => {
        const { i18n } = await localCopyFactory('en-US')
        expect(i18n('section.work.title')).toEqual('foo')
    })
})
