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
 * @since 1.0.0
 * @param array $atts shortcode atts.
 * @return string the embed template.
 */
function embed_shortcode( $atts ) {
	$attributes = shortcode_atts(
		[
			'id'              => '',
			'frameUrl'        => 'https://playback.oovvuu.media/frame/' . $atts['id'] ?? '',
			'playerScriptUrl' => 'https://playback.oovvuu.media/player/v1.js',
		],
		$atts,
		'oovvuu-embed'
	);

	ob_start();
	include dirname( __DIR__ ) . '/template-parts/blocks/embed.php';
	return ob_get_clean();
}

// Register shortcode.
add_shortcode( 'oovvuu-embed', __NAMESPACE__ . '\embed_shortcode' );
