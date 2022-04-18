import { renderToString } from 'react-dom/server'

import { Resume } from '~/types'
import { AppContext } from '~/context'

import html from './html'
import View from './view'

export const render = (resume: Resume): string => {
    return html({
        meta: resume.basics,
        body: renderToString(
            <AppContext.Provider value={{ resume }}>
                <View />
            </AppContext.Provider>
        ),
    })
}

export const pdfRenderOptions = {
    mediaType: 'print',
}
