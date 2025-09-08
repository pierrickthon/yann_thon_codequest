/**
 * N15 - Unions & Type Guards (Solution)
 */

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle':
      return Math.PI * s.radius * s.radius;
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}

function isCircle(x: unknown): x is { kind: 'circle'; radius: number } {
  return (
    typeof x === 'object' && x !== null &&
    (x as any).kind === 'circle' && typeof (x as any).radius === 'number'
  );
}

function assertRectangle(x: unknown): asserts x is { kind: 'rectangle'; width: number; height: number } {
  if (
    typeof x !== 'object' || x === null ||
    (x as any).kind !== 'rectangle' ||
    typeof (x as any).width !== 'number' ||
    typeof (x as any).height !== 'number'
  ) {
    throw new Error('Not a rectangle');
  }
}

export { Shape, area, isCircle, assertRectangle };


