/**
 * Raid #2 - Collaborative Editor Tests
 * Offline multi-user simulation tests
 */

import { SimulatedTransport } from './sim/transport';
import { CollaborativeEditor } from './scaffold/collaborative-editor';

describe('Raid #2 - Collaborative Editor', () => {
  let transport: SimulatedTransport;
  let editor1: CollaborativeEditor;
  let editor2: CollaborativeEditor;
  let editor3: CollaborativeEditor;

  beforeEach(() => {
    transport = new SimulatedTransport();
    editor1 = new CollaborativeEditor('user1', transport);
    editor2 = new CollaborativeEditor('user2', transport);
    editor3 = new CollaborativeEditor('user3', transport);
  });

  afterEach(() => {
    transport.shutdown();
  });

  describe('Basic Functionality', () => {
    test('should connect multiple users', async () => {
      await editor1.connect();
      await editor2.connect();
      await editor3.connect();

      expect(editor1.isConnected()).toBe(true);
      expect(editor2.isConnected()).toBe(true);
      expect(editor3.isConnected()).toBe(true);
    });

    test('should propagate text insertions', async () => {
      await editor1.connect();
      await editor2.connect();

      editor1.insert(0, 'Hello');
      
      // Wait for propagation
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(editor2.getContent()).toBe('Hello');
    });

    test('should handle concurrent edits', async () => {
      await editor1.connect();
      await editor2.connect();
      
      // Concurrent insertions
      editor1.insert(0, 'A');
      editor2.insert(0, 'B');
      
      // Wait for convergence
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Should converge to same state (exact content depends on conflict resolution)
      expect(editor1.getContent()).toBe(editor2.getContent());
      expect(editor1.getContent().length).toBeGreaterThan(0);
    });
  });

  describe('Conflict Resolution', () => {
    test('should resolve insert conflicts with last-write-wins', async () => {
      await editor1.connect();
      await editor2.connect();
      
      const timestamp1 = Date.now();
      const timestamp2 = timestamp1 + 10; // Later timestamp
      
      editor1.insertWithTimestamp(0, 'First', timestamp1);
      editor2.insertWithTimestamp(0, 'Second', timestamp2);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Second should win (later timestamp)
      expect(editor1.getContent()).toContain('Second');
      expect(editor2.getContent()).toContain('Second');
    });

    test('should handle delete conflicts', async () => {
      await editor1.connect();
      await editor2.connect();
      
      // Start with shared content
      editor1.insert(0, 'Hello World');
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Concurrent deletes
      editor1.delete(0, 5); // Delete 'Hello'
      editor2.delete(6, 5); // Delete 'World'
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Should converge
      expect(editor1.getContent()).toBe(editor2.getContent());
    });
  });

  describe('Network Conditions', () => {
    test('should handle network latency', async () => {
      transport.setLatency(100, 200);
      
      await editor1.connect();
      await editor2.connect();
      
      const startTime = Date.now();
      editor1.insert(0, 'Delayed');
      
      // Should not be immediate
      expect(editor2.getContent()).toBe('');
      
      // Wait for latency
      await new Promise(resolve => setTimeout(resolve, 250));
      
      expect(editor2.getContent()).toBe('Delayed');
      expect(Date.now() - startTime).toBeGreaterThan(100);
    });

    test('should survive network partition', async () => {
      await editor1.connect();
      await editor2.connect();
      await editor3.connect();
      
      // Create partition: user1 isolated from user2,3
      transport.createPartition(['user1']);
      transport.createPartition(['user2', 'user3']);
      
      // Edits during partition
      editor1.insert(0, 'Isolated');
      editor2.insert(0, 'Together');
      editor3.insert(8, ' Work');
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // During partition: different states
      expect(editor1.getContent()).toBe('Isolated');
      expect(editor2.getContent()).toBe('Together Work');
      expect(editor3.getContent()).toBe('Together Work');
      
      // Heal partition
      transport.healPartitions();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Should eventually converge
      const finalContent = editor1.getContent();
      expect(editor2.getContent()).toBe(finalContent);
      expect(editor3.getContent()).toBe(finalContent);
    });

    test('should handle user disconnection/reconnection', async () => {
      await editor1.connect();
      await editor2.connect();
      
      editor1.insert(0, 'Before disconnect');
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Simulate disconnection
      transport.simulateDisconnect('user2', 200);
      
      // Edit while disconnected
      editor1.insert(17, ' - edited while away');
      
      // Wait for reconnection
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Should sync after reconnection
      expect(editor2.getContent()).toContain('Before disconnect - edited while away');
    });
  });

  describe('Cursor Tracking', () => {
    test('should track cursor positions', async () => {
      await editor1.connect();
      await editor2.connect();
      
      editor1.setCursor(5);
      await new Promise(resolve => setTimeout(resolve, 50));
      
      expect(editor2.getCursorPosition('user1')).toBe(5);
    });

    test('should adjust cursors after insertions', async () => {
      await editor1.connect();
      await editor2.connect();
      
      editor1.insert(0, 'Hello');
      editor2.setCursor(3);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Insert before cursor should adjust position
      editor1.insert(0, 'Hi ');
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      expect(editor2.getCursorPosition('user2')).toBeGreaterThan(3);
    });
  });

  describe('Performance & Stress Tests', () => {
    test('should handle rapid typing', async () => {
      await editor1.connect();
      await editor2.connect();
      
      const text = 'The quick brown fox jumps over the lazy dog';
      const startTime = Date.now();
      
      // Rapid insertions
      for (let i = 0; i < text.length; i++) {
        editor1.insert(i, text[i]);
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      expect(editor2.getContent()).toBe(text);
      expect(Date.now() - startTime).toBeLessThan(1000); // Should be fast
    });

    test('should handle large documents', async () => {
      await editor1.connect();
      await editor2.connect();
      
      const largeText = 'A'.repeat(1000);
      editor1.insert(0, largeText);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      expect(editor2.getContent()).toBe(largeText);
    });

    test('should not leak memory during long sessions', () => {
      // Basic memory usage check
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Simulate long session with many operations
      for (let i = 0; i < 100; i++) {
        editor1.insert(i, `operation${i}`);
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Should not increase by more than 10MB for this test
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed operations', async () => {
      await editor1.connect();
      
      expect(() => {
        editor1.insert(-1, 'invalid');
      }).not.toThrow();
      
      expect(() => {
        editor1.delete(1000, 5);
      }).not.toThrow();
    });

    test('should handle transport errors gracefully', async () => {
      await editor1.connect();
      
      // Force transport error
      transport.shutdown();
      
      expect(() => {
        editor1.insert(0, 'after shutdown');
      }).not.toThrow();
      
      expect(editor1.isConnected()).toBe(false);
    });
  });

  describe('Data Integrity', () => {
    test('should maintain document integrity under stress', async () => {
      await editor1.connect();
      await editor2.connect();
      await editor3.connect();
      
      // Random concurrent operations
      const operations = [];
      for (let i = 0; i < 50; i++) {
        const editor = [editor1, editor2, editor3][i % 3];
        const operation = Math.random() > 0.5 ? 'insert' : 'delete';
        operations.push({ editor, operation, position: Math.floor(Math.random() * 10) });
      }
      
      // Execute operations rapidly
      operations.forEach(({ editor, operation, position }, index) => {
        if (operation === 'insert') {
          editor.insert(position, `${index}`);
        } else {
          editor.delete(position, 1);
        }
      });
      
      // Wait for convergence
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // All editors should have same final state
      const content1 = editor1.getContent();
      const content2 = editor2.getContent();
      const content3 = editor3.getContent();
      
      expect(content1).toBe(content2);
      expect(content2).toBe(content3);
    });
  });
});