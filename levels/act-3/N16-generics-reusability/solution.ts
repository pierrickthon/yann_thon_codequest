/**
 * N16 - Generics & Reusability (Solution)
 */

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function safeGet<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function createQueue<T>() {
  const items: T[] = [];
  return {
    enqueue(value: T) {
      items.push(value);
    },
    dequeue(): Result<T, 'empty'> {
      return items.length ? { ok: true, value: items.shift() as T } : { ok: false, error: 'empty' };
    },
    size(): number {
      return items.length;
    }
  };
}

export { Result, safeGet, createQueue };


