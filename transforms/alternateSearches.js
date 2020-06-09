/**
 * Unwraps alternateSearch response data for use in this app.
 * @param responseJSON object JSON object with embed data.
 */
const transformAlternateSearch = (responseJSON) => {
  const {
    approximateTotalCount,
    filter: {
      keywordMatch: [keywordMatch],
    },
    previewImage,
  } = responseJSON;

  const countToString = (count) => {
    switch (true) {
      case count > 999:
        return '999+';
      case count < 1:
        return '0';
      default:
        return count.toString();
    }
  };

  return {
    approximateTotalCount: countToString(approximateTotalCount),
    keywordMatch,
    previewImage,
  };
};

export default transformAlternateSearch;
