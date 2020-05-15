/**
 * Performs an API request to obtain keywords for an article given its title and
 * content.
 *
 * @param  {[string]} title   The post title.
 * @param  {[string]} content The post content.
 * @param  {[int]}    id      The post id.
 * @returns {Promise} Future object for API response data.
 */
const getKeywords = (title, content, id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/keywords/',
    method: 'POST',
    data: { title, content, id },
  }).then((value) => {
    const { wordings } = value?.data?.analyseText || null;
    return wordings
      ? {
        hasError: false,
        data: { keywords: wordings },
      } : {
        hasError: true,
        message: __('Malformed response data.', 'oovvuu'),
      };
  }).catch((error) => {
    const { message } = error;
    // TODO: Perform error handling.
    console.error(error);

    return {
      hasError: true,
      error: { message },
    };
  });
};

export default getKeywords;
