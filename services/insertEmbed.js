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
    data: { dispatch },
    blocks: { createBlock },
  } = wp;

  const {
    insertBlocks,
  } = dispatch('core/block-editor');

  // Create new embed block.
  const newBlock = createBlock(
    'oovvuu/embed-block', {
      id,
    },
  );

  // Insert block after 3rd paragraph.
  insertBlocks(newBlock, 3);

  return true;
};
export default insertEmbed;
