import { createContext, useContext } from 'react'

import { ResumeSchema, Configuration } from '~/types'
import { THEME_NAME } from '~/constants'

import { Locale } from './locale'

export { getLocale } from './locale'

export type Dependencies = {
    resume: ResumeSchema
    locale: Locale
}

export const AppContext = createContext<Dependencies | null>(null)

const useAppContext = () => useContext(AppContext)

export const useResume = () => useAppContext()?.resume as ResumeSchema

export const useLocale = () => useAppContext()?.locale as Locale

export const useConfig = <T extends keyof Configuration>(
    key: T
): Configuration[T] => useResume()?.meta?.[THEME_NAME]?.[key]
