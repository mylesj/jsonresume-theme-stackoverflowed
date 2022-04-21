import { ThemeProvider, Global } from '@emotion/react'

import { theme } from '~/theme'

import { Pdf } from './Pdf'

const cssReset = {
    html: {
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    '*, *::before, *::after': {
        boxSizing: 'inherit',
    },
    'body, h1, h2, h3, h4, h5, h6, p, ol, ul, dl, dt, dd, pre': {
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
    ...theme.when('print', {
        '@page': {
            size: 'Letter',
            margin: '.444444444in .444444444in .444444444in .666666667in',
        },
    }),

    body: {
        ...theme.when('screen', {
            backgroundColor: '#f5f5f5',
        }),
        ...theme.when(['screen', 'normal'], {
            padding: '1rem',
        }),
        ...theme.when(['screen', 'narrow'], {
            padding: '.5rem',
        }),
    },

    '#root': {
        ...theme.when('print', {
            // 8.5in "Letter" format multiplied by DPI (assumed constant)
            // todo: verify this cross-platform - only tested on MacOS
            width: 'calc((8.5 - .444444444 - .666666667) * 144px)',
        }),
        ...theme.when('screen', {
            margin: '0 auto',
            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
            backgroundColor: '#ffffff',
        }),
        ...theme.when(['screen', 'normal'], {
            width: 'calc(1280px - 2 * 1rem)',
        }),
        ...theme.when(['screen', 'narrow'], {
            width: '1000px',
        }),
    },
} as const

const Root = () => {
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

export default Root
