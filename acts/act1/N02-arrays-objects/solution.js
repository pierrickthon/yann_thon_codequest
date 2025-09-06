/**
 * N02: Arrays & Objects - Solution Template
 */

/**
 * Finds users older than specified age
 * @param {object[]} users - Array of user objects
 * @param {number} minAge - Minimum age
 * @returns {object[]} Filtered users
 */
function findUsersOlderThan(users, minAge) {
  // TODO: Filter users by age
  return users.filter(user => user.age > minAge);
}

/**
 * Groups users by a specified property
 * @param {object[]} users - Array of user objects
 * @param {string} property - Property to group by
 * @returns {object} Grouped users
 */
const groupBy = (users, property) => {
  // TODO: Group users by property
  return users.reduce((groups, user) => {
    const key = user[property];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(user);
    return groups;
  }, {});
};

/**
 * Transforms array of objects to pick specific properties
 * @param {object[]} objects - Array of objects
 * @param {string[]} properties - Properties to pick
 * @returns {object[]} Transformed objects
 */
function pickProperties(objects, properties) {
  // TODO: Pick only specified properties
  return objects.map(obj => {
    const picked = {};
    properties.forEach(prop => {
      if (obj.hasOwnProperty(prop)) {
        picked[prop] = obj[prop];
      }
    });
    return picked;
  });
}

/**
 * Flattens nested arrays
 * @param {any[]} nestedArray - Array with nested arrays
 * @returns {any[]} Flattened array
 */
function flattenArray(nestedArray) {
  // TODO: Flatten nested array
  return nestedArray.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

/**
 * Merges multiple objects
 * @param {...object} objects - Objects to merge
 * @returns {object} Merged object
 */
function mergeObjects(...objects) {
  // TODO: Merge objects with spread operator
  return Object.assign({}, ...objects);
}

/**
 * Deep clones an object
 * @param {object} obj - Object to clone
 * @returns {object} Deep cloned object
 */
const deepClone = (obj) => {
  // TODO: Implement deep clone
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const cloned = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
};

/**
 * Sorts array of objects by multiple criteria
 * @param {object[]} objects - Array to sort
 * @param {string[]} sortKeys - Keys to sort by
 * @returns {object[]} Sorted array
 */
function multiSort(objects, sortKeys) {
  // TODO: Sort by multiple keys
  return [...objects].sort((a, b) => {
    for (let key of sortKeys) {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
}

// Export functions for testing
module.exports = {
  findUsersOlderThan,
  groupBy,
  pickProperties,
  flattenArray,
  mergeObjects,
  deepClone,
  multiSort
};