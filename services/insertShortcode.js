/**
 * Insert Oovvuu shortcode after 3th element.
 * Remove existing shortcode if present.
 *
 * @param   {int}    id    The embed ID.
 * @param   {string} html  The markup.
 * @param   {RegExp} regex Shortcode regex.
 * @param {boolean} enabled True when the position is enabled, otherwise false.
 */
const insertShortcode = (id, html, regex, enabled) => {
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

  // If position is disabled, do not add new shortcode.
  if (!enabled || !id) {
    return filteredNodes.join('');
  }

  // Add new shortcode as the 4th element.
  if (filteredNodes.length > 2) {
    filteredNodes.splice(3, 0, `[oovvuu-embed id="${id}"]`);
  } else {
    filteredNodes.push(`[oovvuu-embed id="${id}"]`);
  }

  return filteredNodes.join('');
};
export default insertShortcode;
