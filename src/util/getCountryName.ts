import countries from 'i18n-iso-countries'
import locale from 'i18n-iso-countries/langs/en.json'

// todo: setup dynamic import to resolve i18n locales
countries.registerLocale(locale)

type CountryName = {
    countryNameOfficial: string
    countryNameAlias: string
}

export const getCountryName = (code?: string): CountryName | null => {
    if (!code) {
        return null
    }
    return {
        countryNameOfficial: countries.getName(code, 'en', {
            select: 'official',
        }),
        countryNameAlias: countries.getName(code, 'en', { select: 'alias' }),
    }
}
