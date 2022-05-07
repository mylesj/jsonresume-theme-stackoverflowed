export const normaliseTag = (name: string): string =>
    String(name).toLowerCase().replace(/\s+/g, '')
