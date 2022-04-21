import '@emotion/react'

const palette = {
    black: '#333333',
    grey: '#666666',
    lightGrey: '#adadad',
    darkBlue: '#245895',
    lightBlue: '#7aa8d7',
    lighterBlue: '#a6c2dd',
} as const

export const theme = {
    text: {
        font: {
            primary: 'Arial, Helvetica, sans-serif',
            secondary: 'Georgia, "Times New Roman", serif',
        },
        color: {
            title: palette.darkBlue,
            subTitle: palette.lightBlue,
            primary: palette.black,
            secondary: palette.grey,
            tertiary: palette.lightGrey,
            link: palette.black,
            linkHover: palette.darkBlue,
        },
    },

    spacing: {
        color: {
            divider: palette.lighterBlue,
        },
    },

    when: (context: MediaContext, css: ArbitraryCss): ArbitraryCss => {
        const [media, width] = Array.isArray(context)
            ? context
            : [context, undefined]
        return {
            ...(media === 'print' &&
                !width && {
                    '@media only print': css,
                }),
            ...(media === 'screen' &&
                !width && {
                    '@media only screen': css,
                }),
            ...(media === 'screen' &&
                width === 'normal' && {
                    '@media only screen and (min-width: 1280px)': css,
                }),
            ...(media === 'screen' &&
                width === 'narrow' && {
                    '@media only screen and (max-width: 1279px)': css,
                }),
        }
    },
} as const

type MediaContext =
    | 'print'
    | 'screen'
    | ['print']
    | ['screen']
    | ['screen', 'normal']
    | ['screen', 'narrow']

type ArbitraryCss = {
    [key in string]: ArbitraryCss | string | number
}

type LocalTheme = typeof theme
declare module '@emotion/react' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends LocalTheme {}
}
