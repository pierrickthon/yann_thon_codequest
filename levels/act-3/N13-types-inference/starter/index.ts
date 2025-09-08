/**
 * N13 - Types & Inférence
 * Objectif: Parser sécurisé avec type guards et inférence maximale
 * Challenge: Zéro any explicite et zéro @ts-ignore
 */

// Types de base pour l'exercice
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

// TODO 1: Parser avec type guards
// Convertir unknown en User de manière sécurisée
function parseUser(data: unknown): User | null {
  // TODO: Implémenter validation complète
  // Hint: typeof, in operator, validation step by step
  return null;
}

// TODO 2: Accès sécurisé aux propriétés  
// Récupérer une propriété d'un objet unknown
function getProperty<T>(obj: unknown, key: string): T | undefined {
  // TODO: Validation + accès sécurisé
  // Hint: typeof obj === 'object', obj !== null, key in obj
  return undefined;
}

// TODO 3: Filtrage avec inférence
// Extraire seulement les nombres d'un array unknown[]
function filterNumbers(items: unknown[]): number[] {
  // TODO: Filter + type guard pour numbers
  // Hint: Array.filter avec typeof === 'number'
  return [];
}

// TODO 4: Function overloads avec inférence
// Traiter string -> uppercase, number -> double
function process(input: string): string;
function process(input: number): number; 
function process(input: string | number): string | number {
  // TODO: Implementation avec type narrowing
  // Hint: typeof input === 'string' | 'number'
  throw new Error('Not implemented');
}

// TODO 5: API Response parser
// Parser une réponse API en format typé
function parseApiResponse(response: unknown): ApiResponse | null {
  // TODO: Validation complète de la structure
  // Hint: Vérifier status (number), data (unknown), timestamp (number)
  return null;
}

// TODO 6: Safe JSON parser
// Parser JSON en évitant any/ignore
function safeParse<T>(json: string, validator: (data: unknown) => data is T): T | null {
  // TODO: try/catch + JSON.parse + validation
  // Hint: JSON.parse retourne unknown, puis validator
  return null;
}

// TODO 7: Type assertion function
// Créer une assertion function pour User
function assertUser(data: unknown): asserts data is User {
  // TODO: Validation + throw si invalid
  // Hint: if (!isUser(data)) throw new Error(...)
  throw new Error('Not implemented');
}

// Helper: User validator (à utiliser dans assertUser)
function isUser(data: unknown): data is User {
  // TODO: Validation complète structure User
  return false;
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


