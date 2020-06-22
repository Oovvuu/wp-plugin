/**
 * Memoized function for caching data.
 */
const cache = (key, value = null) => {
  const store = [];

  // Get a value from the cache.
  if (key && store[key]) {
    return store[key];
  }

  // Set the cache.
  if (key && value !== null) {
    store[key] = value;
  }

  // Unable to process request.
  return null;
};

export default cache;
