import { mergeUsers, freezeProfile } from './starter';

describe('N14 - Interfaces vs Types', () => {
  test('mergeUsers merges with b overriding a', () => {
    const a = { id: 1, name: 'Alice' };
    const b = { id: 1, name: 'Bob' };
    expect(mergeUsers(a as any, b as any)).toEqual({ id: 1, name: 'Bob' });
  });

  test('freezeProfile returns a frozen object', () => {
    const p = freezeProfile({ id: 1, name: 'Alice' });
    expect(Object.isFrozen(p)).toBe(true);
  });
});


