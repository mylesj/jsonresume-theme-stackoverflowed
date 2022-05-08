/**
 * Public facing typescript definitions (bundled with NPM package)
 *   - this module should not import any internal project files.
 */

// ----- merged schema

type TypeOrUnknown<T> = unknown extends T
    ? [keyof T] extends [never]
        ? T
        : unknown
    : T

type ResumeSchema_ = TypeOrUnknown<
    import('@kurone-kito/jsonresume-types').ResumeSchema
> & {
    meta?: {
        'theme-stackoverflowed'?: Configuration
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface ResumeSchema extends ResumeSchema_ {}

// ----- module exports

export declare const render: Renderer
export declare const pdfRenderOptions: RenderOptions

// ----- type exports

export type Renderer = (resume: ResumeSchema) => Promise<string>

export type RenderOptions = {
    mediaType: string
}

export type Configuration = {
    locale?: string
    format?: {
        date?: string
        location?: string | string[]
    }
    intro?: {
        avatar?: {
            hidden?: boolean
            align?: string
        }
    }
    section?: {
        [key in SectionName]?: {
            order?: number
            break?: boolean
            hidden?: boolean
        }
    }
}

export type SectionName =
    | keyof Omit<ResumeSchema, '$schema' | 'meta' | 'basics'>
    | 'profiles'
