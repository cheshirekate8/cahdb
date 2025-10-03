export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type OmitMultiple<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PickMultiple<T, K extends keyof T> = Pick<T, K>;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export type NonEmptyArray<T> = [T, ...T[]];

export type StringUnion<T> = T | (string & {});
