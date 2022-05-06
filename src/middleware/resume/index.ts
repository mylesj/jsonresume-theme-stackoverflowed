import { compose } from 'immer-compose'

import { ResumeSchema } from '~/types'

import { profileImage } from './profileImage'

export const resumeMiddleware = compose<ResumeSchema>(profileImage)
