import { ComposeTask } from 'immer-compose'
import axios from 'axios'

import { normaliseTag } from '~/util'

import { ResumeSchema } from '~/types'

const API = 'https://api.stackexchange.com/2.3'
const SITE = 'stackoverflow'

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

const findProfile = (profiles?: SchemaProfile[]): SchemaProfile | undefined =>
    profiles?.find(({ network }) => network && normaliseTag(network) === SITE)

const findUserId = (profiles?: SchemaProfile[]): string | undefined => {
    const profile = findProfile(profiles)
    return (
        profile?.url &&
        String(profile.url).match(/stackoverflow\.com\/users\/(\d+)/i)?.[1]
    )
}

const fetchTopTags = (id: string) => {
    const query = new URLSearchParams({
        order: 'desc',
        sort: 'popular',
        site: SITE,
    })
    return axios
        .get(`${API}/users/${id}/top-tags?${query}`)
        .then<StackOverflowTopTags[]>(({ data }) => data?.items ?? [])
        .catch<StackOverflowTopTags[]>(() => [])
}

const fetchAnswersTotal = (id: string) => {
    const query = new URLSearchParams({
        filter: 'total',
        site: SITE,
    })
    return axios
        .get(`${API}/users/${id}/answers?${query}`)
        .then<number>(({ data }) => data?.total ?? 0)
        .catch<number>(() => 0)
}

export const stackOverflow: ComposeTask<ResumeSchema> = async (resume) => {
    const userId = findUserId(resume.basics?.profiles)
    if (!userId) {
        return
    }
    const [answersTotal, topTags] = await Promise.all([
        fetchAnswersTotal(userId),
        fetchTopTags(userId),
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
