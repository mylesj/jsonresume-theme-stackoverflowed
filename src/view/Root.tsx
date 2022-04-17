import { ThemeProvider } from '@emotion/react'

import { theme } from '~/theme'

import { Pdf } from './Pdf'

export default () => {
    // todo: "Developer Story" view
    const View = Pdf
    return (
        <ThemeProvider theme={theme}>
            <View />
        </ThemeProvider>
    )
}
