/**
 * N15 - Unions & Type Guards (Starter)
 */

// Discriminated union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'rectangle'; width: number; height: number };

// 1) Implémenter area(s: Shape): number avec switch exhaustif (never)

// 2) Implémenter isCircle(x: unknown): x is { kind: 'circle'; radius: number }

// 3) Implémenter assertRectangle(x: unknown): asserts x is { kind: 'rectangle'; width: number; height: number }

export {};


/**
 * Supplément N15: 20 défis Unions & Type Guards
 */

// Simples
function area(s: Shape): number {
  // TODO: switch exhaustif
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius * s.radius;
    case 'square': return s.size * s.size;
    case 'rectangle': return s.width * s.height;
    default: const _n: never = s; return _n;
  }
}

function isCircle(x: unknown): x is { kind: 'circle'; radius: number } {
  // TODO: type guard
  return typeof x === 'object' && x !== null && (x as any).kind === 'circle' && typeof (x as any).radius === 'number';
}

function assertRectangle(x: unknown): asserts x is { kind: 'rectangle'; width: number; height: number } {
  // TODO: assertion
  if (!(typeof x === 'object' && x !== null && (x as any).kind === 'rectangle' && typeof (x as any).width === 'number' && typeof (x as any).height === 'number')) {
    throw new Error('Not a rectangle');
  }
}

// Faciles
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

function safeJsonParse(s: string): Result<unknown> {
  try { return { ok: true, value: JSON.parse(s) }; } catch (e) { return { ok: false, error: e as Error }; }
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}

function hasKey<K extends string>(x: unknown, k: K): x is Record<K, unknown> {
  return isRecord(x) && k in x;
}

// Moyens
type Tagged<T extends string> = { tag: T };
type Task = Tagged<'todo'> | Tagged<'doing'> | Tagged<'done'>;

function nextTaskState(t: Task): Task {
  switch (t.tag) {
    case 'todo': return { tag: 'doing' };
    case 'doing': return { tag: 'done' };
    case 'done': return { tag: 'done' };
  }
}

// Complexes
type Option<T> = { kind: 'some'; value: T } | { kind: 'none' };

function mapOption<T, U>(o: Option<T>, f: (t: T) => U): Option<U> {
  return o.kind === 'some' ? { kind: 'some', value: f(o.value) } : { kind: 'none' };
}

