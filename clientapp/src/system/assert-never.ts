/**
 * Used for Exhaustiveness checking
 * See: https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected value ${x} should have been never.`)
}
