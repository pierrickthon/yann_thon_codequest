/**
 * N18 - Boss: Migration Strict (Solution)
 */

type SafeJson = unknown;

function safeParse(json: string): SafeJson | null {
  try {
    return JSON.parse(json) as unknown;
  } catch {
    return null;
  }
}

export { safeParse };


