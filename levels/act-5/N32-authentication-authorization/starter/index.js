/**
 * N32 - Authentication & Authorization
 */

// Simples
function hashPassword(pw, salt) { /* TODO */ }
function verifyPassword(pw, salt, hash) { /* TODO */ }
function createSession(userId) { /* TODO */ }
function destroySession(sessionId) { /* TODO */ }
function isAuthenticated(session) { /* TODO */ }

// Faciles
function createJwt(payload, secret) { /* TODO */ }
function verifyJwt(token, secret) { /* TODO */ }
function parseAuthHeader(header) { /* TODO */ }
function rolesGuard(required) { /* TODO */ }
function permissionsGuard(required) { /* TODO */ }

// Moyens
function oauthFlow(config) { /* TODO: simulate */ }
function refreshTokenStore() { /* TODO */ }
function sessionStore() { /* TODO */ }
function antiCsrf(tokenStore) { /* TODO */ }
function twoFactor(authenticator) { /* TODO */ }

// Complexes
function policyEngine(policies) { /* TODO */ }
function attributeBasedAccess(user, resource, action) { /* TODO */ }
function auditSecurity(events) { /* TODO */ }
function ssoBroker(providers) { /* TODO */ }
function authzMatrix(roles, permissions) { /* TODO */ }

module.exports = {
  hashPassword,
  verifyPassword,
  createSession,
  destroySession,
  isAuthenticated,
  createJwt,
  verifyJwt,
  parseAuthHeader,
  rolesGuard,
  permissionsGuard,
  oauthFlow,
  refreshTokenStore,
  sessionStore,
  antiCsrf,
  twoFactor,
  policyEngine,
  attributeBasedAccess,
  auditSecurity,
  ssoBroker,
  authzMatrix
};


