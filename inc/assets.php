<?php
/**
 * Contains functions for working with assets (primarily JavaScript).
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * A callback for the admin_enqueue_scripts action hook to register assets for the
 * Classic Editor.
 *
 * @since 1.0.0
 */
function action_admin_enqueue_scripts() {
	global $post_type;

	// Only enqueue the script to register the scripts if supported.
	if ( ! in_array( $post_type, allowed_post_types(), true ) ) {
		return;
	}

	wp_enqueue_script(
		'oovvuu-app-classic-js',
		get_versioned_asset_path( 'appClassic.js' ),
		[ 'react', 'react-dom' ],
		'1.0.0',
		true
	);
}
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\action_admin_enqueue_scripts' );

/**
 * A callback for the enqueue_block_editor_assets action hook to register assets
 * for the Gutenberg editor.
 *
 * @since 1.0.0
 */
function action_enqueue_block_editor_assets() {
	global $post_type;

	// Only enqueue the script to register the scripts if supported.
	if ( ! in_array( $post_type, allowed_post_types(), true ) ) {
		return;
	}

	wp_enqueue_script(
		'oovvuu-app-js',
		get_versioned_asset_path( 'app.js' ),
		[ 'wp-i18n', 'wp-edit-post', 'wp-plugins' ],
		'1.0.0',
		true
	);
	inline_locale_data( 'oovvuu-app' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\action_enqueue_block_editor_assets' );

/**
 * Set allowed post types.
 *
 * @since 1.0.0
 *
 * @return array array of post types allowed for Gutenberg.
 */
function allowed_post_types() {
	$allowed_post_types = [ 'post' ];

	/**
	 * Filters the allowed post types used for including assets on edit post pages.
	 *
	 * @since 1.0.0
	 *
	 * @param array $allowed_post_types Array of post types.
	 */
	return apply_filters( 'oovvuu_allowed_post_types', $allowed_post_types );
}

/**
 * Get the version for a given asset.
 *
 * @since 1.0.0
 *
 * @param string $asset_path Entry point and asset type separated by a '.'.
 * @return string The asset version.
 */
function get_versioned_asset_path( $asset_path ) {
	static $asset_map;

	// Create public path.
	$base_path = plugins_url( 'build/', __DIR__ );

	if ( ! isset( $asset_map ) ) {
		$asset_map_file = dirname( __DIR__ ) . '/build/assetMap.json';
		if ( file_exists( $asset_map_file ) && 0 === validate_file( $asset_map_file ) ) {
			ob_start();
			include $asset_map_file; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.IncludingFile, WordPressVIPMinimum.Files.IncludingFile.UsingVariable
			$asset_map = json_decode( ob_get_clean(), true );
		} else {
			$asset_map = [];
		}
	}

	/*
	 * Appending a '.' ensures the explode() doesn't generate a notice while
	 * allowing the variable names to be more readable via list().
	 */
	list( $entrypoint, $type ) = explode( '.', "$asset_path." );
	$versioned_path            = isset( $asset_map[ $entrypoint ][ $type ] ) ? $asset_map[ $entrypoint ][ $type ] : false;

	if ( $versioned_path ) {
		return $base_path . $versioned_path;
	}

	return '';
}

/**
 * Creates a new Jed instance with specified locale data configuration.
 *
 * @since 1.0.0
 *
 * @param string $to_handle The script handle to attach the inline script to.
 */
function inline_locale_data( string $to_handle ) {
	// Define locale data for Jed.
	$locale_data = [
		'' => [
			'domain' => 'oovvuu',
			'lang'   => is_admin() ? get_user_locale() : get_locale(),
		],
	];

	// Pass the Jed configuration to the admin to properly register i18n.
	wp_add_inline_script(
		$to_handle,
		'wp.i18n.setLocaleData( ' . wp_json_encode( $locale_data ) . ", 'oovvuu' );"
	);
}
