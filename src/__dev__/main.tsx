import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppContext } from '~/context'
import View from '~/view'

import resume from './sample.resume.json'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppContext.Provider value={{ resume }}>
            <View />
        </AppContext.Provider>
    </React.StrictMode>
)
