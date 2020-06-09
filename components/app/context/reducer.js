import removeVideo from 'services/removeVideo';
import swapVideos from 'services/swapVideos';

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
    case 'RESET_STATE':
      return { ...nextState, ...payload };
    case 'UPDATE_RECOMMENDED_KEYWORDS':
      nextState.recommendedKeywords = payload;
      return nextState;
    case 'UPDATE_RECOMMENDED_TOPICS':
      nextState.recommendedTopics = payload;
      return nextState;
    case 'UPDATE_RECOMMENDED_VIDEOS':
      nextState.recommendedVideos = payload;
      return nextState;
    case 'UPDATE_SELECTED_KEYWORDS':
      nextState.selectedKeywords = payload;
      return nextState;
    case 'UPDATE_SELECTED_TOPICS':
      nextState.selectedTopics = payload;
      return nextState;
    case 'CLEAR_SELECTED_TOPICS': {
      return {
        ...nextState,
        selectedTopics: [],
      };
    }
    case 'CLEAR_TOPICS': {
      return {
        ...nextState,
        selectedTopics: [],
        recommendedTopics: [],
      };
    }
    case 'CLEAR_SELECTED_AND_USER_KEYWORDS':
      return { ...nextState, selectedKeywords: [], userKeywords: [] };
    case 'UPDATE_USER_KEYWORDS':
      nextState.userKeywords = payload;
      return nextState;
    case 'UPDATE_SELECTED_VIDEOS':
      nextState.selectedVideos = payload;
      return nextState;
    case 'DISABLE_POSITION':
      if (payload.position === 'hero') {
        nextState.isHeroEnabled = false;
      } else if (payload.position === 'positionTwo') {
        nextState.isPositionTwoEnabled = false;
      }
      return nextState;
    case 'ENABLE_POSITION':
      if (payload.position === 'hero') {
        nextState.isHeroEnabled = true;
      } else if (payload.position === 'positionTwo') {
        nextState.isPositionTwoEnabled = true;
      }
      return nextState;
    case 'TOGGLE_POSITION_ENABLED':
      if (payload.position === 'hero') {
        nextState.isHeroEnabled = !nextState.isHeroEnabled;
      } else if (payload.position === 'positionTwo') {
        nextState.isPositionTwoEnabled = !nextState.isPositionTwoEnabled;
      }
      return nextState;
    case 'REMOVE_VIDEO': {
      return removeVideo(nextState, payload.position, payload.videoId);
    }
    case 'SWAP_VIDEOS': {
      return swapVideos(nextState, payload);
    }
    case 'SET_DRAGGING_VIDEO': {
      nextState.currentDraggingVideo = payload;
      return nextState;
    }
    case 'UPDATE_EMBEDS': {
      return { ...nextState, embeds: payload };
    }
    case 'SET_LOADING_STATE':
      return {
        ...nextState,
        isLoading: true,
        loadingAttributes: payload,
      };
    case 'CLEAR_LOADING_STATE': {
      return {
        ...nextState,
        isLoading: false,
        loadingAttributes: { message: '' },
      };
    }
    case 'SET_USER_IS_AUTHENTICATED': {
      return {
        ...nextState,
        isUserAuthenticated: true,
      };
    }

    default:
      return nextState;
  }
};

export default reducer;
