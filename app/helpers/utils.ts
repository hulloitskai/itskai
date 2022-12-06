export const resolve = <T>(f: () => T): T => f();

type AllKeys<T> = T extends any ? keyof T : never;

type OptionalKeys<T> = T extends any
  ? { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]
  : never;

type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;

type Idx<T, K extends PropertyKey, D = never> = T extends any
  ? K extends keyof T
    ? T[K]
    : D
  : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Widen<T> = [T] extends [Array<infer E>]
  ? { [K in keyof T]: Widen<T[K]> }
  : [T] extends [object]
  ? PartialKeys<
      { [K in AllKeys<T>]: Widen<Idx<T, K>> },
      Exclude<AllKeys<T>, keyof T> | OptionalKeys<T>
    >
  : T;

export type DeepRequired<T, P extends string[]> = T extends object
  ? Omit<T, Extract<keyof T, P[0]>> &
      Required<{
        [K in Extract<keyof T, P[0]>]: NonNullable<
          DeepRequired<T[K], ShiftUnion<K, P>>
        >;
      }>
  : T;

// Analogues to array.prototype.shift
type Shift<T extends any[]> = ((...t: T) => any) extends (
  first: any,
  ...rest: infer Rest
) => any
  ? Rest
  : never;

type ShiftUnion<P extends PropertyKey, T extends any[]> = T extends any[]
  ? T[0] extends P
    ? Shift<T>
    : never
  : never;
