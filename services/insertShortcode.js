/**
 * Insert Oovvuu shortcode after 3th element.
 * Remove existing shortcode if present.
 *
 * @param   {int}    id    The embed ID.
 * @param   {string} html  The markup.
 */
const insertShortcode = (id, html, shortcodePattern) => {
  // return if no id.
  if (!id || !html || !shortcodePattern) {
    return '';
  }


  // Dummy element to process nodes.
  const el = document.createElement('div');
  el.innerHTML = html;

  // Array of HTML elements.
  const nodes = [...el.childNodes];
  const nodesHtml = nodes.map((n) => n.outerHTML);

  const emptyTagPattern = /<[^/>][^>]*><\/[^>]+>/g;
  console.log(nodesHtml);

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
