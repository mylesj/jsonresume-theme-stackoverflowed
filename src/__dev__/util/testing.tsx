import '@testing-library/jest-dom'
import { ReactNode } from 'react'
import { render as testingLibraryRender } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'

import { AppContext } from '~/context'
import { theme } from '~/theme'
import { Resume } from '~/types'

import sampleResume from '../sample.resume.json'

type Options = {
    resume?: (sample: Resume) => Resume
}

export const render = (
    node: ReactNode,
    opts: Options = {}
): ReturnType<typeof testingLibraryRender> => {
    return testingLibraryRender(
        <AppContext.Provider
            value={{
                resume: opts.resume ? opts.resume(sampleResume) : sampleResume,
            }}
        >
            <ThemeProvider theme={theme}>{node}</ThemeProvider>
        </AppContext.Provider>
    )
}
