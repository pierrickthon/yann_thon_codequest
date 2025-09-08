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


