<?php
/**
 * Contains functions for working with meta boxes.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

function add_metabox() {
	add_meta_box(
		'oovvuu',
		__( 'Oovvuu', 'oovvuu' ),
		function () {
			echo 'Content';
		},
		allowed_post_types(),
		'side'
	);
}
// @TODO Enable once classic editor support is started.
// add_action( 'add_meta_boxes', __NAMESPACE__ . '\add_metabox' );
