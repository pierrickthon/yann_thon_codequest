/**
 * N17 - Mapped & Utility Types (Solution)
 */

type DeepReadonly1<T> = {
  readonly [K in keyof T]: T[K] extends object ? Readonly<T[K]> : T[K];
};

type SelectProps<T, K extends keyof T> = Pick<T, K>;

type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export { DeepReadonly1, SelectProps, Optionalize };


