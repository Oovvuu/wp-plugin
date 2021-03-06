<?php
/**
 * Embed videos into your posts using the Oovvuu platform.
 *
 * Plugin Name: Oovvuu
 * Description: Embed videos into your posts using the Oovvuu platform.
 * Version: 1.0.2
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * The base directory for all Oovvuu plugin files.
 *
 * @since 1.0.0
 * @var string
 */
define( 'OOVVUU_PATH', __DIR__ );

/**
 * The base URL for all Oovvuu plugin files.
 *
 * @since 1.0.0
 * @var string
 */
define( 'OOVVUU_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

// phpcs:disable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant

// Show error if plugin is not built.
if ( ! file_exists( OOVVUU_PATH . '/vendor/autoload.php' ) ) {
	add_action(
		'admin_notices',
		function () {
			?>
			<div class="notice notice-error">
				<p>
					<?php
					echo wp_kses_post(
						__( 'Oovvuu: Built version of this plugin is not installed. Please build assets with', 'oovvuu' )
						. ' <code>composer install && npm install && npm run build</code>'
					);
					?>
				</p>
			</div>
			<?php
		}
	);
} else {
	require_once OOVVUU_PATH . '/vendor/autoload.php';

	// Load .env file.
	if ( file_exists( OOVVUU_PATH . '/.env' ) && class_exists( 'Dotenv\Dotenv' ) ) {
		$oovvuu_dotenv = \Dotenv\Dotenv::createImmutable( __DIR__ );
		$oovvuu_dotenv->load();
	}
}

// Helpers.
require_once OOVVUU_PATH . '/inc/helpers.php';

// Singleton.
require_once OOVVUU_PATH . '/inc/traits/trait-singleton.php';

// Admin settings.
require_once OOVVUU_PATH . '/inc/classes/class-admin-settings.php';

// Authentication.
require_once OOVVUU_PATH . '/inc/classes/class-auth.php';

// REST API.
require_once OOVVUU_PATH . '/inc/classes/class-rest-api.php';

// User Profile.
require_once OOVVUU_PATH . '/inc/classes/class-user-profile.php';

// Include functions for working with assets (primarily JavaScript).
require_once OOVVUU_PATH . '/inc/assets.php';

// Metaboxes.
require_once OOVVUU_PATH . '/inc/meta-boxes.php';

// Blocks.
require_once OOVVUU_PATH . '/inc/blocks.php';

// Hero.
require_once OOVVUU_PATH . '/inc/embeds.php';

// Shortcodes.
require_once OOVVUU_PATH . '/inc/shortcodes.php';
