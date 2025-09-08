/**
 * N28 - Boss Architecture Project
 */

// Simples
function domainModel() { /* TODO: définir entités/valeurs */ }
function useCases() { /* TODO: lister cas d'usage */ }
function portsAdapters() { /* TODO: définir ports/adapters */ }
function config() { /* TODO: config immuable */ }
function invariants() { /* TODO: vérifier invariants */ }

// Faciles
function moduleGraph() { /* TODO: modules + dépendances */ }
function serviceContracts() { /* TODO: contrats d'interface */ }
function dataShapes() { /* TODO: schémas de données */ }
function errorCatalog() { /* TODO: catalogue d'erreurs */ }
function loggingPolicy() { /* TODO: conventions de logs */ }

// Moyens
function resiliencePlan() { /* TODO: timeouts/retry/breaker */ }
function securityPlan() { /* TODO: authz/authn */ }
function scalingPlan() { /* TODO: scale out/in */ }
function cachingPlan() { /* TODO: caches multi-niveaux */ }
function migrationPlan() { /* TODO: étapes de migration */ }

// Complexes
function architectureReview() { /* TODO: checklist */ }
function apiGatewayDesign() { /* TODO: patterns */ }
function asyncMessagingDesign() { /* TODO: topics/queues */ }
function observabilityPlan() { /* TODO: métriques/traces/logs */ }
function deliveryPipeline() { /* TODO: CI/CD steps */ }

module.exports = {
  domainModel,
  useCases,
  portsAdapters,
  config,
  invariants,
  moduleGraph,
  serviceContracts,
  dataShapes,
  errorCatalog,
  loggingPolicy,
  resiliencePlan,
  securityPlan,
  scalingPlan,
  cachingPlan,
  migrationPlan,
  architectureReview,
  apiGatewayDesign,
  asyncMessagingDesign,
  observabilityPlan,
  deliveryPipeline
};


