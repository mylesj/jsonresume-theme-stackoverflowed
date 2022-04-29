import { countryNameFactory } from './i18nCountries'

describe(countryNameFactory.name, () => {
    it('should asynchronously return a thunk', async () => {
        const { countryName } = await countryNameFactory('en')
        expect(countryName).toEqual(expect.any(Function))
    })

    it('should resolve country names from short codes', async () => {
        const { countryName } = await countryNameFactory('en')
        expect(countryName('GB')).toEqual({
            countryNameAlias: 'UK',
            countryNameOfficial: 'United Kingdom',
        })
    })

    it('should resolve country names from full codes', async () => {
        const { countryName } = await countryNameFactory('en-US')
        expect(countryName('GB')).toEqual({
            countryNameAlias: 'UK',
            countryNameOfficial: 'United Kingdom',
        })
    })

    it('should resolve localised country names', async () => {
        const { countryName } = await countryNameFactory('fr')
        expect(countryName('GB')).toEqual({
            countryNameAlias: expect.stringMatching(/(?!UK)/),
            countryNameOfficial: expect.stringMatching(/(?!United\sKingdom)/),
        })
    })
})
