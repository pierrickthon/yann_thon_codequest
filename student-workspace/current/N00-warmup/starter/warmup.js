/**
 * N00: System Check & Warm-up
 * Your first CodeQuest challenge!
 */

/**
 * Returns environment information
 * @returns {Object} Environment details with node version, platform, and ready status
 */
function getEnvironment() {
  // TODO: Return an object with:
  // - node: process.version (Node.js version)
  // - platform: process.platform (OS platform)
  // - ready: true if node version >= 16
  
  // Your code here
  const majorVersion = parseInt(process.version.slice(1).split('.')[0], 10);
  return {
    node: process.version,
    platform: process.platform,
    ready: majorVersion >= 16
  };
}

/**
 * Creates a welcome message
 * @param {string} name - The name to welcome
 * @returns {string} Welcome message
 */
function warmUp(name = 'Adventurer') {
  // TODO: Return "Welcome [name] to CodeQuest!"
  
  // Your code here
  return `Welcome ${name} to CodeQuest!`;
}

// Don't forget to export your functions!
module.exports = {
  getEnvironment,
  warmUp
};