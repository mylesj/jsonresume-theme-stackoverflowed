import { ResumeSchema as ResumeSchema_ } from './types.public'

export * from './types.public'

export declare interface ResumeSchema extends ResumeSchema_ {
    basics?: ResumeSchema_['basics'] & {
        gravatar?: string
        stackOverflow?: StackOverflowMeta
    }
}

export type StackOverflowMeta = {
    answersTotal: number
    activeTags: string[]
}

export type Component = () => JSX.Element | null
