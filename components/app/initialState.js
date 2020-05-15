/**
 * Passed as defaultValue to a React.Context instance and further into a useReducer instance
 *   to define the state for a Redux-like application store.
 *
 * @type {{object}}
 */
const initialState = {
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
  selectedVideos: {
    hero: null,
    positionTwo: [],
  },
};

export default initialState;
