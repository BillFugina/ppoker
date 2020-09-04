/**
 * Check if a string is null or undefined
 * @param s {string} the string to check
 * @returns {boolean} true if s is null or undefined
 */
export const isNullOrUndefined = (s: string | null | undefined) => s === null || s === undefined

/**
 * Check if a string is null, undefined or an empty string
 * @param s {string} the string to check
 * @returns {boolean} true if s is null, undefined or empty
 */
export const isNilOrEmpty = (s: string | null | undefined) => isNullOrUndefined(s) || s === ''
