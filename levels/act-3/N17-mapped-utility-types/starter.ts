/**
 * N17 - Mapped & Utility Types (Starter)
 */

// 1) DeepReadonly1<T> (un niveau de profondeur)

// 2) SelectProps<T, K extends keyof T> = Pick<T, K>

// 3) Optionalize<T, K extends keyof T> rend K optionnels

export {};


/**
 * Supplément N17: 20 défis Mapped & Utility Types
 */

// Simples
type DeepReadonly1<T> = { readonly [K in keyof T]: T[K] };
type SelectProps<T, K extends keyof T> = Pick<T, K>;
type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Faciles
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
type RequiredBy<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// Moyens
type Diff<A, B> = Omit<A, keyof B> & Omit<B, keyof A>;
type Merge<A, B> = Omit<A, keyof B> & B;
type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

// Complexes
type DeepPick<T, P extends string> = any; // TODO: défi avancé

