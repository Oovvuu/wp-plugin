/**
 * Insert Oovvuu embed after 3rd paragraph
 *
 * @param {int} id The embed ID.
 * @param {object} videos The videos.
 */
const insertEmbed = (id, videos) => {
  // return if no id.
  if (!id || videos.length === 0) {
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

  // Remove all un-needed data from videos.
  const minimalVideos = videos.map((video) => ({
    id: video.id,
    preview: { ...video.preview },
    thumbnail: { ...video.thumbnail },
  }));

  // Create new embed block.
  const newBlock = createBlock(
    'oovvuu/embed', {
      id,
      videos: JSON.stringify(minimalVideos),
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
