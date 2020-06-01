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
  },
  selectedKeywords: [],
  userKeywords: [],
  selectedVideos: {
    hero: [],
    heroSecondary: [],
    positionTwo: [],
    positionTwoSecondary: [],
  },
  isLoading: false,
  loadingAttributes: {
    message: '',
  },
  isLoadedFromMeta: false,
};

export default initialState;
