import { getCountryNameFactory } from './i18nCountries'

describe(getCountryNameFactory.name, () => {
    it('should asynchronously return a thunk', async () => {
        expect(await getCountryNameFactory('en')).toEqual(expect.any(Function))
    })

    it('should resolve country names from short codes', async () => {
        const getCountryName = await getCountryNameFactory('en')
        expect(getCountryName('GB')).toEqual({
            countryNameAlias: 'UK',
            countryNameOfficial: 'United Kingdom',
        })
    })

    it('should resolve country names from full codes', async () => {
        const getCountryName = await getCountryNameFactory('en-GB')
        expect(getCountryName('GB')).toEqual({
            countryNameAlias: 'UK',
            countryNameOfficial: 'United Kingdom',
        })
    })

    it('should resolve localised country names', async () => {
        const getCountryName = await getCountryNameFactory('fr')
        expect(getCountryName('GB')).toEqual({
            countryNameAlias: expect.stringMatching(/(?!UK)/),
            countryNameOfficial: expect.stringMatching(/(?!United\sKingdom)/),
        })
    })
})
