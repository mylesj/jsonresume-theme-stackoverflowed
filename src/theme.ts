import '@emotion/react'

const palette = {
    black: '#000000',
    grey: '#444444',
    lightGrey: '#666666',
    blue: '#2b66cf',
    darkBlue: '#245895',
    lightBlue: '#7aa8d7',
    lighterBlue: '#a6c2dd',
} as const

export const theme = {
    text: {
        titleColor: palette.darkBlue,
        subTitleColor: palette.lightBlue,
        primaryColor: palette.black,
        secondaryColor: palette.grey,
        tertiaryColor: palette.lightGrey,
        linkColor: palette.black,
        linkHoverColor: palette.blue,
    },
    spacing: {
        dividerColor: palette.lighterBlue,
    },
} as const

type LocalTheme = typeof theme
declare module '@emotion/react' {
    export interface Theme extends LocalTheme {}
}
