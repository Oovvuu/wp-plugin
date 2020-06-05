/**
 * Unwraps alternateSearch response data for use in this app.
 * @param responseJSON object JSON object with embed data.
 */
const transformAlternateSearch = (responseJSON) => {
  const { filter: { keywordMatch: [keywordMatch] }, previewImage } = responseJSON;

  return { keywordMatch, previewImage };
};

export default transformAlternateSearch;
