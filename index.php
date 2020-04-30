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

// Functions.
require_once __DIR__ . '/functions.php';

// Singleton.
require_once __DIR__ . '/inc/traits/trait-singleton.php';

// Admin settings.
require_once __DIR__ . '/inc/classes/class-admin-settings.php';

// Authentication.
require_once __DIR__ . '/inc/classes/class-auth.php';

// User Profile.
require_once __DIR__ . '/inc/classes/class-user-profile.php';

// Include functions for working with assets (primarily JavaScript).
require_once __DIR__ . '/inc/assets.php';

// Metaboxes.
require_once __DIR__ . '/inc/meta-boxes.php';
