/**
 * N23 - State Management (Redux style)
 */

// Simples
function createStore(reducer, preloadedState) {
  // TODO: { getState, dispatch, subscribe }
}

function combineReducers(reducers) {
  // TODO: retourner un reducer combiné
}

function applyMiddleware(store, ...middlewares) {
  // TODO: composer middlewares
}

function createAction(type) {
  // TODO: payload creator
}

function createReducer(initialState, handlers) {
  // TODO: reducer par table de handlers
}

// Faciles
function thunkMiddleware() {
  // TODO: supporter dispatch de fonctions
}

function loggerMiddleware() {
  // TODO: enregistrer actions (retourner traces plutôt que console)
}

function selector(fn) {
  // TODO: créer un sélecteur simple
}

function createSlice({ name, initialState, reducers }) {
  // TODO: retourner { actions, reducer }
}

function immerLike(producer) {
  // TODO: produire nouvel état sans muter (copie superficielle)
}

// Moyens
function persist(store) {
  // TODO: save/load state via interface passée (pure)
}

function reselect(...funcs) {
  // TODO: mémoïser sélecteur
}

function devtools(store) {
  // TODO: extension qui capture l'historique
}

function effectsMiddleware(effects) {
  // TODO: side-effects déclaratifs simulés
}

function batchedUpdates(store) {
  // TODO: regrouper dispatchs
}

// Complexes
function entityAdapter(selectId) {
  // TODO: upsert/remove/selectors
}

function normalize(data, schema) {
  // TODO: normalisation de données
}

function timeTravel(store) {
  // TODO: undo/redo
}

function epicMiddleware(epics) {
  // TODO: traiter flux d'actions (simulé)
}

function storeInspector(store) {
  // TODO: produire un rapport d'état
}

module.exports = {
  createStore,
  combineReducers,
  applyMiddleware,
  createAction,
  createReducer,
  thunkMiddleware,
  loggerMiddleware,
  selector,
  createSlice,
  immerLike,
  persist,
  reselect,
  devtools,
  effectsMiddleware,
  batchedUpdates,
  entityAdapter,
  normalize,
  timeTravel,
  epicMiddleware,
  storeInspector
};


