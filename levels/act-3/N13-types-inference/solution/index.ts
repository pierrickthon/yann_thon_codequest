/**
 * N13 - Types & Inférence - SOLUTION
 * Challenge: Zéro any explicite et zéro @ts-ignore ✅
 */

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface ApiResponse {
  status: number;
  data: unknown;
  timestamp: number;
}

// ✅ Parser avec type guards complet
function parseUser(data: unknown): User | null {
  if (!isUser(data)) return null;
  return data; // TypeScript knows data is User here
}

// ✅ Accès sécurisé aux propriétés
function getProperty<T>(obj: unknown, key: string): T | undefined {
  if (typeof obj !== 'object' || obj === null) return undefined;
  if (!(key in obj)) return undefined;
  return (obj as Record<string, unknown>)[key] as T;
}

// ✅ Filtrage avec inférence parfaite
function filterNumbers(items: unknown[]): number[] {
  return items.filter((item): item is number => typeof item === 'number');
}

// ✅ Function overloads avec type narrowing
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
  if (typeof input === 'string') {
    return input.toUpperCase(); // TS infers string return
  }
  return input * 2; // TS infers number return
}

// ✅ API Response parser complet  
function parseApiResponse(response: unknown): ApiResponse | null {
  if (typeof response !== 'object' || response === null) return null;
  
  const obj = response as Record<string, unknown>;
  
  if (typeof obj.status !== 'number') return null;
  if (typeof obj.timestamp !== 'number') return null;
  // data can be any unknown value
  
  return {
    status: obj.status,
    data: obj.data, // unknown is fine
    timestamp: obj.timestamp
  };
}

// ✅ Safe JSON parser avec generic
function safeParse<T>(json: string, validator: (data: unknown) => data is T): T | null {
  try {
    const parsed: unknown = JSON.parse(json); // Explicit unknown
    return validator(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// ✅ Type assertion function
function assertUser(data: unknown): asserts data is User {
  if (!isUser(data)) {
    throw new Error(`Invalid user data: ${JSON.stringify(data)}`);
  }
}

// ✅ User validator complet
function isUser(data: unknown): data is User {
  if (typeof data !== 'object' || data === null) return false;
  
  const obj = data as Record<string, unknown>;
  
  return (
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.isActive === 'boolean'
  );
}

export {
  parseUser,
  getProperty,
  filterNumbers, 
  process,
  parseApiResponse,
  safeParse,
  assertUser,
  isUser
};


