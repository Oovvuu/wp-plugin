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
	 * @var \Auth0
	 */
	private $client;

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

		$this->domain    = get_option( 'oovvuu_auth0_domain', '' );
		$this->client_id = get_option( 'oovvuu_auth0_client_id', '' );

		// Create the client.
		$this->client = $this->get_client();
	}

	/**
	 * Get the Auth0 client to connect with the API.
	 *
	 * @since 1.0.0
	 *
	 * @return \Auth0\SDK\Auth0|null The proper Auth0 object or null.
	 */
	public function get_client() {
		// Auth0 call not found.
		if ( ! class_exists( '\Auth0\SDK\Auth0' ) ) {
			return null;
		}

		// Client is already created.
		if ( $this->client instanceof \Auth0\SDK\Auth0 ) {
			return $this->client;
		}

		try {
			$client_args = [
				'domain'        => $this->domain,
				'client_id'     => $this->client_id,
				// 'client_secret' => get_option( 'oovvuu_auth0_client_secret', '' ),
				'redirect_uri'  => $this->get_redirect_callback(),
			];

			/**
			 * Filters the client args to create the Auth0 object.
			 *
			 * @since 1.0.0
			 *
			 * @param array $client_args The arguments passed to the Auth0 object.
			 */
			$this->client = new \Auth0\SDK\Auth0( apply_filters( 'oovvuu_auth0_client_args', $client_args ) );
		} catch ( \Exception $exception ) {
			$this->client = null;

			if ( \method_exists( $exception, 'getMessage' ) ) {
				$this->admin_notice_state   = 'error';
				$this->admin_notice_message = __( 'Oovvuu: Unable to create Auth0 connection. Failed with error: ', 'oovvuu' ) . '<code>' . $exception->getMessage() . '</code>';
			}
		}

		return $this->client;
	}

	/**
	 * Shows admin notices if class properties are set.
	 *
	 * @since 1.0.0
	 */
	public function show_admin_notices() {
		if ( empty( $this->admin_notice_state ) || empty( $this->admin_notice_message ) ) {
			return;
		}

		?>
		<div class="notice notice-<?php echo esc_attr( $this->admin_notice_state ); ?>">
			<p>
				<?php
				echo wp_kses_post( $this->admin_notice_message );
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

	/**
	 * Checks if the current WP user is authenticated with the Oovvuu Auth0 app.
	 *
	 * @since 1.0.0
	 *
	 * @return boolean Whether or not the user is authenticated.
	 */
	public function is_user_authenticated() {
		$token = get_user_meta( get_current_user_id(), 'oovvuu_auth0_token', true );

		return ! empty( $token );
	}

	/**
	 * Returns the authorization link.
	 *
	 * @since 1.0.0
	 *
	 * @return string The authorization link.
	 */
	public function get_auth_link() {
		$client = $this->get_client();

		// Invalid client.
		if ( empty( $client ) ) {
			return '';
		}

		$authentication = new \Auth0\SDK\API\Authentication(
			$this->domain,
			$this->client_id
		);

		return $authentication->get_authorize_link(
			'code',
			$this->get_redirect_callback()
		);
	}

	/**
	 * Returns the redirect callback URL.
	 *
	 * @return string The redirect callback.
	 */
	public function get_redirect_callback() {
		return admin_url( '/admin-post.php?action=' . $this->redirect_callback_action );
	}
}

// Initialize the class.
Auth::instance();
