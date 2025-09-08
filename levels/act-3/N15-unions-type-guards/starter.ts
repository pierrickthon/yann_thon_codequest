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


