export type Predicate<T> = (input: T) => boolean

export const filterAll =
    <T>(...predicates: Predicate<T>[]) =>
    (x: T): boolean =>
        predicates.every((predicate) => predicate(x))

export const filterAny =
    <T>(...predicates: Predicate<T>[]) =>
    (x: T): boolean =>
        predicates.some((predicate) => predicate(x))

export const filterPopulated =
    <T extends Record<string, unknown>>(...keys: (keyof T)[]) =>
    (obj: T): boolean =>
        obj &&
        keys.every(
            (key) =>
                obj[key] !== undefined && obj[key] !== null && obj[key] !== ''
        )
