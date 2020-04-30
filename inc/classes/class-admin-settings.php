<?php
/**
 * Class file for managing the site admin settings.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Class Admin_Settings.
 */
class Admin_Settings {
	use Singleton;

	/**
	 * Settings page name.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $page_name = 'oovvuu-settings';

	/**
	 * Setup the class.
	 *
	 * @since 1.0.0
	 */
	public function setup() {
		add_action( 'admin_menu', [ $this, 'setup_options_page' ], 99 );
	}

	/**
	 * Settings page setup.
	 *
	 * @since 1.0.0
	 */
	public function setup_options_page() {
		add_menu_page(
			__( 'Oovvuu', 'oovvuu' ),
			__( 'Oovvuu', 'oovvuu' ),
			/**
			 * Filters the settings page capabilty.
			 *
			 * @param string The settings page capability.
			 */
			apply_filters( 'oovvuu_settings_capability', 'manage_options' ),
			$this->page_name,
			[ $this, 'page_options_render' ]
		);
	}

	/**
	 * Settings page render.
	 *
	 * @since 1.0.0
	 */
	public function page_options_render() {
		/**
		 * Filters the settings page capabilty.
		 *
		 * @param string The settings page capability.
		 */
		if ( ! current_user_can( apply_filters( 'oovvuu_settings_capability', 'manage_options' ) ) ) {
			wp_die( esc_html__( 'You do not have permissions to access this page.', 'oovvuu' ) );
		}

		echo 'Settings...';
	}
}

// Initialize the class.
Admin_Settings::instance();
