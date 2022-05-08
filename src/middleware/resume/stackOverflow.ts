import { ComposeTask } from 'immer-compose'
import axios from 'axios'

import { normaliseTag } from '~/util'
import { TAG_STACKOVERFLOW } from '~/constants'
import { ResumeSchema } from '~/types'

const API = 'https://api.stackexchange.com/2.3'

type SchemaProfile = NonNullable<
    NonNullable<ResumeSchema['basics']>['profiles']
>[number]

type StackOverflowTopTags = {
    tag_name: string
    answer_count: number
    answer_score: number
    question_count: number
    question_score: number
}

const getCredentials = () => {
    const {
        STACK_EXCHANGE_API_KEY: key,
        STACK_EXCHANGE_ACCESS_TOKEN: access_token,
    } = process.env

    if (!key) {
        return null
    }
    if (['anon', 'anonymous'].includes(key.toLowerCase())) {
        return {}
    }
    return {
        key,
        ...(access_token && {
            access_token,
        }),
    }
}

const findProfile = (profiles?: SchemaProfile[]): SchemaProfile | undefined =>
    profiles?.find(
        ({ network }) => network && normaliseTag(network) === TAG_STACKOVERFLOW
    )

const findUserId = (profiles?: SchemaProfile[]): string | undefined => {
    const profile = findProfile(profiles)
    return (
        profile?.url &&
        String(profile.url).match(/stackoverflow\.com\/users\/(\d+)/i)?.[1]
    )
}

const fetchTopTags = (id: string, credentials: Record<string, string>) => {
    const query = new URLSearchParams({
        order: 'desc',
        sort: 'popular',
        site: TAG_STACKOVERFLOW,
        ...credentials,
    })
    return axios
        .get(`${API}/users/${id}/top-tags?${query}`)
        .then<StackOverflowTopTags[]>(({ data }) => data?.items ?? [])
        .catch<StackOverflowTopTags[]>(() => [])
}

const fetchAnswersTotal = (id: string, credentials: Record<string, string>) => {
    const query = new URLSearchParams({
        filter: 'total',
        site: TAG_STACKOVERFLOW,
        ...credentials,
    })
    return axios
        .get(`${API}/users/${id}/answers?${query}`)
        .then<number>(({ data }) => data?.total ?? 0)
        .catch<number>(() => 0)
}

export const stackOverflow: ComposeTask<ResumeSchema> = async (resume) => {
    const credentials = getCredentials()
    const userId = findUserId(resume.basics?.profiles)

    if (!credentials || !userId) {
        return
    }
    const [answersTotal, topTags] = await Promise.all([
        fetchAnswersTotal(userId, credentials),
        fetchTopTags(userId, credentials),
    ])

    return (draft) => {
        if (!draft.basics) {
            return
        }
        draft.basics.stackOverflow = {
            answersTotal,
            activeTags: topTags.map(({ tag_name }) => normaliseTag(tag_name)),
        }
    }
}
