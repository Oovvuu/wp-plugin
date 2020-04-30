<?php
/**
 * Oovvuu WP Plugin: Custom post type and taxonomy registration
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * A helper function for loading partials.
 *
 * @param string $scope Where to load the partial from (admin or public).
 * @param string $slug The partial filepath to the partial template.
 *
 * @since 1.0.0
 * @access public
 */
function load_admin_partial( $scope, $slug ) {

	// Ensure requested partial exists.
	$filepath = OOVVUU_PATH . '/admin/partials/' . $slug . '.php';
	if ( ! file_exists( $filepath ) ) {
		return;
	}

	require $filepath; //phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
}
