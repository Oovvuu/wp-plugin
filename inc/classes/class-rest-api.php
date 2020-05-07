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
				'methods'             => \WP_REST_Server::CREATABLE,
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
		return rest_ensure_response(
			$this->request(
				'query ($input: TextAnalysisInput) {
					analyseText(input: $input) {
						wordings
					}
				}',
				[
					'title' => $request['title'] ?? '',
					'body'  => $request['content'] ?? '',
				],
				$request['id'] ?? 0
			)
		);
	}

	/**
	 * Gets videos based on keywords.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The rest response object.
	 */
	public function get_videos( $request ) {
		return rest_ensure_response(
			$this->request(
				'query ($input: ArticleRecommendationInput) {
					videosForArticle(input: $input) {
						hero {
							...VideoDetailFragment
						}
						heroSecondary {
							...VideoDetailFragment
						}
						heroEmptyReason
						positionTwo {
							...VideoDetailFragment
						}
						positionTwoSecondary {
							...VideoDetailFragment
						}
						positionTwoEmptyReason
					}
				}

				fragment VideoDetailFragment on Video {
					id
					title
					description
					tags
					thumbnail(input: { width: 500, height: 281 }) {
						url
					}
					preview {
						brightcoveVideoId
						brightcovePlayerId
						brightcoveAccountId
					}
					collection {
						id
						provider {
							id
							name
							legalName
							logo(input: { width: 100, height: 100 }) {
								url
							}
						}
					}
					genres
					duration
					created
					modified
					activeSince
					providerAssetId
				}',
				[
					'articleTitle' => $request['title'] ?? '',
					'articleBody'  => $request['content'] ?? '',
					'filter'       => [
						'keywordMatch' => $request['keywords'] ?? [],
					],
				],
				$request['id'] ?? 0
			)
		);
	}

	/**
	 * Perform GraphQL request to the Oovvuu API.
	 *
	 * @since 1.0.0
	 *
	 * @param  string $query GraphQL query.
	 * @param  array  $input Input variables.
	 * @param  int    $post_id The current post ID relating to the request.
	 * @return mixed The HTTP response body or a WP_Error object.
	 */
	public function request( $query, $input, $post_id = 0 ) {
		$current_user_id = get_current_user_id();

		// No user.
		if ( empty( $current_user_id ) ) {
			return new \WP_Error( 'no-user', __( 'All requests must have a logged in user', 'oovvuu' ) );
		}

		// Get the user token.
		$token = Auth::instance()->get_user_token( $current_user_id );

		// Invalid token.
		if ( ! Auth::instance()->is_token_valid( $token ) ) {
			return new \WP_Error( 'invalid-token', __( 'Invalid token', 'oovvuu' ) );
		}

		$input = wp_parse_args(
			$input,
			[
				'articleMetadata' => [
					'publisherId'  => (string) 0,
					'cmsArticleId' => (string) $post_id,
					'masthead'     => (string) wp_parse_url( home_url(), PHP_URL_HOST ),
				],
			]
		);

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
						'query'     => $query,
						'variables' => [
							'input' => $input,
						],
					]
				),
			]
		);

		// Return early if WP_Error.
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Decode the response.
		return json_decode( wp_remote_retrieve_body( $response ) );
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
