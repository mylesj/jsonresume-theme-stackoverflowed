import { renderToString } from 'react-dom/server'

import { Renderer, RenderOptions } from '~/types'
import { AppContext, getLocale } from '~/context'
import { THEME_NAME } from '~/constants'

import html from './html'
import View from './view'

import { resumeMiddleware } from './middleware'

import { name as pkgName, version as pkgVersion } from '../package.json'

export const render: Renderer = async (resume) => {
    const enhancedResume = await resumeMiddleware(resume)
    const locale = await getLocale(resume.meta?.[THEME_NAME]?.locale)

    return html({
        resume,
        meta: {
            generator: `${pkgName}@${pkgVersion}`,
        },
        body: renderToString(
            <AppContext.Provider value={{ resume: enhancedResume, locale }}>
                <View />
            </AppContext.Provider>
        ),
    })
}

export const pdfRenderOptions: RenderOptions = {
    mediaType: 'print',
}
