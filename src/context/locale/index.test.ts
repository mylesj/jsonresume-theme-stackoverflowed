import { getLocale } from '.'

describe(getLocale.name, () => {
    it('should import locales', async () => {
        const en = await getLocale('en')
        const fr = await getLocale('fr')
        expect(Object.keys(en).length).toBeGreaterThan(0)
        expect(Object.keys(fr).length).toBeGreaterThan(0)
        expect(en).not.toBe(fr)
    })

    it('should memoize locales', async () => {
        const en1 = await getLocale('en')
        const en2 = await getLocale('en')
        expect(en1).toBe(en2)
    })
})
