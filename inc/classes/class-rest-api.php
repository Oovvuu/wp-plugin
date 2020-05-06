<?php
/**
 * Class file for handing REST API requests.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Class REST_API.
 */
class REST_API {
	use Singleton;

	/**
	 * REST API namespace.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $namespace = 'oovvuu/v1';

	/**
	 * GraphQL API Endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $endpoint = 'https://api.staging.oovvuu.io/graphql/';

	/**
	 * Setup the class instance.
	 *
	 * @since 1.0.0
	 */
	public function setup() {
		add_action( 'rest_api_init', [ $this, 'add_routes' ] );
	}

	/**
	 * Regsiter REST API routes.
	 *
	 * @since 1.0.0
	 */
	public function add_routes() {
		// Keywords.
		register_rest_route(
			$this->namespace,
			'/keywords',
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_keywords' ],
				'permission_callback' => [ $this, 'permission_callback' ],
			]
		);

		// Videos.
		register_rest_route(
			$this->namespace,
			'/videos',
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_videos' ],
				'permission_callback' => [ $this, 'permission_callback' ],
			]
		);
	}

	/**
	 * Gets keywords based on the post title and content.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The rest response object.
	 */
	public function get_keywords( $request ) {
		$current_user_id = get_current_user_id();

		// No user.
		if ( empty( $current_user_id ) ) {
			return rest_ensure_response( new \WP_Error( 'no-user', __( 'All requests must have a logged in user', 'oovvuu' ) ) );
		}

		// Get the user token.
		$token = Auth::instance()->get_user_token( $current_user_id );

		// Invalid token.
		if ( ! Auth::instance()->is_token_valid( $token ) ) {
			return rest_ensure_response( new \WP_Error( 'invalid-token', __( 'Invalid token', 'oovvuu' ) ) );
		}

		// Perform the request.
		$response = wp_remote_post(
			$this->endpoint,
			[
				'headers' => [
					'Authorization' => 'Bearer ' . $token['access_token'] ?? '',
					'Content-Type'  => 'application/json',
				],
				'body'    => wp_json_encode(
					[
						'query'     => 'query ($input: TextAnalysisInput) {
							analyseText(input: $input) {
								wordings
							}
						}',
						'variables' => [
							'input' => [
								'title' => $request['title'] ?? '',
								'body'  => $request['content'] ?? '',
							],
						],
					]
				),
			]
		);

		// Return early if WP_Error.
		if ( is_wp_error( $response ) ) {
			return rest_ensure_response( $response );
		}

		// Decode the response.
		$data = json_decode( wp_remote_retrieve_body( $response ) );

		return rest_ensure_response( $data );
	}

	/**
	 * Gets videos based on keywords.
	 *
	 * @since 1.0.0
	 *
	 * @return \WP_REST_Response The rest response object.
	 */
	public function get_videos() {
		// @TODO: Perform API call to Oovvuu to get videos.
		return rest_ensure_response( [] );
	}

	/**
	 * Permissions callback to determine if endpoint can be accessed.
	 *
	 * @since 1.0.0
	 *
	 * @return bool True or false.
	 */
	public function permission_callback() {
		return Auth::instance()->is_user_authenticated();
	}
}

REST_API::instance();
