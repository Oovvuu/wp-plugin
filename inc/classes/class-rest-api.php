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
				'methods'             => \WP_REST_Server::READABLE,
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
	 * @return \WP_REST_Response The rest response object.
	 */
	public function get_keywords() {
		// @TODO: Perform API call to Oovvuu to get keywords.
		return rest_ensure_response( [] );
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
