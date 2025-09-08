/**
 * N18 - Boss: Migration Strict (Starter)
 * Objectif: migrer un mini-module JS vers TS strict sans any/ts-ignore
 */

// Mini module à migrer
// Implémentez un parseur sûr + API typée en mode strict

export {};


/**
 * Supplément N18: 20 défis Migration Strict
 */

// Simples
type Id = number & { readonly brand: unique symbol };

function asId(n: number): Id { return n as Id; }

interface LegacyUser { id: number; name: string; email?: string }
interface NewUser { id: Id; name: string; email: string }

// Faciles
function migrateUser(u: LegacyUser): NewUser | null {
  // TODO: valider et convertir
  if (typeof u.id !== 'number' || !u.email) return null;
  return { id: asId(u.id), name: u.name, email: u.email };
}

// Moyens
type Guard<T> = (x: unknown) => x is T;

function refine<T>(x: unknown, guard: Guard<T>): T | null { return guard(x) ? x : null; }

// Complexes
type ModuleShape = { parse: (s: string) => unknown };

function migrateModule<M extends ModuleShape>(m: M): M { return m; }

