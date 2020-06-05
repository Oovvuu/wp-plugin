
/**
 * Insert Oovvuu shortcode after 3th element.
 * Remove existing shortcode if present.
 *
 * @param   {int}    id    The embed ID.
 * @param   {string} html  The markup.
 * @param   {RegExp} regex Shortcode regex.
 */
const insertShortcode = (id, html, regex) => {
  // return if no id, html or regex.
  if (!id || !html || !regex) {
    return '';
  }

  // Dummy element to process nodes.
  const el = document.createElement('div');
  el.innerHTML = html;

  // Array of HTML elements.
  const nodes = [...el.childNodes];
  const nodesHtml = nodes.map((n) => n.outerHTML);

  const emptyTagPattern = /<[^/>][^>]*><\/[^>]+>/g;

  // If node contains shortcode remove it. Clean empty tag after.
  const filteredNodes = nodesHtml.map(
    (n) => (
      regex.test(n)
        ? n.replace(regex, '').replace(emptyTagPattern, '')
        : n
    ),
  );

  // Add new shortcode as the 4th element.
  if (filteredNodes.length > 2) {
    filteredNodes.splice(3, 0, `[oovvuu-embed id="${id}"]`);
  }

  return filteredNodes.join('');
};
export default insertShortcode;
