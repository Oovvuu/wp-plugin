import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import EmbedEdit from './edit';

const { registerBlockType } = wp.blocks;

registerBlockType(
  'oovvuu/embed-block',
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
      html: false,
    },
    title: __('Oovvuu Embed', 'oovvuu-app'),
  },
);
