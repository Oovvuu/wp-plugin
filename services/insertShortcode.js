/**
 * Insert Oovvuu shortcode after 3th element.
 * Remove existing shortcode if present.
 *
 * @param   {int}    id    The embed ID.
 * @param   {string} html  The markup.
 */
const insertShortcode = (id, html) => {
  // return if no id.
  if (!id || !html) {
    return '';
  }
  // Dummy element to process nodes.
  const el = document.createElement('div');
  el.innerHTML = html;

  // Array of HTML elements.
  const nodes = [...el.childNodes];
  const nodesHtml = nodes.map((n) => n.outerHTML);

  const shortcodePattern = /\[oovvuu-embed(\s.*?)?\](?:([^[]+)?\[\/shortcode\])?/g;
  const emptyTagPattern = /<[^/>][^>]*><\/[^>]+>/g;
  // If node contains shortcode remove it. Clean empty tag after.
  const filteredNodes = nodesHtml.map(
    (n) => (
      shortcodePattern.test(n)
        ? n.replace(shortcodePattern, '').replace(emptyTagPattern, '')
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
