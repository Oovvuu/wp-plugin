/**
 * Passed as defaultValue to a React.Context instance and further into a useReducer instance
 *   to define the state for a Redux-like application store.
 *
 * @type {{object}}
 */
const initialState = {
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
};

export default initialState;
