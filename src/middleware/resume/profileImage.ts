import { ComposeTask } from 'immer-compose'
import axios from 'axios'

import { ResumeSchema } from '~/types'
import { md5 } from '~/util'

const GRAVATAR_API = 'https://gravatar.com/avatar'

const findImage = (image?: string): Promise<string> => {
    const sanitizedImage = image && image.trim()
    if (!sanitizedImage) {
        return Promise.resolve('')
    }

    return axios
        .head(sanitizedImage)
        .then(() => sanitizedImage)
        .catch(() => '')
}

const findGravatar = (email?: string): Promise<string> => {
    const sanitizedEmail = email && email.trim()
    if (!sanitizedEmail) {
        return Promise.resolve('')
    }

    const hash = md5(sanitizedEmail)
    const query = new URLSearchParams({
        size: '200',
        d: '404',
    })
    const maybeGravatar = `${GRAVATAR_API}/${hash}?${query}`

    query.delete('d')
    const definatelyGravatar = `${GRAVATAR_API}/${hash}?${query}`

    return axios
        .head(maybeGravatar)
        .then(() => definatelyGravatar)
        .catch(() => '')
}

export const profileImage: ComposeTask<ResumeSchema> = async (resume) => {
    const [image, gravatar] = await Promise.all([
        findImage(resume.basics?.image),
        findGravatar(resume.basics?.email),
    ])

    return (draft) => {
        if (!draft.basics) {
            return
        }
        draft.basics.image = image
        draft.basics.gravatar = gravatar
    }
}
