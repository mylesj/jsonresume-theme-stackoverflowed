import { ResumeSchema } from '@kurone-kito/jsonresume-types'
import { Interpolation, Theme } from '@emotion/react'

export type Resume = ResumeSchema

export type Dependencies = {
    resume: Resume
}

export type WithEmotionCss<T> = T & {
    css?: Interpolation<Theme>
}

// todo: look at usages - this is a bit fugly
export type MaybeInternalProps = {
    className?: string
}
