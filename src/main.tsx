import { renderToString } from 'react-dom/server'

import { Renderer, RenderOptions } from '~/types'
import { AppContext, getLocale } from '~/context'
import { THEME_NAME } from '~/constants'

import html from './html'
import View from './view'

import pkg from '../package.json'

export const render: Renderer = async (resume) => {
    const locale = await getLocale(resume.meta?.[THEME_NAME]?.locale)

    return html({
        resume,
        meta: {
            generator: `${pkg.name}@${pkg.version}`,
        },
        body: renderToString(
            <AppContext.Provider value={{ resume, locale }}>
                <View />
            </AppContext.Provider>
        ),
    })
}

export const pdfRenderOptions: RenderOptions = {
    mediaType: 'print',
}
