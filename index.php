<?php
/**
 * Embed videos into your posts using the Oovvuu platform.
 *
 * Plugin Name: Oovvuu
 * Description: Embed videos into your posts using the Oovvuu platform.
 * Version: 0.1.0
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * The base directory for all Optimizely X plugin files.
 *
 * @since 1.0.0
 * @var string
 */
define( 'OOVVUU_PATH', __DIR__ );

/**
 * The base URL for all Optimizely X plugin files.
 *
 * @since 1.0.0
 * @var string
 */
define( 'OOVVUU_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

// Singleton.
require_once __DIR__ . '/inc/traits/trait-singleton.php';

// Admin settings.
require_once __DIR__ . '/inc/classes/class-admin-settings.php';

// Include functions for working with assets (primarily JavaScript).
require_once __DIR__ . '/inc/assets.php';

// Functions.
require_once __DIR__ . '/functions.php';

// Metaboxes.
require_once __DIR__ . '/inc/meta-boxes.php';
