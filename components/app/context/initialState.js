/**
 * Passed as defaultValue to a React.Context instance and further into a useReducer instance
 *   to define the state for a Redux-like application store.
 *
 * @type {{object}}
 */
const initialState = {
  embeds: { hero: null, positionTwo: null },
  isHeroEnabled: true,
  isPositionTwoEnabled: true,
  lastActionType: null,
  recommendedKeywords: [],
  recommendedVideos: {
    hero: [],
    heroEmptyReason: null,
    heroSecondary: [],
    positionTwo: [],
    positionTwoEmptyReason: null,
    positionTwoSecondary: [],
    alternateSearches: [],
  },
  selectedKeywords: [],
  userKeywords: [],
  selectedVideos: {
    hero: [],
    heroSecondary: [],
    positionTwo: [],
    positionTwoSecondary: [],
  },
  selectedAlternateSearches: [],
  isLoading: false,
  isUserAuthenticated: false,
  loadingAttributes: {
    message: '',
  },
  isLoadedFromMeta: false,
  currentDraggingVideo: [],
};

export default initialState;
