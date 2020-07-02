/**
 * Returns a clean state that removed values that should not be persistent.
 *
 * @param  {object} dirtyState The dirty state.
 * @return {object}            The clean state.
 */
const cleanDirtyState = (dirtyState) => Object.keys(dirtyState).reduce((carry, key) => {
  // Excluded from post meta.
  const filter = [
    'embeds',
    'isLoading',
    'isUserAuthenticated',
    'lastActionType',
    'currentDraggingVideo',
  ];

  return !filter.includes(key) ? { ...carry, ...{ [key]: dirtyState[key] } } : carry;
}, {});

export default cleanDirtyState;
