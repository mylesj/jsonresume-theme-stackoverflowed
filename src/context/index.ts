import { createContext, useContext } from 'react'

import { Dependencies, Configuration } from '~/types'
import { THEME_NAME } from '~/constants'

export const AppContext = createContext<Dependencies>({
    resume: {},
})

export const useAppContext = () => useContext(AppContext)

export const useResume = () => useAppContext().resume

export const useConfig = <T extends keyof Configuration>(
    key: T
): Configuration[T] => useResume().meta?.[THEME_NAME]?.[key]
