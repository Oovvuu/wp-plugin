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

  return true;
};
export default insertEmbed;
