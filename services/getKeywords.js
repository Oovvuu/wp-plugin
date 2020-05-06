const { apiFetch } = wp;

/**
 * Performs an API request to obtain keywords for an article given its title and
 * content.
 *
 * @param  {[string]} title   The post title.
 * @param  {[string]} content The post content.
 * @return {[array]}          The array of keywords.
 */
const getKeywords = (title, content) => apiFetch({
  path: '/oovvuu/v1/keywords/',
  method: 'POST',
  data: { title, content },
});

export default getKeywords;
