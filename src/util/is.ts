export const isPopulated = <T extends {}>(
    obj: T,
    ...keys: (keyof T)[]
): boolean =>
    obj && keys.every((key) => obj[key] !== undefined && obj[key] !== null)
