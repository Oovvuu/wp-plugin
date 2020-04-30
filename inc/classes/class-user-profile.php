<?php
/**
 * Class file for displaying authentication management controls on user profile
 * page.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Class User_Profile.
 */
class User_Profile {
	use Singleton;

	/**
	 * Setup the class.
	 *
	 * @since 1.0.0
	 */
	public function setup() {
		add_action( 'show_user_profile', [ $this, 'render_authentication_management' ] );
	}

	/**
	 * Renders the authentication management controls for a specific user.
	 *
	 * @since 1.0.0
	 */
	public function render_authentication_management() {
		load_admin_partial( 'admin', 'user-profile' );
	}
}

// Initialize the class.
User_Profile::instance();
