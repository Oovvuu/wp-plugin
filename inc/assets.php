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
		get_versioned_asset_path( 'appClassic.js' ),
		[ 'react', 'react-dom', 'wp-api-fetch', 'wp-shortcode' ],
		'1.0.0',
		true
	);

	wp_enqueue_style(
		'oovvuu-fonts-css',
		get_versioned_asset_path( 'fonts.css' ),
		[],
		'1.0.0'
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
		get_versioned_asset_path( 'app.js' ),
		[ 'wp-i18n', 'wp-edit-post', 'wp-plugins' ],
		'1.0.0',
		true
	);
	inline_locale_data( 'oovvuu-app' );

	wp_enqueue_script(
		'oovvuu-embed-block-js',
		get_versioned_asset_path( 'embedBlock.js' ),
		[ 'wp-i18n', 'wp-blocks' ],
		'1.0.0',
		true
	);
	inline_locale_data( 'oovvuu-app' );

	wp_enqueue_style(
		'oovvuu-fonts-css',
		get_versioned_asset_path( 'fonts.css' ),
		[],
		'1.0.0'
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
	$base_path = is_dev() ?
		get_proxy_path() :
		plugins_url( 'build/', __DIR__ );

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

/**
 * Get the development mode proxy URL from .env
 *
 * @return string
 */
function get_proxy_path() {
	$proxy_url = 'https://0.0.0.0:8080';

	// Use the value in .env if available.
	if ( function_exists( 'getenv' ) && ! empty( getenv( 'PROXY_URL' ) ) ) {
		$proxy_url = getenv( 'PROXY_URL' );
	}

	return sprintf( '%s/build/', $proxy_url );
}

/**
 * Whether development mode is allowed.
 *
 * @return bool
 */
function allow_dev_mode() {
	return is_admin() && ( defined( 'ALLOW_DEV_MODE' ) && ALLOW_DEV_MODE );
}

/**
 * Whether development mode is enabled.
 *
 * @return bool whether or not we're in development mode
 */
function is_dev() {
	if ( allow_dev_mode() ) {
		return (
			( ! empty( $_GET['fe-dev'] ) && 'on' === $_GET['fe-dev'] ) || // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification, WordPress.VIP.SuperGlobalInputUsage.AccessDetected, WordPress.Security.NonceVerification.Recommended
			! empty( $_COOKIE['fe-dev'] ) // phpcs:ignore WordPress.VIP.RestrictedVariables.cache_constraints___COOKIE, WordPress.VIP.SuperGlobalInputUsage.AccessDetected, WordPressVIPMinimum.Variables.RestrictedVariables.cache_constraints___COOKIE
		);
	}

	return false;
}

/**
 * Set cookie to truthy value if fe-dev param is set to 'on', otherwise set coookie to falsy value
 */
function set_dev_cookie() {
	if ( ! empty( $_GET['fe-dev'] ) && 'off' === $_GET['fe-dev'] ) { // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification, WordPress.VIP.SuperGlobalInputUsage.AccessDetected, WordPress.Security.NonceVerification.Recommended
		setcookie( 'fe-dev', '0', 0, COOKIEPATH, COOKIE_DOMAIN, is_ssl() ); // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.cookies_setcookie
		$_COOKIE['fe-dev'] = null; // phpcs:ignore WordPress.VIP.RestrictedVariables.cache_constraints___COOKIE, WordPressVIPMinimum.Variables.RestrictedVariables.cache_constraints___COOKIE, WordPressVIPMinimum.Functions.RestrictedFunctions.cookies_setcookie
	} elseif ( is_dev() ) {
		setcookie( 'fe-dev', '1', 0, COOKIEPATH, COOKIE_DOMAIN, is_ssl() ); // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.cookies_setcookie
	}
}

add_action( 'admin_init', __NAMESPACE__ . '\set_dev_cookie' );
