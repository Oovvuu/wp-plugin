/**
 * Memoized function for caching data.
 */
const cache = (key, value = null) => {
  // Store the value globally.
  window.oovvuuStore = window.oovvuuStore || [];

  // Get a value from the cache.
  if (key && window.oovvuuStore[key]) {
    return window.oovvuuStore[key];
  }

  // Set the cache.
  if (key && value !== null) {
    window.oovvuuStore[key] = value;
  }

  // Unable to process request.
  return null;
};

export default cache;
