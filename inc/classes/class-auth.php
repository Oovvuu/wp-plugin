<?php
/**
 * Class file for managing user authentication.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Class Auth.
 */
class Auth {
	use Singleton;

	/**
	 * Setup the class.
	 *
	 * @since 1.0.0
	 */
	public function setup() {
		add_action( 'admin_post_oovvuu_auth0_redirect_callback', [ $this, 'oovvuu_auth0_redirect_callback' ] );
	}

	/**
	 * Redirect callback URL for the Auth0 app to perform the authentication handshake.
	 *
	 * @since 1.0.0
	 */
	public function oovvuu_auth0_redirect_callback() {
		// Get the redirect URL.
		$redirect_url = admin_url( '/profile.php' );

		if ( isset( $_GET['code'] ) ) {

			// Successful authentication.
			wp_safe_redirect( esc_url_raw( add_query_arg( 'msg', 'success', $redirect_url ) ) );
			exit;
		} elseif ( isset( $_GET['error'] ) ) {

			// Unable to authenticate.
			wp_safe_redirect( esc_url_raw( $redirect_url ) );
			exit;
		}

		echo 'Test';
	}
}

// Initialize the class.
Auth::instance();
