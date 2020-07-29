import insertShortcode from './insertShortcode';
import isGutenbergEditor from './isGutenbergEditor';

/**
 * Insert Oovvuu embed after 3rd paragraph
 *
 * @param {object}  args    The embed args.
 * @param {object}  videos  The videos.
 * @param {boolean} enabled True when the position is enabled, otherwise false.
 */
const insertEmbed = (args, videos, enabled) => {
  // Gutenberg.
  if (isGutenbergEditor() && wp.data && wp.blocks) {
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

    const blocks = getBlocks();
    const oovvuuEmbedBlocks = blocks.filter((value) => value.name === 'oovvuu/embed');
    const clientIds = oovvuuEmbedBlocks.map((block) => block.clientId);

    // Remove all current oovvuu embeds.
    removeBlocks(clientIds);

    // Add new block if enabled and contains videos.
    if (enabled && args && videos.length > 0) {
      // Remove all un-needed data from videos.
      const minimalVideos = videos.map((video) => ({
        id: video.id,
        preview: { ...video.preview },
        thumbnail: { ...video.thumbnail },
      }));

      // Create new embed block.
      const newBlock = createBlock(
        'oovvuu/embed', {
          id: args.id,
          frameUrl: args.frameUrl,
          playerScriptUrl: args.playerScriptUrl,
          videos: JSON.stringify(minimalVideos),
        },
      );

      // Insert block after 3rd paragraph.
      insertBlocks(newBlock, 3);
    }
  }

  // Classic editor.
  if (typeof tinymce !== 'undefined' && tinymce?.editors?.content && wp?.shortcode) {
    const { shortcode } = wp;

    // Get editor content and insert/modify embed shortcode.
    const currentHtml = tinymce.editors.content.getContent();
    const newHtml = insertShortcode(args, currentHtml, shortcode.regexp('oovvuu-embed'), enabled);

    // Check content is valid and different to current.
    if (newHtml !== '' && newHtml !== currentHtml) {
      tinymce.editors.content.setContent(newHtml);
    }
  }
};
export default insertEmbed;
