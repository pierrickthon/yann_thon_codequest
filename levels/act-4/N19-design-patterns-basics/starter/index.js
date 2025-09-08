/**
 * N19 - Design Patterns Basics
 * 20 défis: Singleton, Factory, Strategy, Observer, Decorator, Adapter...
 */

// Simples
function createSingleton(factory) {
  // TODO: Retourner getInstance() qui crée une fois via factory
}

function simpleFactory(map) {
  // TODO: create(type, ...args) → map[type](...args)
}

function strategy(context, strategies) {
  // TODO: context.type sélectionne strategies[type](context)
}

function adapter(target, adaptee) {
  // TODO: retourner un objet qui convertit l'API de adaptee vers target
}

function decorator(fn, before, after) {
  // TODO: wrapper qui appelle before(), fn(), after()
}

// Faciles
function observer() {
  // TODO: on(event, cb), off, emit
}

function command(execute, undo) {
  // TODO: { execute, undo }
}

function memento() {
  // TODO: save(state), restore()
}

function proxy(target, handler) {
  // TODO: wrapper léger (sans ES Proxy) redirigeant vers handler
}

function composite() {
  // TODO: add(component), execute() sur enfants
}

// Moyens
function chainOfResponsibility(handlers) {
  // TODO: traverse handlers jusqu'à gestion
}

function flyweight(factory) {
  // TODO: cache d'instances basé sur clé
}

function stateMachine(states, initial) {
  // TODO: transition(state, event) → nouveau state
}

function templateMethod(hooks) {
  // TODO: run() appelle hooks dans l'ordre
}

function builder() {
  // TODO: chaînage .setX().setY().build()
}

// Complexes
function mediator() {
  // TODO: coordonner composants via un médiateur central
}

function repository(initial = []) {
  // TODO: add/get/update/delete en immutabilité
}

function eventSourcing() {
  // TODO: apply(event), getState() depuis events
}

function cqrs() {
  // TODO: commandes (write) séparées des requêtes (read)
}

function pluginSystem() {
  // TODO: register(plugin), execute(hook, ctx)
}

module.exports = {
  createSingleton,
  simpleFactory,
  strategy,
  adapter,
  decorator,
  observer,
  command,
  memento,
  proxy,
  composite,
  chainOfResponsibility,
  flyweight,
  stateMachine,
  templateMethod,
  builder,
  mediator,
  repository,
  eventSourcing,
  cqrs,
  pluginSystem
};


