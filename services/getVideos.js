const { apiFetch } = wp;

/**
 * Performs an API request to obtain videos given keywords.
 *
 * @param  {[array]} keywords The keywords.
 * @return {[array]}          The array of keywords.
 */
const getVideos = (keywords, id) => apiFetch({
  path: '/oovvuu/v1/videos/',
  method: 'POST',
  data: { keywords, id },
});

export default getVideos;
