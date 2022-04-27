import '@testing-library/jest-dom'
import { ReactNode } from 'react'
import { render as testingLibraryRender } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'

import { AppContext } from '~/context'
import { theme } from '~/theme'
import { ResumeSchema, Configuration } from '~/types'
import { THEME_NAME } from '~/constants'

import sampleResume from './sample.resume.json'

type Options = {
    resume?: (sample: ResumeSchema) => ResumeSchema
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

export const pickResumeFields =
    (...keys: (keyof ResumeSchema)[]) =>
    (resume: ResumeSchema): ResumeSchema =>
        keys.reduce(
            (acc, key) => Object.assign(acc, { [key]: resume[key] }),
            {}
        )

export const withConfig =
    (config: Configuration) =>
    (resume: ResumeSchema): ResumeSchema => ({
        ...resume,
        meta: {
            [THEME_NAME]: config,
        },
    })
