import { safeGet, createQueue } from './starter';

describe('N16 - Generics & Reusability', () => {
  test('safeGet returns typed value', () => {
    const user = { id: 1, name: 'Alice' };
    const id = safeGet(user as any, 'id');
    expect(id).toBe(1);
  });

  test('createQueue works generically', () => {
    const q = createQueue<number>() as any;
    q.enqueue(1);
    q.enqueue(2);
    expect(q.size()).toBe(2);
    expect(q.dequeue().ok).toBe(true);
  });
});


