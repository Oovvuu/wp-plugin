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

		// General admin notice.
		add_action( 'admin_notices', [ $this, 'show_admin_notices' ] );

		// Authentication admin notice.
		add_action( 'admin_notices', [ $this, 'authentication_admin_notice' ] );

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
			$this->client_id,
			$this->client_secret,
			null,
			'offline_access'
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
	 * Shows admin notices based on authentication status.
	 *
	 * @since 1.0.0
	 */
	public function authentication_admin_notice() {
		// Check for oovvuu specific messages.
		if ( ! isset( $_GET['oovvuu-notice'] ) ) {
			return;
		}

		// Empty data.
		if ( empty( $_GET['message'] ) || empty( $_GET['type'] ) ) {
			return;
		}

		$message = sanitize_text_field( wp_unslash( $_GET['message'] ?? '' ) );
		$type = sanitize_text_field( wp_unslash( $_GET['type'] ?? '' ) );

		?>
		<div class="notice notice-<?php echo esc_attr( $type ); ?>">
			<p>
				<?php
				echo wp_kses_post( $message );
				?>
			</p>
		</div>
		<?php
	}

	/**
	 * Redirect callback URL for the Auth0 app to perform the authentication handshake.
	 *
	 * @since 1.0.0
	 */
	public function oovvuu_auth0_redirect_callback() {
		// Logout.
		if ( isset( $_GET['logout'] ) ) {
			$this->delete_user_token( get_current_user_id() );
		}

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
		$token = $this->get_user_token_with_refresh( $current_user_id );

		// Determine if the user is authenticated.
		$is_authenticated = $this->is_token_valid( $token );

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
	 * Gets a user token from a user ID and attempts to refresh the token if the
	 * current access token is expired.
	 *
	 * @since 1.0.0
	 *
	 * @param int  $user_id User ID.
	 * @param bool $force Force a refresh.
	 * @return mixed The user token.
	 */
	public function get_user_token_with_refresh( $user_id, $force = false ) {
		// No current user.
		if ( empty( $user_id ) ) {
			return false;
		}

		// Get the current token.
		$current_token = $this->get_user_token( $user_id );

		// Attempt to refresh the token if the current token has expired.
		if (
			$force
			|| (
				$this->is_token_valid( $current_token )
				&& $this->is_token_expired( $current_token )
			)
		) {
			$new_token = $this->refresh_token( $current_token['refresh_token'] ?? '' );

			// Return the refreshed token.
			if ( $this->is_token_valid( $new_token ) ) {
				return $new_token;
			} else {

				// Delete the token if the refresh has failed.
				$this->delete_user_token( $user_id );

				// Log last error message.
				update_user_meta( $user_id, 'oovvuu_auth0_refresh_last_error', 'Invalid token: ' . wp_json_encode( $new_token ) );

				return null;
			}
		}

		// Return existing token.
		return $current_token;
	}

	/**
	 * Validates a token.
	 *
	 * @since 1.0.0
	 *
	 * @param string $token The Auth0 token.
	 * @return mixed The user token.
	 */
	public function is_token_valid( $token ) {
		// No token.
		if ( empty( $token ) ) {
			return false;
		}

		// Not an array.
		if ( ! is_array( $token ) ) {
			return false;
		}

		// Not formatted properly.
		if (
			empty( $token['access_token'] )
			|| empty( $token['refresh_token'] )
			|| empty( $token['expires_in'] )
			|| empty( $token['added_at'] )
		) {
			return false;
		}

		// Valid token.
		return true;
	}

	/**
	 * Checks if a token has expired.
	 *
	 * @since 1.0.0
	 *
	 * @param string $token The Auth0 token.
	 * @return mixed The user token.
	 */
	public function is_token_expired( $token ) {
		// Invalid expiration values.
		if (
			0 === absint( $token['expires_in'] ?? 0 )
			|| 0 === absint( $token['added_at'] ?? 0 )
		) {
			return true;
		}

		// Token has expired.
		if ( $token['added_at'] + $token['expires_in'] < time() ) {
			return true;
		}

		// Token still valid.
		return false;
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
			return;
		}

		// Invalid token.
		if ( empty( $token ) || ! is_array( $token ) ) {
			return;
		}

		// Set metadata about the token.
		$token['added_at'] = time();

		// Set the token.
		update_user_meta( $user_id, 'oovvuu_auth0_token', $token );

		return $token;
	}

	/**
	 * Delete a user token.
	 *
	 * @since 1.0.0
	 *
	 * @param int $user_id User ID.
	 */
	public function delete_user_token( $user_id ) {
		// No current user.
		if ( empty( $user_id ) ) {
			return;
		}

		// Set the token.
		delete_user_meta( $user_id, 'oovvuu_auth0_token' );

		// Log when token was deleted.
		update_user_meta( $user_id, 'oovvuu_auth0_token_last_deleted_at', time() );
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

		$current_user_id = get_current_user_id();

		// No current user.
		if ( empty( $current_user_id ) ) {
			return;
		}

		try {
			// Perform the exchange.
			$token = $authentication_client->code_exchange( $code, $this->get_redirect_callback() );

			// Ensure we have a valid token.
			if (
				! empty( $token['access_token'] )
				&& ! empty( $token['refresh_token'] )
			) {
				$this->set_user_token( $current_user_id, $token );

				// Redirect back to the user profile page.
				$this->redirect_to_user_profile(
					[
						'oovvuu-notice' => true,
						'message'       => __( 'Success! You are connected to the Oovvuu API.', 'oovvuu' ),
						'type'          => 'success',
					]
				);
			}
		} catch ( \Exception $exception ) {
			if ( \method_exists( $exception, 'getMessage' ) ) {
				$this->set_admin_notice( 'error', __( 'Oovvuu: Unable to create Auth0 connection. Failed with error: ', 'oovvuu' ) . '<code>' . $exception->getMessage() . '</code>' );
			}
		}

		// Redirect back to the user profile page.
		$this->redirect_to_user_profile();
	}

	/**
	 * Refreshes an access token.
	 *
	 * @since 1.0.0
	 *
	 * @param array $refresh_token The existing refresh token.
	 * @return mixed Valid new token or null if error.
	 */
	public function refresh_token( $refresh_token ) {
		// Bail if token is not valid.
		if ( empty( $refresh_token ) ) {
			return null;
		}

		$authentication_client = $this->get_authentication_client();

		// Invalid client.
		if ( empty( $authentication_client ) ) {
			return null;
		}

		$current_user_id = get_current_user_id();

		// No current user.
		if ( empty( $current_user_id ) ) {
			return null;
		}

		try {
			// Perform the refresh.
			$new_token = $authentication_client->refresh_token(
				$refresh_token,
				[
					'redirect_url' => $this->get_redirect_callback(),
					'scope'        => 'offline_access',
				]
			);

			// Ensure we have a valid token.
			if (
				! empty( $new_token['access_token'] )
				&& ! empty( $new_token['refresh_token'] )
			) {
				return $this->set_user_token( $current_user_id, $new_token );
			} else {
				// Log last error message.
				update_user_meta( $current_user_id, 'oovvuu_auth0_refresh_last_error', 'Invalid token format: ' . wp_json_encode( $new_token ) );
			}
		} catch ( \Exception $exception ) {
			// Log last error message.
			update_user_meta( $current_user_id, 'oovvuu_auth0_refresh_last_error', $exception->getMessage() );

			return new \WP_Error( 'error', __( 'Oovvuu: Unable to refresh access token with error: ', 'oovvuu' ) . $exception->getMessage() );
		}

		return null;
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
	 *
	 * @param array $query_args Query args to be added to the profile page URL.
	 */
	public function redirect_to_user_profile( $query_args = [] ) {
		$url = $this->get_profile_url();

		if ( ! empty( $query_args ) && is_array( $query_args ) ) {
			$url = add_query_arg( $query_args, $url );
		}

		// Redirect.
		wp_safe_redirect( esc_url_raw( $url ) );
		exit;
	}
}

// Initialize the class.
Auth::instance();
