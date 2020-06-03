<?php
/**
 * Add oovvuu-embed shortcode.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Render embed shortcode.
 *
 * @param array $atts shortcode atts.
 * @return string the embed template.
 */
function oovvuu_embed_shortcode( $atts ) {
	$attributes = shortcode_atts(
		[
			'id' => '',
		],
		$atts,
		'oovvuu-embed' 
	);
	ob_start();
	include dirname( __DIR__ ) . '/template-parts/blocks/embed.php';
	return ob_get_clean();  
}

// Register shortcode.
add_shortcode( 'oovvuu-embed', __NAMESPACE__ . '\oovvuu_embed_shortcode' );
