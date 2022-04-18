import countries from 'i18n-iso-countries'
import locale from 'i18n-iso-countries/langs/en.json'

// todo: setup dynamic import to resolve i18n locales
countries.registerLocale(locale)

export const getCountryName = (
    code: string,
    select: 'official' | 'alias' = 'alias'
): string => countries.getName(code, 'en', { select })
