import { ThemeProvider, Global } from '@emotion/react'

import { theme } from '~/theme'

import { Pdf } from './Pdf'

const cssReset = {
    html: {
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
        boxSizing: 'inherit',
    },
    'body, h1, h2, h3, h4, h5, h6, p, ol, ul, dl, dt, dd': {
        margin: 0,
        padding: 0,
        fontWeight: 'normal',
    },
    'ol, ul': {
        listStyle: 'none',
    },
    img: {
        maxWidth: '100%',
        height: 'auto',
    },
    'address, em, string': {
        fontStyle: 'normal',
    },
} as const

const cssPageContext = {
    '@media only screen': {
        body: {
            backgroundColor: '#f5f5f5',
            ...theme.whenPageNormal({
                padding: '1rem',
            }),
            ...theme.whenPageNarrow({
                padding: '0.5rem',
            }),
        },
        '#root': {
            margin: '0 auto',
            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
            backgroundColor: '#ffffff',
            ...theme.whenPageNormal({
                width: 'calc(1280px - 2 * 1rem)',
            }),
            ...theme.whenPageNarrow({
                width: '1000px',
            }),
        },
    },
    '@media only print': {
        '@page': {
            size: 'Letter',
            margin: 0,
        },
        '#root': {
            // 8.5in "Letter" format multiplied by DPI (assumed constant)
            // todo: verify this cross-platform - only tested on MacOS
            width: 'calc(8.5 * 144px)',
        },
    },
} as const

export default () => {
    // todo: "Developer Story" view
    const View = Pdf
    return (
        <ThemeProvider theme={theme}>
            <Global styles={cssReset} />
            <Global styles={cssPageContext} />
            <View />
        </ThemeProvider>
    )
}
