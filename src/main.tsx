import { renderToString } from 'react-dom/server'

import { Renderer, RenderOptions } from '~/types'
import { AppContext } from '~/context'

import html from './html'
import View from './view'

export const render: Renderer = (resume) => {
    return html({
        meta: resume.basics,
        body: renderToString(
            <AppContext.Provider value={{ resume }}>
                <View />
            </AppContext.Provider>
        ),
    })
}

export const pdfRenderOptions: RenderOptions = {
    mediaType: 'print',
}
