export const asArray = <T>(x: T | T[]): T[] =>
    (Array.isArray(x) ? x : [x]).slice()
