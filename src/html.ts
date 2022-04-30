import { ResumeSchema } from '~/types'

// Tagging literals as "html" lets prettier format the template.
const html = (...a: Parameters<typeof String.raw>) => String.raw(...a).trim()

type Meta = {
    generator: string
}

type Props = {
    body: string
    meta: Meta
    resume: ResumeSchema
}

const template = ({ body, meta, resume }: Props) => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="generator" content="${meta.generator}" />
            <title>
                ${[resume?.basics?.name, resume?.basics?.label, 'Resume']
                    .filter(Boolean)
                    .join(' - ')}
            </title>
        </head>
        <body>
            <div id="root">${body}</div>
        </body>
    </html>
`

export default template
