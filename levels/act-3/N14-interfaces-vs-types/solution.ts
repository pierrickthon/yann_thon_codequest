/**
 * N14 - Interfaces vs Types (Solution)
 */

interface User {
  id: number;
  name: string;
  email?: string;
}

type Admin = User & {
  role: 'admin';
  readonly permissions: string[];
};

function mergeUsers(a: User, b: User): User {
  return { ...a, ...b };
}

type ReadonlyExceptId<T extends { id: unknown }> = {
  readonly [K in keyof T as K extends 'id' ? K : K]: K extends 'id' ? T[K] : Readonly<T[K]>;
} & { id: T['id'] };

function freezeProfile<T>(profile: T): Readonly<T> {
  return Object.freeze({ ...profile });
}

export { User, Admin, mergeUsers, ReadonlyExceptId, freezeProfile };


