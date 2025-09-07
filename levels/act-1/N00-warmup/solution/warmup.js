/**
 * N00: System Check & Warm-up - Reference Solution
 */

function getEnvironment() {
  const versionNumber = parseInt(process.version.slice(1).split('.')[0]);
  
  return {
    node: process.version,
    platform: process.platform,
    ready: versionNumber >= 16
  };
}

function warmUp(name = 'Adventurer') {
  return `Welcome ${name} to CodeQuest!`;
}

module.exports = {
  getEnvironment,
  warmUp
};