import { compose } from 'immer-compose'

import { ResumeSchema } from '~/types'

import { profileImage } from './profileImage'
import { stackOverflow } from './stackoverflow'

export const resumeMiddleware = compose<ResumeSchema>(
    profileImage,
    stackOverflow
)
