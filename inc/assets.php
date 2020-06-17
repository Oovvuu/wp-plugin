<?php
/**
 * Contains functions for working with assets (primarily JavaScript).
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * The main theme asset map.
 *
 * @var array
 */
define( 'OOVVUU_ASSET_MAP', ai_read_asset_map( dirname( __DIR__ ) . '/build/assetMap.json' ) );

/**
 * The main theme asset build mode.
 *
 * @var string
 */
define( 'OOVVUU_ASSET_MODE', OOVVUU_ASSET_MAP['mode'] ?? 'production' );

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

	// Only load within the classic editor.
	$current_screen = get_current_screen();

	if (
		$current_screen instanceof \WP_Screen
		&& $current_screen->is_block_editor()
	) {
		return;
	}

	wp_enqueue_script(
		'oovvuu-app-classic-js',
		ai_get_asset_path( 'appClassic.js' ),
		[ 'react', 'react-dom', 'wp-api-fetch', 'wp-shortcode' ],
		ai_get_asset_hash( 'appClassic.js' ),
		true
	);

	wp_enqueue_style(
		'oovvuu-fonts-css',
		ai_get_asset_path( 'fonts.css' ),
		[],
		ai_get_asset_hash( 'fonts.css' ),
	);

	// Send shorcode regex and edit profile link.
	wp_localize_script(
		'oovvuu-app-classic-js',
		'oovvuuAppUserData',
		[
			'editProfileLink' => get_edit_user_link(),
		]
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
		ai_get_asset_path( 'app.js' ),
		[ 'wp-i18n', 'wp-edit-post', 'wp-plugins' ],
		ai_get_asset_hash( 'app.js' ),
		true
	);
	inline_locale_data( 'oovvuu-app' );

	wp_enqueue_script(
		'oovvuu-embed-block-js',
		ai_get_asset_path( 'embedBlock.js' ),
		[ 'wp-i18n', 'wp-blocks' ],
		ai_get_asset_hash( 'embedBlock.js' ),
		true
	);
	inline_locale_data( 'oovvuu-app' );

	wp_enqueue_style(
		'oovvuu-fonts-css',
		ai_get_asset_path( 'fonts.css' ),
		[],
		ai_get_asset_hash( 'fonts.css' ),
	);

	// Send edit profile link to JS.
	wp_localize_script(
		'oovvuu-app-js',
		'oovvuuAppUserData',
		[
			'editProfileLink' => get_edit_user_link(),
		]
	);
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

/**
 * Get the development mode proxy URL from .env
 *
 * @return string
 */
function ai_get_proxy_path() {
	$proxy_url = 'https://0.0.0.0:8080';

	// Use the value in .env if available.
	if ( function_exists( 'getenv' ) && ! empty( getenv( 'PROXY_URL' ) ) ) {
		$proxy_url = getenv( 'PROXY_URL' );
	}

	return sprintf( '%s/build/', $proxy_url );
}

/**
 * Decode the asset map at the given file path.
 *
 * @param string $path File path.
 * @return array
 */
function ai_read_asset_map( string $path ) {
	if ( file_exists( $path ) && 0 === validate_file( $path ) ) {
		ob_start();
		include $path; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.IncludingFile, WordPressVIPMinimum.Files.IncludingFile.UsingVariable
		return json_decode( ob_get_clean(), true );
	}

	return [];
}

/**
 * Get a property for a given asset.
 *
 * @param string $asset Entry point and asset type separated by a '.'.
 * @param string $prop The property to get from the entry object.
 * @return string|null The asset property based on entry and type.
 */
function ai_get_asset_property( $asset, $prop ) {
	/*
	 * Appending a '.' ensures the explode() doesn't generate a notice while
	 * allowing the variable names to be more readable via list().
	 */
	list( $entrypoint, $type ) = explode( '.', "$asset." );

	$asset_property = OOVVUU_ASSET_MAP[ $entrypoint ][ $type ][ $prop ] ?? null;

	return $asset_property ? $asset_property : null;
}

/**
 * Get the path for a given asset.
 *
 * @param string $asset Entry point and asset type separated by a '.'.
 * @return string The asset version.
 */
function ai_get_asset_path( $asset ) {
	$asset_property = ai_get_asset_property( $asset, 'path' );

	if ( $asset_property ) {
		// Create public path.
		$base_path = OOVVUU_ASSET_MODE === 'development' ?
			ai_get_proxy_path() :
			plugins_url( 'build/', __DIR__ );

		return $base_path . $asset_property;
	}

	return null;
}

/**
 * Get the contentHash for a given asset.
 *
 * @param string $asset Entry point and asset type separated by a '.'.
 * @return string The asset's hash.
 */
function ai_get_asset_hash( $asset ) {
	$asset_property = ai_get_asset_property( $asset, 'hash' );
	$fallback_hash  = OOVVUU_ASSET_MAP['hash'] ?? '1.0.0';

	return $asset_property ?? $fallback_hash;
}
