export type Nullable<T> = T | null;

export function isNull(object: any): object is null {
  return object === null;
}

export function isNotNullOrUndefined<T>(
  object: T | null | undefined,
): object is T {
  return object !== null && object !== undefined;
}
