import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import EmbedEdit from './edit';

const { registerBlockType } = wp.blocks;

registerBlockType(
  'oovvuu/embed',
  {
    attributes,
    category: 'embed',
    description: __(
      'A block to embed videos from Oovvuu',
      'oovvuu-app',
    ),
    edit: EmbedEdit,
    icon: 'video-alt2',
    keywords: [
      __('oovvuu', 'oovvuu-app'),
    ],
    save: () => null,
    supports: {
      // Remove support for an HTML mode
      html: false,
      // Hide this block from the inserter.
      inserter: false,
      // Use the block just once per post
      multiple: false,
      // Don't allow the block to be converted into a reusable block.
      reusable: false,
    },
    title: __('Oovvuu Embed', 'oovvuu-app'),
  },
);
