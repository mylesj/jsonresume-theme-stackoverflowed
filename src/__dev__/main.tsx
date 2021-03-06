import React from 'react'
import ReactDOM from 'react-dom/client'

import { ResumeSchema } from '~/types'
import { THEME_NAME } from '~/constants'
import { AppContext, getLocale } from '~/context'
import { resumeMiddleware } from '~/middleware'
import View from '~/view'

import sample from './sample.resume.json'
import config from './sample.config.json'

const resume: ResumeSchema = {
    ...sample,
    ...config,
}

const locale = await getLocale(resume?.meta?.[THEME_NAME]?.['locale'])
const enhancedResume = await resumeMiddleware(resume)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppContext.Provider value={{ resume: enhancedResume, locale }}>
            <View />
        </AppContext.Provider>
    </React.StrictMode>
)
