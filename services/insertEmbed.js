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

  // Check if Gutenberg.
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

  if (tinymce?.editors?.content) {
    const content = tinymce.editors.content.getContent();

    // Dummy element to process nodes.
    const el = document.createElement('div');
    el.innerHTML = content;

    // Array of HTML elements.
    const nodes = [...el.childNodes];
    const nodesHtml = nodes.map((n) => n.outerHTML);
    const filteredNodes = nodesHtml.filter((n) => !n.includes('blap'));
    filteredNodes.splice(3, 0, `<p>[oovvuu-embed id=${id}]</p>`);
    tinymce.editors.content.setContent(filteredNodes.join(''));
  }

  // Classic editor.
  return true;
};
export default insertEmbed;
