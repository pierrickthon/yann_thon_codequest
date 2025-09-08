/**
 * N16 - Generics & Reusability (Starter)
 */

// 1) Result<T,E> type: { ok: true; value: T } | { ok: false; error: E }

// 2) safeGet<T, K extends keyof T>(obj: T, key: K): T[K]

// 3) createQueue<T>() returning enqueue, dequeue, size with proper typing

export {};


/**
 * Supplément N16: 20 défis Generics & Reusability
 */

// Simples
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function safeGet<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }

function createQueue<T>() {
  const items: T[] = [];
  return {
    enqueue(value: T) { items.push(value); },
    dequeue(): T | undefined { return items.shift(); },
    size(): number { return items.length; }
  };
}

// Faciles
function mapValues<T extends object, U>(obj: T, fn: (v: T[keyof T], k: keyof T) => U): { [K in keyof T]: U } {
  const out: any = {};
  for (const k in obj) out[k] = fn((obj as any)[k], k as keyof T);
  return out;
}

function filterKeys<T extends object>(obj: T, predicate: (k: keyof T, v: T[keyof T]) => boolean): Partial<T> {
  const out: any = {};
  for (const k in obj) if (predicate(k as keyof T, (obj as any)[k])) out[k] = (obj as any)[k];
  return out;
}

// Moyens
type NonEmptyArray<T> = [T, ...T[]];

function first<T>(arr: NonEmptyArray<T>): T { return arr[0]; }

function merge<T, U>(a: T, b: U): T & U { return { ...(a as any), ...(b as any) } as T & U; }

// Complexes
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };

function tuple<T extends unknown[]>(...args: T): T { return args; }

