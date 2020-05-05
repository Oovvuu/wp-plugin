<?php
/**
 * Contains functions for working with meta boxes.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Add metabox.
 *
 * @since 1.0.0
 */
function add_metabox() {
	add_meta_box(
		'oovvuu',
		__( 'Oovvuu', 'oovvuu' ),
		function () {
			// React container.
			echo '<div id="oovvuu-classic-editor-react-app"></div>';
		},
		allowed_post_types(),
		'side'
	);
}
add_action( 'add_meta_boxes', __NAMESPACE__ . '\add_metabox' );
