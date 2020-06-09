import getVideos from './getVideos';

/**
 * Performs an API request to obtain videos for a given topic.
 * Proxies request to getVideos() after validating topicKeywords param.
 *
 * @param  {[array]} topicKeywords The keywords.
 * @param  {string}  id Post ID.
 * @returns {Promise} Future object for API response data or error message.
 */
const getTopicVideos = (topicKeywords, id) => {
  const { i18n: { __ } } = wp;

  if (topicKeywords.length !== 1) {
    return Promise.resolve({
      hasError: true,
      message: __('Only one topic may be selected.', 'oovvuu'),
    });
  }

  return getVideos(topicKeywords, id);
};

export default getTopicVideos;
