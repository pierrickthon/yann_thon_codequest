/**
 * N13 - Types & Inférence
 * Objectif: Parser sécurisé avec type guards et inférence maximale
 * Challenge: Zéro any explicite et zéro @ts-ignore
 */

// Types de base pour l'exercice
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface ApiResponse {
  status: number;
  data: unknown;
  timestamp: number;
}

// TODO 1: Parser avec type guards
// Convertir unknown en User de manière sécurisée
function parseUser(data: unknown): User | null {
  // TODO: Implémenter validation complète
  // Hint: typeof, in operator, validation step by step
  return null;
}

// TODO 2: Accès sécurisé aux propriétés  
// Récupérer une propriété d'un objet unknown
function getProperty<T>(obj: unknown, key: string): T | undefined {
  // TODO: Validation + accès sécurisé
  // Hint: typeof obj === 'object', obj !== null, key in obj
  return undefined;
}

// TODO 3: Filtrage avec inférence
// Extraire seulement les nombres d'un array unknown[]
function filterNumbers(items: unknown[]): number[] {
  // TODO: Filter + type guard pour numbers
  // Hint: Array.filter avec typeof === 'number'
  return [];
}

// TODO 4: Function overloads avec inférence
// Traiter string -> uppercase, number -> double
function process(input: string): string;
function process(input: number): number; 
function process(input: string | number): string | number {
  // TODO: Implementation avec type narrowing
  // Hint: typeof input === 'string' | 'number'
  throw new Error('Not implemented');
}

// TODO 5: API Response parser
// Parser une réponse API en format typé
function parseApiResponse(response: unknown): ApiResponse | null {
  // TODO: Validation complète de la structure
  // Hint: Vérifier status (number), data (unknown), timestamp (number)
  return null;
}

// TODO 6: Safe JSON parser
// Parser JSON en évitant any/ignore
function safeParse<T>(json: string, validator: (data: unknown) => data is T): T | null {
  // TODO: try/catch + JSON.parse + validation
  // Hint: JSON.parse retourne unknown, puis validator
  return null;
}

// TODO 7: Type assertion function
// Créer une assertion function pour User
function assertUser(data: unknown): asserts data is User {
  // TODO: Validation + throw si invalid
  // Hint: if (!isUser(data)) throw new Error(...)
  throw new Error('Not implemented');
}

// Helper: User validator (à utiliser dans assertUser)
function isUser(data: unknown): data is User {
  // TODO: Validation complète structure User
  return false;
}

export {
  parseUser,
  getProperty, 
  filterNumbers,
  process,
  parseApiResponse,
  safeParse,
  assertUser,
  isUser
};



/**
 * Supplément N13: 20 défis Types & Inférence
 */

// Simples
type Pair<T> = { first: T; second: T };

function identity<T>(x: T): T {
  // TODO: identité typée
  return x as T; // placeholder acceptable pour le starter
}

function asConstLiteral<T extends string>(s: T): T {
  // TODO: préserver le literal type
  return s;
}

function nonNullable<T>(x: T | null | undefined): x is T {
  // TODO: type guard non-null
  return x != null;
}

function firstOf<T>(arr: T[]): T | undefined {
  // TODO: premier élément typé
  return arr[0];
}

function ensureArray<T>(x: T | T[]): T[] {
  // TODO: convertir en tableau
  return Array.isArray(x) ? x : [x];
}

// Faciles
function mapKeys<T extends object>(obj: T): Array<keyof T> {
  // TODO: lister clés avec types précis
  return Object.keys(obj) as Array<keyof T>;
}

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  // TODO: sous-objet typé
  const out = {} as Pick<T, K>;
  for (const k of keys) (out as any)[k] = (obj as any)[k];
  return out;
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  // TODO: exclusion typée
  const out: any = {};
  for (const k in obj) if (!keys.includes(k as K)) out[k] = (obj as any)[k];
  return out;
}

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> { return { ok: true, value }; }
function err<E>(error: E): Result<never, E> { return { ok: false, error }; }

// Moyens
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

function mergeDeep<T>(a: T, b: DeepPartial<T>): T {
  // TODO: merge typé superficiel pour starter
  if (typeof a !== 'object' || a === null) return b as T;
  const out: any = Array.isArray(a) ? [...(a as any)] : { ...(a as any) };
  for (const k in b) {
    const v: any = (b as any)[k];
    out[k] = (typeof v === 'object' && v !== null) ? mergeDeep((a as any)[k], v) : v;
  }
  return out as T;
}

function assertNever(x: never): never { throw new Error('Unexpected: ' + x); }

// Complexes
type Json = null | boolean | number | string | Json[] | { [k: string]: Json };

function isJson(x: unknown): x is Json {
  // TODO: validator JSON structurel (starter minimal)
  if (x === null) return true;
  const t = typeof x;
  if (t === 'boolean' || t === 'number' || t === 'string') return true;
  if (Array.isArray(x)) return x.every(isJson);
  if (t === 'object') return Object.values(x as any).every(isJson);
  return false;
}
