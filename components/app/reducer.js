const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'UPDATE_RECOMMENDED_KEYWORDS':
      return { ...state, recommendedKeywords: payload };
    case 'UPDATE_RECOMMENDED_VIDEOS':
      return { ...state, recommendedVideos: payload };
    case 'UPDATE_SELECTED_KEYWORDS':
      return { ...state, selectedKeywords: payload };
    default:
      console.error(`Unknown action:\n${JSON.stringify(action)}`);
      return state;
  }
};

export default reducer;
