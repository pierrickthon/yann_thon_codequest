/**
 * N14 - Interfaces vs Types (Starter)
 */

// 1) Définir une interface User et un type Admin qui étend User via intersection
//    Admin doit ajouter: role: 'admin' et permissions: readonly string[]

// 2) Créer une fonction mergeUsers(a, b) qui combine deux Users (b écrase a)

// 3) Définir un mapped type ReadonlyExceptId<T> qui rend toutes les props readonly
//    sauf 'id' qui reste mutable

// 4) Implémenter une fonction freezeProfile<T>(profile: T): Readonly<T>

export {};


/**
 * Supplément N14: 20 défis Interfaces vs Types
 */

// Simples
interface User { id: number; name: string }
type Admin = User & { role: 'admin'; permissions: readonly string[] };

function mergeUsers(a: User, b: Partial<User>): User {
  // TODO: b écrase a
  return { ...a, ...b };
}

type ReadonlyExceptId<T extends { id: any }> = { id: T['id'] } & { readonly [K in Exclude<keyof T, 'id'>]: T[K] };

function freezeProfile<T>(profile: T): Readonly<T> {
  // TODO: Object.freeze (placeholder typé)
  return profile as Readonly<T>;
}

// Faciles
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Exact<T> = T & { };

// Moyens
interface ShapeBase { kind: string }
interface Circle extends ShapeBase { kind: 'circle'; radius: number }
interface Square extends ShapeBase { kind: 'square'; size: number }
type Shape = Circle | Square;

function area(s: Shape): number {
  // TODO: switch exhaustif
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius * s.radius;
    case 'square': return s.size * s.size;
    default: const _exhaustive: never = s; return _exhaustive;
  }
}

// Complexes
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };

