/**
 * Reducer function passed with initialState to a useReducer hook to create
 *   a global application state via React context API. App state is immutable,
 *   so updates are performed by dispatching action objects and mapping updated
 *   data into a clone of the current state. Each switch case should return
 *   a new state object, with any updated data, or the unmodified state.
 *
 * @param state  Current application state. See initialState for structure.
 * @param action Object with only one or two keys:
 *                 - type     (required) A unique string constant for the state mutation.
 *                 - payload  (optional) Updated data for the next state.
 * @returns {{recommendedKeywords: *}|{selectedKeywords: *}|{recommendedVideos: *}|*}
 */
const reducer = (state, action) => {
  const { payload, type } = action;

  const nextState = { ...state, lastActionType: type };

  switch (type) {
    case 'UPDATE_RECOMMENDED_KEYWORDS':
      nextState.recommendedKeywords = payload;
      return nextState;
    case 'UPDATE_RECOMMENDED_VIDEOS':
      nextState.recommendedVideos = payload;
      return nextState;
    case 'UPDATE_SELECTED_KEYWORDS':
      nextState.selectedKeywords = payload;
      return nextState;
    case 'UPDATE_SELECTED_VIDEOS':
      nextState.selectedVideos = payload;
      return nextState;
    default:
      return nextState;
  }
};

export default reducer;
