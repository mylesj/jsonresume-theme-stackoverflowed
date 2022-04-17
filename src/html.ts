import { Resume } from '~/types'

// Tagging literals as "html" lets prettier format the template.
const html = (...a: Parameters<typeof String.raw>) => String.raw(...a).trim()

type Props = {
    body: string
    meta: Resume['basics']
}

const template = ({ body, meta }: Props) => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>
                ${[meta?.name, meta?.label, 'Resume']
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
