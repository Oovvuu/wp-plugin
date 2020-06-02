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

if ( empty( $attributes ) || empty( $attributes['id'] ) ) {
	return;
}

?>

<div data-oovvuu-embed='<?php echo esc_attr( $attributes['id'] ); ?>'></div>
