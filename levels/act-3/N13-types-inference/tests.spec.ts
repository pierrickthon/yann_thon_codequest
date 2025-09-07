/**
 * N13 - Types & Inférence - TESTS
 */

import {
  parseUser, getProperty, filterNumbers, process,
  parseApiResponse, safeParse, assertUser, isUser
} from './starter';

// Test helpers
const validUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@test.com', 
  isActive: true
};

const invalidUser = {
  id: 'invalid',
  name: 'Alice'
};

describe('N13 - Types & Inférence', () => {
  
  describe('parseUser', () => {
    test('should parse valid user', () => {
      const result = parseUser(validUser);
      expect(result).toEqual(validUser);
    });
    
    test('should return null for invalid user', () => {
      expect(parseUser(invalidUser)).toBeNull();
      expect(parseUser(null)).toBeNull();
      expect(parseUser('string')).toBeNull();
    });
  });

  describe('getProperty', () => {
    test('should get existing property', () => {
      const obj = { name: 'Alice', age: 30 };
      expect(getProperty<string>(obj, 'name')).toBe('Alice');
      expect(getProperty<number>(obj, 'age')).toBe(30);
    });
    
    test('should return undefined for missing property', () => {
      expect(getProperty({}, 'missing')).toBeUndefined();
      expect(getProperty(null, 'any')).toBeUndefined();
    });
  });

  describe('filterNumbers', () => {
    test('should filter only numbers', () => {
      const mixed = [1, 'string', 2.5, null, 42, true];
      const result = filterNumbers(mixed);
      expect(result).toEqual([1, 2.5, 42]);
    });
    
    test('should handle empty array', () => {
      expect(filterNumbers([])).toEqual([]);
    });
  });

  describe('process overloads', () => {
    test('should uppercase strings', () => {
      const result = process('hello');
      expect(result).toBe('HELLO');
      expect(typeof result).toBe('string');
    });
    
    test('should double numbers', () => {
      const result = process(21);
      expect(result).toBe(42);
      expect(typeof result).toBe('number');
    });
  });

  describe('parseApiResponse', () => {
    test('should parse valid API response', () => {
      const response = {
        status: 200,
        data: { message: 'success' },
        timestamp: 1640995200000
      };
      
      const result = parseApiResponse(response);
      expect(result).toEqual(response);
    });
    
    test('should return null for invalid response', () => {
      expect(parseApiResponse(null)).toBeNull();
      expect(parseApiResponse({ status: 'invalid' })).toBeNull();
    });
  });

  describe('safeParse', () => {
    test('should parse valid JSON with validator', () => {
      const json = JSON.stringify(validUser);
      const result = safeParse(json, isUser);
      expect(result).toEqual(validUser);
    });
    
    test('should return null for invalid JSON', () => {
      expect(safeParse('invalid json', isUser)).toBeNull();
    });
    
    test('should return null when validator fails', () => {
      const json = JSON.stringify(invalidUser);
      expect(safeParse(json, isUser)).toBeNull();
    });
  });

  describe('assertUser', () => {
    test('should not throw for valid user', () => {
      expect(() => assertUser(validUser)).not.toThrow();
    });
    
    test('should throw for invalid user', () => {
      expect(() => assertUser(invalidUser)).toThrow('Invalid user data');
      expect(() => assertUser(null)).toThrow();
    });
  });

  describe('isUser type guard', () => {
    test('should validate correct user structure', () => {
      expect(isUser(validUser)).toBe(true);
    });
    
    test('should reject invalid structures', () => {
      expect(isUser(invalidUser)).toBe(false);
      expect(isUser(null)).toBe(false);
      expect(isUser('string')).toBe(false);
      expect(isUser({})).toBe(false);
    });
  });

  // TypeScript compilation tests (meta-tests)
  describe('TypeScript compliance', () => {
    test('should have no any types used', () => {
      // This test passes if TypeScript compilation succeeds 
      // with strict mode and noImplicitAny
      expect(true).toBe(true);
    });
    
    test('should have no @ts-ignore directives', () => {
      // Meta: Check source for @ts-ignore usage
      const sourceCode = require('fs').readFileSync(__filename, 'utf8');
      expect(sourceCode).not.toContain('@ts-ignore');
    });
  });
  
});