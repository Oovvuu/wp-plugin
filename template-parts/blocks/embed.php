<?php
/**
 * The template part for the Embed block.
 *
 * @param array $attributes The block attributes.
 * @param string $content The inner blocks.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

// Bail if no embed ID is passed.
if ( empty( $attributes ) || empty( $attributes['id'] ) ) {
	return;
}

// Render the embed.
the_embed_html( $attributes );
