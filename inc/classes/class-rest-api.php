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
	private $endpoint = 'https://api.oovvuu.media/v1/graphql/';

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
		// User Authentication.
		register_rest_route(
			$this->namespace,
			'/userAuthenticated',
			[
				'methods'             => \WP_REST_Server::READABLE,
				// Authentication logic happening in permission callback, so this can return true if callback is needed.
				'callback'            => '__return_true',
				'permission_callback' => [ $this, 'permission_callback' ],
			]
		);

		// Keywords.
		register_rest_route(
			$this->namespace,
			'/keywords',
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_keywords' ],
				'permission_callback' => [ $this, 'permission_callback' ],
				'args'                => [
					'title'   => [
						'sanitize_callback' => function( $value ) {
							return REST_API::instance()->sanitize_html_for_api( $value );
						},
					],
					'content' => [
						'sanitize_callback' => function( $value ) {
							return REST_API::instance()->sanitize_html_for_api( $value );
						},
					],
				],
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
				'args'                => [
					'title'   => [
						'sanitize_callback' => function( $value ) {
							return REST_API::instance()->sanitize_html_for_api( $value );
						},
					],
					'content' => [
						'sanitize_callback' => function( $value ) {
							return REST_API::instance()->sanitize_html_for_api( $value );
						},
					],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/latestVideos',
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_latest_videos' ],
				'permission_callback' => [ $this, 'permission_callback' ],
			]
		);

		// Save state.
		register_rest_route(
			$this->namespace,
			'/saveState',
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'save_state' ],
				'permission_callback' => [ $this, 'permission_callback' ],
				'args'                => [
					'id' => [
						'sanitize_callback' => function( $value, $request, $param ) {
							return absint( $value );
						},
					],
				],
			]
		);

		// Get state.
		register_rest_route(
			$this->namespace,
			'/getState',
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_state' ],
				'permission_callback' => [ $this, 'permission_callback' ],
				'args'                => [
					'id' => [
						'sanitize_callback' => function( $value, $request, $param ) {
							return absint( $value );
						},
					],
				],
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
				'query ($input: ArticleRecommendationInput, $playbackInput: PlaybackInput!) {
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
						alternateSearches {
							approximateTotalCount
							filter {
								...VideoFilterFragment
							}
							previewImage(input: { height: 100, width: 100 }) {
								url
							}
						}
					}
				}' .

				$this->get_graphql_video_fragment() .

				'fragment VideoFilterFragment on VideoFilterOutputType {
					keywordMatch
					genre
					publishedAt {
						gte
					}
				}',
				[
					'articleTitle' => $request['title'] ?? '',
					'articleBody'  => $request['content'] ?? '',
					'filter'       => [
						'keywordMatch' => $request['keywords'] ?? [],
					],
				],
				$request['id'] ?? 0,
				[
					'playbackInput' => [
						'domain' => wp_parse_url( admin_url(), PHP_URL_HOST ),
					],
				]
			)
		);
	}

	/**
	 * Gets latest videos.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The rest response object.
	 */
	public function get_latest_videos( $request ) {
		return rest_ensure_response(
			$this->request(
				'query ($input: VideoSetInput!, $playbackInput: PlaybackInput! ) {
					videoSet (input: $input) {
						totalCount
						pageResults {
							...VideoDetailFragment
						}
						cursor
						hasMorePages
					}
				}' . $this->get_graphql_video_fragment(),
				[
					'filter' => (object) [
						'keywordMatch' => $request['keywords'] ?? [],
						'status' => [
							'Active',
						],
					],
					'sort'   => [
						(object) [
							'sort'      => 'id',
							'ascending' => false,
						],
					],
					'limit'  => 25,
				],
				$request['id'] ?? 0,
				[
					'playbackInput' => [
						'domain' => wp_parse_url( admin_url(), PHP_URL_HOST ),
					],
				]
			)
		);
	}

	/**
	 * Gets the GraphQL Video Fragment.
	 *
	 * @since 1.0.0
	 */
	public function get_graphql_video_fragment() {
		return 'fragment VideoDetailFragment on Video {
			id
			title
			description
			summary
			tags
			thumbnail(input: { width: 500, height: 281 }) {
				url
			}
			preview (input: $playbackInput) {
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
		}';
	}

	/**
	 * Save the keywords and videos state.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The rest response object.
	 */
	public function save_state( $request ) {

		// Get valid positions.
		$valid_positions = get_valid_positions();

		// Get the post ID.
		$post_id = absint( $request['id'] );

		// Sanitize the state.
		$state = $this->sanitize_state( $request['state'] );

		// Save the state to post meta.
		update_post_meta( $post_id, 'oovvuu_state', $state );

		// Create the embeds from modal positions.
		$embeds = [];
		foreach ( $valid_positions as $position => $data ) {

			// Position is empty.
			if ( empty( $state['selectedVideos'][ $position ] ) ) {
				continue;
			}

			// Create the embed.
			$response = $this->create_embed(
				[
					'user_id'        => $this->get_publisher_id( get_current_user_id() ),
					'video_ids'      => $state['selectedVideos'][ $position ],
					'type'           => $data['type'],
					'keywords'       => $state['selectedKeywords'],
					'post_id'        => $post_id,
					'embed_location' => $data['embed_location'],
				]
			);

			$embed = [];

			// Valid response.
			if ( ! empty( $response['data'] ) ) {
				$embed = [
					'raw_response' => $response['data'],
					'id'           => $response['data']['createEmbed']['id'] ?? '',
				];
			}

			// Add the embed.
			$embeds[ $position ] = $embed;
		}

		// Create embeds from the sidebar hero.
		if (
			! empty( $valid_positions['hero'] )
			&& ! empty( $state['sidebarSelectedHeroVideo']->id )
		) {
			// Create the embed.
			$response = $this->create_embed(
				[
					'user_id'        => $this->get_publisher_id( get_current_user_id() ),
					'video_ids'      => [ (array) $state['sidebarSelectedHeroVideo'] ],
					'type'           => $valid_positions['hero']['type'],
					'keywords'       => [],
					'post_id'        => $post_id,
					'embed_location' => $valid_positions['hero']['embed_location'],
				]
			);

			$embed = [];

			// Valid response.
			if ( ! empty( $response['data'] ) ) {
				$embed = [
					'raw_response' => $response['data'],
					'id'           => $response['data']['createEmbed']['id'] ?? '',
				];
			}

			// Add the embed.
			$embeds['sidebarHero'] = $embed;
		}

		// Save embeds.
		update_post_meta( $post_id, 'oovvuu_embeds', $embeds );

		return rest_ensure_response(
			[
				'success' => true,
				'embeds'  => $embeds,
				'state'   => $state,
			]
		);
	}

	/**
	 * Sanitize the state passed from the REST API call.
	 *
	 * @since 1.0.0
	 *
	 * @param  array $state The raw state.
	 * @return array $state The sanitized state.
	 */
	public function sanitize_state( $state ) {
		$state = array_merge(
			$state,
			[ 'isLoadedFromMeta' => true ]
		);

		// Cast elements to object type as needed.
		$state['sidebarSelectedHeroVideo'] = (object) $state['sidebarSelectedHeroVideo'];

		return $state;
	}

	/**
	 * Get the keywords and videos state.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The rest response object.
	 */
	public function get_state( $request ) {
		$state  = get_post_meta( $request['id'], 'oovvuu_state', true );
		$embeds = get_post_meta( $request['id'], 'oovvuu_embeds', true );

		return rest_ensure_response(
			[
				'success' => ! empty( $state ),
				'state'   => $state,
				'embeds'   => ! empty( $embeds ) ? (object) $embeds : (object) [],
			]
		);
	}

	/**
	 * Creates a brightcove video embed given a set of videos and a position.
	 *
	 * @since 1.0.0
	 *
	 * @param  array $payload {
	 *     The payload data.
	 *
	 *     @type string $user_id        The current Oovvuu publisher ID.
	 *     @type array  $video_ids      The array of videos ids.
	 *     @type string $type           The player type (Single|OneByThree)
	 *     @type array  $keywords       The keywords used to get the videos.
	 *     @type string $post_id        The current post ID.
	 *     @type string $embed_location The embed location (Hero|PositionTwo)
	 * }
	 * @return mixed The HTTP response body or a WP_Error object.
	 */
	public function create_embed( $payload = [] ) {
		return $this->request(
			'mutation CreateEmbed($input: CreateEmbedInput!) {
				createEmbed(input: $input) {
					id
					snippet
				}
			}',
			[
				'userId'   => (string) $payload['user_id'] ?? '0',
				'videoIds' => array_values(
					array_filter(
						array_map(
							function ( $video ) {
								return $video['id'] ?? null;
							},
							(array) $payload['video_ids'] ?? []
						)
					)
				),
				'metadata' => [
					'type'     => $payload['type'] ?? 'Single',
					'keywords' => $payload['keywords'] ?? [],
					'article'  => [
						'publisherId'   => (string) $payload['user_id'] ?? '0',
						'cmsArticleId'  => (string) $payload['post_id'] ?? '0',
						'embedLocation' => (string) $payload['embed_location'] ?? 'Hero',
						'masthead'      => (string) wp_parse_url( home_url(), PHP_URL_HOST ),
					],
				],
			],
			$payload['post_id'] ?? 0,
			[],
			true
		);
	}

	/**
	 * Gets the current user from the Oovvuu API.
	 *
	 * @since 1.0.0
	 *
	 * @return mixed The response body or WP_Error
	 */
	public function get_current_user() {
		return $this->request(
			'query{
				currentUser {
					id
					primaryVideoCollection {
						id
					}
				}
			}',
			false,
			0
		);
	}

	/**
	 * Gets the current user from the Oovvuu API.
	 *
	 * @since 1.0.0
	 *
	 * @param int $oovvuu_user_id The Oovvuu user ID.
	 * @return mixed The response body or WP_Error
	 */
	public function get_current_user_org( $oovvuu_user_id ) {
		return $this->request(
			'query {
				user(id: "' . (string) $oovvuu_user_id . '") {
					id
					ownerOrganisation {
						id
					}
				}
			}',
			false,
			0
		);
	}

	/**
	 * Gets the user Oovvuu publisher ID.
	 *
	 * @since 1.0.0
	 *
	 * @param  int $user_id WP user ID.
	 * @return int The Oovvuu user publisher ID.
	 */
	public function get_publisher_id( $user_id ) {
		$publisher_id = get_user_meta( $user_id, 'oovvuu_auth0_publisher_id', true );

		// Publisher ID already set.
		if ( ! empty( $publisher_id ) ) {
			return $publisher_id;
		}

		// Get the current Oovvuu user ID.
		$oovvuu_user_id = $this->get_current_user();

		// Invalid Oovvuu current user ID.
		if ( is_wp_error( $oovvuu_user_id ) || empty( $oovvuu_user_id['data']['currentUser']['id'] ) ) {
			return 0;
		}

		$publisher_id = $this->get_current_user_org( absint( $oovvuu_user_id['data']['currentUser']['id'] ) );

		// Invalid Oovvuu publisher ID.
		if ( is_wp_error( $publisher_id ) || empty( $publisher_id['data']['user']['ownerOrganisation']['id'] ) ) {
			return 0;
		}

		// Sanitize value.
		$publisher_id = absint( $publisher_id['data']['user']['ownerOrganisation']['id'] );

		// Save to user meta.
		update_user_meta( $user_id, 'oovvuu_auth0_publisher_id', $publisher_id );

		// Return the publisher ID.
		return $publisher_id;
	}

	/**
	 * Perform GraphQL request to the Oovvuu API.
	 *
	 * @since 1.0.0
	 *
	 * @param  string $query GraphQL query.
	 * @param  array  $input Input variables.
	 * @param  int    $post_id The current post ID relating to the request.
	 * @param  array  $variables Extra variables to be passed to the query.
	 * @param  bool   $remove_article_metadata Whether or not to remove the article metadata input.
	 * @return mixed The HTTP response body or a WP_Error object.
	 */
	public function request( $query, $input, $post_id = 0, $variables = [], $remove_article_metadata = false ) {
		$current_user_id = get_current_user_id();

		// No user.
		if ( empty( $current_user_id ) ) {
			return new \WP_Error( 'no-user', __( 'All requests must have a logged in user', 'oovvuu' ) );
		}

		// Get the user token.
		$token = Auth::instance()->get_user_token_with_refresh( $current_user_id );

		// Invalid token.
		if ( ! Auth::instance()->is_token_valid( $token ) ) {
			return new \WP_Error( 'invalid-token', __( 'Invalid token', 'oovvuu' ) );
		}

		// Create the payload.
		$payload = [
			'query' => $query,
		];

		// Add defaults if input variables are supplied.
		if ( false !== $input ) {
			$payload['variables']['input'] = wp_parse_args(
				$input,
				[
					'articleMetadata' => [
						'publisherId'  => (string) $this->get_publisher_id( $current_user_id ),
						'cmsArticleId' => (string) $post_id,
						'masthead'     => (string) wp_parse_url( home_url(), PHP_URL_HOST ),
					],
				]
			);
		}

		// Remove the default article metadata.
		if ( true === $remove_article_metadata ) {
			unset( $payload['variables']['input']['articleMetadata'] );
		}

		// Add extra variables to the query input.
		if ( ! empty( $variables ) ) {

			// Ensure we are not overridding the default input.
			unset( $variables['input'] );

			$payload['variables'] = array_merge( $payload['variables'], $variables );
		}

		// Perform the request.
		$response = wp_remote_post(
			$this->endpoint,
			[
				'headers' => [
					'Authorization' => 'Bearer ' . $token['access_token'] ?? '',
					'Content-Type'  => 'application/json',
				],
				'body'    => wp_json_encode( $payload ),
				'timeout' => 10, // phpcs:ignore WordPressVIPMinimum.Performance.RemoteRequestTimeout.timeout_timeout
			]
		);

		// Return early if WP_Error.
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Decode the response.
		return json_decode( wp_remote_retrieve_body( $response ), true );
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

	/**
	 * Sanitize the HTML for the article title and body to be sent to the API.
	 *
	 * @since 1.0.0
	 *
	 * @param string $html The raw HTML to be sent to the API.
	 * @return string $html The sanitized HTML to be sent to the API.
	 */
	public function sanitize_html_for_api( $html ) {
		// Invalid data.
		if ( empty( $html ) || ! is_string( $html ) ) {
			return '';
		}

		// Remove all HTML tags.
		$html = wp_strip_all_tags( $html, true );

		return (string) $html;
	}
}

REST_API::instance();
