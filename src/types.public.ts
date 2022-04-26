/**
 * Public facing typescript definitions (bundled with NPM package)
 *   - this module should not import any internal project files.
 */

// ----- merged schema

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface ResumeSchema extends ResumeSchema_ {}
type ResumeSchema_ = import('@kurone-kito/jsonresume-types').ResumeSchema & {
    meta?: {
        'theme-stackoverflowed'?: Configuration
    }
}

// ----- module exports

export declare const render: Renderer
export declare const pdfRenderOptions: RenderOptions

// ----- type exports

export type Renderer = (resume: ResumeSchema) => string

export type RenderOptions = {
    mediaType: string
}

export type Configuration = {
    format?: {
        location?: string | string[]
    }
}
