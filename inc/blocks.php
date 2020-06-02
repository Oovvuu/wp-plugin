<?php
/**
 * Contains functions for working with assets (primarily JavaScript).
 *
 * @package Oovvuu
 */

namespace Oovvuu;

// Embed Block.
register_block_type(
	'oovvuu/embed-block',
	[
		'attributes'      => [
			'id' => [
				'type'    => 'string',
				'default' => '',
			],
		],
		'render_callback' => __NAMESPACE__ . '\render_block_embed',
	]
);

/**
 * Renders the Embed Block.
 *
 * @param array  $attributes The attributes for this block.
 * @param string $content The inner block content.
 * @return string The content for the block.
 */
function render_block_embed( $attributes, $content ) {
	ob_start();
	include dirname( __DIR__ ) . '/template-parts/blocks/embed.php';
	return ob_get_clean();
}

