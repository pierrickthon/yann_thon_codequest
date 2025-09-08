import { area, isCircle, assertRectangle } from './starter';

describe('N15 - Unions & Type Guards', () => {
  test('area computes by kind', () => {
    expect(area({ kind: 'circle', radius: 2 } as any)).toBeCloseTo(Math.PI * 4);
    expect(area({ kind: 'square', size: 3 } as any)).toBe(9);
    expect(area({ kind: 'rectangle', width: 2, height: 5 } as any)).toBe(10);
  });

  test('isCircle works', () => {
    expect(isCircle({ kind: 'circle', radius: 1 } as any)).toBe(true);
    expect(isCircle({ kind: 'square', size: 1 } as any)).toBe(false);
  });

  test('assertRectangle throws for invalid', () => {
    expect(() => assertRectangle({ kind: 'circle', radius: 1 } as any)).toThrow();
    expect(() => assertRectangle({ kind: 'rectangle', width: 1, height: 2 } as any)).not.toThrow();
  });
});


