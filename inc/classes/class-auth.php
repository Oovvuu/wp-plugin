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
	 * The Auth0 domain.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $domain;

	/**
	 * The Auth0 client ID.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $client_id;

	/**
	 * The Auth0 client.
	 *
	 * @since 1.0.0
	 *
	 * @var \Auth0\SDK\Auth0
	 */
	private $client;

	/**
	 * The Auth0 Authentication client.
	 *
	 * @since 1.0.0
	 *
	 * @var \Auth0\SDK\API\Authentication
	 */
	private $authentication_client;

	/**
	 * The admin post action used for the redirect callback.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $redirect_callback_action = 'oovvuu_auth0_redirect_callback';

	/**
	 * The admin notice state (i.e. success or error).
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $admin_notice_state;

	/**
	 * The admin notice message.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $admin_notice_message;

	/**
	 * Setup the class.
	 *
	 * @since 1.0.0
	 */
	public function setup() {
		// Redirect callback.
		add_action( 'admin_post_' . $this->redirect_callback_action, [ $this, 'oovvuu_auth0_redirect_callback' ] );

		// Admin notice.
		add_action( 'admin_notices', [ $this, 'show_admin_notices' ] );

		$this->domain        = get_option( 'oovvuu_auth0_domain', '' );
		$this->client_id     = get_option( 'oovvuu_auth0_client_id', '' );
		$this->client_secret = get_option( 'oovvuu_auth0_client_secret', '' );
	}

	/**
	 * Get the Auth0 Authentication client to connect with the API.
	 *
	 * @since 1.0.0
	 *
	 * @return \Auth0\SDK\API\Authentication|null The proper Auth0 object or null.
	 */
	public function get_authentication_client() {
		// Authentication call not found.
		if ( ! class_exists( '\Auth0\SDK\API\Authentication' ) ) {
			return null;
		}

		// Client is already created.
		if ( $this->authentication_client instanceof \Auth0\SDK\API\Authentication ) {
			return $this->authentication_client;
		}

		$this->authentication_client = new \Auth0\SDK\API\Authentication(
			$this->domain,
			$this->client_id
		);

		return $this->authentication_client;
	}

	/**
	 * Shows admin notices if class properties are set.
	 *
	 * @since 1.0.0
	 */
	public function show_admin_notices() {
		$current_admin_notice = $this->get_admin_notice();

		if ( empty( $current_admin_notice['type'] ) || empty( $current_admin_notice['message'] ) ) {
			return;
		}

		?>
		<div class="notice notice-<?php echo esc_attr( $current_admin_notice['type'] ); ?>">
			<p>
				<?php
				echo wp_kses_post( $current_admin_notice['message'] );
				?>
			</p>
		</div>
		<?php

		// Clear the current notice.
		$this->clear_admin_notice();
	}

	/**
	 * Redirect callback URL for the Auth0 app to perform the authentication handshake.
	 *
	 * @since 1.0.0
	 */
	public function oovvuu_auth0_redirect_callback() {
		// Authorization code was found.
		if ( isset( $_GET['code'] ) ) {

			// Perform the code exchange for an access token.
			$this->code_exchange( sanitize_text_field( wp_unslash( $_GET['code'] ) ) );
		}

		// Redirect back to the user profile page.
		$this->redirect_to_user_profile();
	}

	/**
	 * Checks if the current WP user is authenticated with the Oovvuu Auth0 app.
	 *
	 * @since 1.0.0
	 *
	 * @return boolean Whether or not the user is authenticated.
	 */
	public function is_user_authenticated() {
		$current_user_id = get_current_user_id();

		// No current user.
		if ( empty( $current_user_id ) ) {
			return false;
		}

		// Get the access token from a user.
		$token = $this->get_user_token( $current_user_id );

		// Determine if the user is authenticated.
		$is_authenticated = ! empty( $token );

		/**
		 * Filters whether or not a user is authenticated with Oovvuu.
		 *
		 * @since 1.0.0
		 *
		 * @param bool $is_authenticated True or false.
		 * @param int  $current_user_id  The current user ID.
		 */
		return apply_filters( 'oovvuu_auth0_is_user_authenticated', (bool) $is_authenticated, $current_user_id );
	}

	/**
	 * Gets a user token from a user ID.
	 *
	 * @since 1.0.0
	 *
	 * @param int $user_id User ID.
	 * @return mixed The user token.
	 */
	public function get_user_token( $user_id ) {
		// No current user.
		if ( empty( $user_id ) ) {
			return false;
		}

		// Get the access token from a user.
		return get_user_meta( $user_id, 'oovvuu_auth0_token', true );
	}

	/**
	 * Sets a user token.
	 *
	 * @since 1.0.0
	 *
	 * @param int    $user_id User ID.
	 * @param string $token   The user token.
	 */
	public function set_user_token( $user_id, $token ) {
		// No current user.
		if ( empty( $user_id ) ) {
			return false;
		}

		// Get the access token from a user.
		return update_user_meta( $user_id, 'oovvuu_auth0_token', $token );
	}

	/**
	 * Returns the authorization link.
	 *
	 * @since 1.0.0
	 *
	 * @return string The authorization link.
	 */
	public function get_auth_link() {
		$authentication_client = $this->get_authentication_client();

		// Invalid client.
		if ( empty( $authentication_client ) ) {
			return '';
		}

		// Create the authorization link.
		return $authentication_client->get_authorize_link(
			'code',
			$this->get_redirect_callback()
		);
	}

	/**
	 * Performs a request to get an access token via an authorization code.
	 *
	 * @since 1.0.0
	 *
	 * @param string $code Authorization code.
	 */
	public function code_exchange( $code ) {
		// Invalid code.
		if ( empty( $code ) || ! is_string( $code ) ) {
			return;
		}

		$authentication_client = $this->get_authentication_client();

		// Invalid client.
		if ( empty( $authentication_client ) ) {
			return;
		}

		try {
			// Perform the exchange.
			$authentication_client->code_exchange( $code, $this->get_redirect_callback() );
		} catch ( \Exception $exception ) {
			if ( \method_exists( $exception, 'getMessage' ) ) {
				$this->set_admin_notice( 'error', __( 'Oovvuu: Unable to create Auth0 connection. Failed with error: ', 'oovvuu' ) . '<code>' . $exception->getMessage() . '</code>' );
			}
		}

		// Redirect back to the user profile page.
		$this->redirect_to_user_profile();
	}

	/**
	 * Set admin notices.
	 *
	 * @since 1.0.0
	 *
	 * @param string $type    The notice type (error, success).
	 * @param string $message The notice message.
	 */
	public function set_admin_notice( $type, $message ) {
		update_option( 'oovvuu_auth0_admin_notice_type', $type );
		update_option( 'oovvuu_auth0_admin_notice_message', $message );
	}

	/**
	 * Get the current admin notice.
	 *
	 * @since 1.0.0
	 *
	 * @return array The admin notice properties.
	 */
	public function get_admin_notice() {
		return [
			'type'    => get_option( 'oovvuu_auth0_admin_notice_type' ),
			'message' => get_option( 'oovvuu_auth0_admin_notice_message' ),
		];
	}

	/**
	 * Clear the current admin notice.
	 *
	 * @since 1.0.0
	 */
	public function clear_admin_notice() {
		delete_option( 'oovvuu_auth0_admin_notice_type' );
		delete_option( 'oovvuu_auth0_admin_notice_message' );
	}

	/**
	 * Returns the redirect callback URL.
	 *
	 * @since 1.0.0
	 *
	 * @return string The redirect callback.
	 */
	public function get_redirect_callback() {
		return admin_url( '/admin-post.php?action=' . $this->redirect_callback_action );
	}

	/**
	 * Returns the user profile URL.
	 *
	 * @since 1.0.0
	 *
	 * @return string The redirect callback.
	 */
	public function get_profile_url() {
		return admin_url( '/profile.php' );
	}

	/**
	 * Redirects a user back to their profile page.
	 *
	 * @since 1.0.0
	 */
	public function redirect_to_user_profile() {
		wp_safe_redirect( esc_url_raw( $this->get_profile_url() ) );
		exit;
	}
}

// Initialize the class.
Auth::instance();
