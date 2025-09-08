/**
 * N20 - Dependency Injection
 */

// Simples
function createContainer() {
  // TODO: register(name, factory), resolve(name)
}

function valueProvider(value) {
  // TODO: provider qui retourne value
}

function classProvider(Ctor) {
  // TODO: provider qui instancie Ctor()
}

function factoryProvider(factory) {
  // TODO: provider qui appelle factory(container)
}

function singleton(provider) {
  // TODO: scope singleton: crée une fois
}

// Faciles
function scoped(provider) {
  // TODO: crée par scopeId passé à resolve
}

function inject(fn, deps) {
  // TODO: wrapper qui appelle fn avec deps résolues
}

function optional(provider, fallback) {
  // TODO: retourne fallback si résolution échoue
}

function alias(container, from, to) {
  // TODO: alias de service
}

function composeProviders(...providers) {
  // TODO: composer providers
}

// Moyens
function moduleSystem() {
  // TODO: registerModule(name, configure(container))
}

function lifecycles() {
  // TODO: onInit/onDispose pour services
}

function parameterInjection(fn) {
  // TODO: lire métadonnées simulées pour injecter
}

function configProvider(config) {
  // TODO: fournir configuration immuable
}

function lazy(provider) {
  // TODO: retarder la création jusqu'au premier usage
}

// Complexes
function graphResolve(container, graph) {
  // TODO: résoudre un DAG de dépendances
}

function circularGuard(container) {
  // TODO: détecter cycles et lever erreur
}

function testHarness(container) {
  // TODO: surcharger providers pour tests (mocks)
}

function envOverride(container, env) {
  // TODO: surcharger via variables d'environnement
}

function healthCheck(container) {
  // TODO: exécuter check() sur services enregistrés
}

module.exports = {
  createContainer,
  valueProvider,
  classProvider,
  factoryProvider,
  singleton,
  scoped,
  inject,
  optional,
  alias,
  composeProviders,
  moduleSystem,
  lifecycles,
  parameterInjection,
  configProvider,
  lazy,
  graphResolve,
  circularGuard,
  testHarness,
  envOverride,
  healthCheck
};


