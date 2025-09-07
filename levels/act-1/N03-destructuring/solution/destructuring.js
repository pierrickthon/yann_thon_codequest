function mergeUserPrefs(defaults, incoming) {
  return { ...defaults, ...incoming };
}
module.exports = { mergeUserPrefs };