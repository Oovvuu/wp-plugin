/* global tinymce */

/**
 * Insert Oovvuu embed after 3rd paragraph
 *
 * @param   {int}    id    The embed ID.
 */
const insertEmbed = (id) => {
  // return if no id.
  if (!id) {
    return false;
  }

  // Gutenberg.
  if (wp.data) {
    const {
      data: { dispatch, select },
      blocks: { createBlock },
    } = wp;

    const {
      getBlocks,
    } = select('core/block-editor');

    const {
      insertBlocks,
      removeBlocks,
    } = dispatch('core/block-editor');

    // Create new embed block.
    const newBlock = createBlock(
      'oovvuu/embed', {
        id,
      },
    );

    const blocks = getBlocks();
    const oovvuuEmbedBlocks = blocks.filter((value) => value.name === 'oovvuu/embed');
    const clientIds = oovvuuEmbedBlocks.map((block) => block.clientId);

    // Remove all current oovvuu embeds.
    removeBlocks(clientIds);

    // Insert block after 3rd paragraph.
    insertBlocks(newBlock, 3);
  }

  // Classic editor.
  if (tinymce?.editors?.content) {
    // Get editor content.
    const content = tinymce.editors.content.getContent();

    // Dummy element to process nodes.
    const el = document.createElement('div');
    el.innerHTML = content;

    // Array of HTML elements.
    const nodes = [...el.childNodes];
    const nodesHtml = nodes.map((n) => n.outerHTML);

    // Remove existing shortcode.
    const filteredNodes = nodesHtml.filter((n) => !n.includes('[oovvuu-embed'));

    // Add new shortcode as the 4th element.
    filteredNodes.splice(3, 0, `[oovvuu-embed id="${id}"]`);

    // Reset editor content.
    tinymce.editors.content.setContent(filteredNodes.join(''));
  }

  return true;
};
export default insertEmbed;
