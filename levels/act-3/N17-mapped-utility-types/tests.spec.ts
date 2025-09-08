import { Optionalize } from './starter';

describe('N17 - Mapped & Utility Types', () => {
  test('Optionalize should make props optional', () => {
    type A = { id: number; name: string; active: boolean };
    type B = Optionalize<A, 'name' | 'active'>;
    const b: B = { id: 1 } as any;
    expect(b.id).toBe(1);
  });
});


