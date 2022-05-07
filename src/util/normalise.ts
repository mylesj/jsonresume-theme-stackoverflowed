export const normaliseNetwork = (name: string): string =>
    String(name).toLowerCase().replace(/\s+/g, '')
