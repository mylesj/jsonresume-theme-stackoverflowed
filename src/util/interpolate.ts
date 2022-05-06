const RE_INTERPOLATE = /\{\{([a-z0-9_.-]+)\}\}/gi

export type InterpolateValues = Record<
    string,
    string | number | null | undefined
>

export const interpolate = (
    template: string | undefined,
    values: InterpolateValues
): string | null => {
    if (template === undefined) {
        return ''
    }

    let err = false

    const interpolated = template.replace(RE_INTERPOLATE, (_, $1) => {
        if (!($1 in values)) {
            err = true
            return ''
        }
        if (values[$1] === undefined || values[$1] === null) {
            err = true
            return ''
        }
        return String(values[$1])
    })

    return err ? null : interpolated
}
