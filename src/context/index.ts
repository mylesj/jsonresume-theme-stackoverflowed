import { createContext, useContext } from 'react'

import { Dependencies } from '~/types'

export const AppContext = createContext<Dependencies>({
    resume: {},
})

export const useAppContext = () => useContext(AppContext)

export const useResume = () => useAppContext().resume
