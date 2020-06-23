
// Store the value globally.
window.oovvuuClientCache = window.oovvuuClientCache || [];

/**
 * Memoized class for caching data.
 */
export default class Cache {
  /**
   * Gets a cache value given a cache key.
   *
   * @param  {string} key The cache key.
   */
  static get(key) {
    // Invalid key.
    if (undefined === key || !key) {
      return null;
    }

    // Return the value.
    if (undefined !== window.oovvuuClientCache[key]) {
      return window.oovvuuClientCache[key];
    }

    return null;
  }

  /**
   * Set the cache value.
   *
   * @param {string} key The cache key.
   * @param {mixed}  value The value to cache.
   */
  static set(key, value) {
    // Set the cache.
    if (undefined !== key && undefined !== value) {
      window.oovvuuClientCache[key] = value;
      return true;
    }

    return false;
  }

  /**
   * Set the cache value.
   *
   * @param {string} key The cache key.
   */
  static delete(key) {
    // Clear the cache.
    if (undefined !== window.oovvuuClientCache[key]) {
      delete window.oovvuuClientCache[key];
      return true;
    }

    return false;
  }
}
