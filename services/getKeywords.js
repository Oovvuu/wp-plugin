const { apiFetch } = wp;

/**
 * Performs an API request to obtain keywords for an article given its title and
 * content.
 *
 * @param  {[string]} title   The post title.
 * @param  {[string]} content The post content.
 * @param  {[int]}    id      The post id.
 * @return {[array]}          The array of keywords.
 */
const getKeywords = (title, content, id) => apiFetch({
  path: '/oovvuu/v1/keywords/',
  method: 'POST',
  data: { title, content, id },
});

export default getKeywords;
