export const shortCode = (locale?: string) =>
    (locale ?? '').split(/_|-/)[0].toLowerCase()
