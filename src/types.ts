import { ResumeSchema } from '@kurone-kito/jsonresume-types'

export type Resume = ResumeSchema

export type Dependencies = {
    resume: Resume
}
