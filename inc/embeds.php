<?php
/**
 * Contains functions for displaying an embed from a specific post.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Determine if this post has a hero embed.
 *
 * @since 1.0.0
 *
 * @param int $post_id The post ID.
 * @return boolean True of the post as an Oovvuu hero embed, otherwise false.
 */
function has_hero_embed( $post_id = 0 ) {
	// No post ID.
	if ( empty( $post_id ) ) {
		$post_id = get_the_ID();
	}

	$post = get_post( $post_id );

	// Invalid post.
	if ( ! ( $post instanceof \WP_Post ) ) {
		return false;
	}

	// Get the embed args.
	$embed_args = get_embed_args( 'hero', $post_id );

	// Has hero embed.
	if ( ! empty( $embed_args['id'] ) ) {
		return true;
	}

	return false;
}

/**
 * Gets the Hero embed HTML given an embed ID.
 *
 * @since 1.0.0
 *
 * @param string|array $args The embed args.
 * @return string The HTML for the embed.
 */
function get_embed_html( $args ) {
	// No args.
	if ( empty( $args ) ) {
		return '';
	}

	// Backwards support for an embed ID being passed.
	if ( is_string( $args ) ) {
		$args = [
			'id' => $args,
		];
	}

	// Embed ID is required.
	if ( empty( $args['id'] ) ) {
		return '';
	}

	// Default args.
	$args = wp_parse_args(
		$args,
		[
			'frameUrl'        => 'https://playback.oovvuu.media/frame/' . $args['id'] ?? '',
			'playerScriptUrl' => 'https://playback.oovvuu.media/player/v1.js',
		]
	);

	// Create the embed HTML.
	$html = sprintf(
		'<div>
			<script type="text/javascript">!function(e,t,r){let n;if(e.getElementById(r))return;const a=e.getElementsByTagName("script")[0];n=e.createElement("script"),n.id=r,n.defer=true,n.src="%1$s",a.parentNode.insertBefore(n,a)}(document,0,"oovvuu-player-sdk");</script>
			<div data-oovvuu-embed="%2$s">
				<amp-iframe src="%3$s" width="5" height="4" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0" resizable>
					<div overflow placeholder></div>
				</amp-iframe>
			</div>
		</div>',
		$args['playerScriptUrl'],
		$args['id'],
		$args['frameUrl']
	);

	/**
	 * Filters the embed HTML.
	 *
	 * @since 1.0.0
	 *
	 * @param string $html     The embed HTML.
	 * @param string $embed_id The Oovvuu embed ID.
	 */
	return apply_filters( 'oovvuu_embed_html', $html, $args['id'] );
}

/**
 * Echos the embed HTML.
 *
 * @since 1.0.0
 *
 * @param string|array $args The embed args.
 */
function the_embed_html( $args ) {
	// Escaped in the get_embed_html function.
	echo get_embed_html( $args ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * Gets the Hero embed HTML for a specific post.
 *
 * @since 1.0.0
 *
 * @param int $post_id The post ID.
 * @return string The HTML for the embed.
 */
function get_hero_embed( $post_id ) {
	// No post ID.
	if ( empty( $post_id ) ) {
		return '';
	}

	$post = get_post( $post_id );

	// Invalid post.
	if ( ! ( $post instanceof \WP_Post ) ) {
		return '';
	}

	// Get the embed codes.
	$embed_args = get_embed_args( 'hero', $post_id );

	// No hero embed.
	if ( empty( $embed_args['id'] ) ) {
		return '';
	}

	// Get the HTML.
	$html = get_embed_html( $embed_args );

	return $html;
}

/**
 * Echos the hero embed HTML.
 *
 * @since 1.0.0
 *
 * @param int $post_id The post ID.
 */
function the_hero_embed( $post_id = 0 ) {
	if ( empty( $post_id ) ) {
		$post_id = get_the_ID();
	}

	// Escaped in the get_hero_embed function.
	echo get_hero_embed( $post_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * Filters the generic post thumbnail HTML and returns the hero embed HTML.
 *
 * @since 1.0.0
 *
 * @param string $html    The post thumbnail HTML.
 * @param int    $post_id The post ID.
 * @return string $html The post thumbnail HTML.
 */
function filters_post_thumbnail_html( $html, $post_id ) {

	// Only automatically update for singular pages.
	if ( ! is_singular( allowed_post_types() ) ) {
		return $html;
	}

	// Get the hero embed HTML.
	$hero_html = get_hero_embed( $post_id );

	// Should we override the featured image HTML.
	$override = ! empty( $hero_html ) && '1' === get_option( 'oovvuu_auto_replace_feature_image' );

	/**
	 * Filters whether of not to override the featured image HTMl automatically
	 * with the hero embed HTML.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $override Whether or not to automatically override the featured image HTML.
	 * @param int  $post_id  The post ID.
	 */
	if ( apply_filters( 'oovvuu_should_override_featured_image', $override, $post_id ) ) {
		return $hero_html;
	}

	return $html;
}
add_filter( 'post_thumbnail_html', __NAMESPACE__ . '\filters_post_thumbnail_html', 10, 2 );

/**
 * Filters the has post thumbnail check to return true if there is a hero embed
 * and it is set to display automatically.
 *
 * @since 1.0.0
 *
 * @param boolean          $has_thumbnail True if the post has a post thumbnail, otherwise false.
 * @param int|WP_Post|null $post          Post ID or WP_Post object. Default is global `$post`.
 * @return boolean $has_thumbnail True if the post has a post thumbnail, otherwise false.
 */
function filters_has_post_thumbnail( $has_thumbnail, $post ) {

	// Only automatically update for singular pages.
	if ( ! is_singular( allowed_post_types() ) ) {
		return $has_thumbnail;
	}

	$post = get_post( $post );

	// Invalid post.
	if ( ! ( $post instanceof \WP_Post ) ) {
		return $has_thumbnail;
	}

	// Get the hero embed HTML.
	$hero_html = get_hero_embed( $post->ID );

	// Should we override the featured image HTML.
	$override = ! empty( $hero_html ) && '1' === get_option( 'oovvuu_auto_replace_feature_image' );

	/**
	 * Filters whether of not to override the featured image HTMl automatically
	 * with the hero embed HTML.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $override Whether or not to automatically override the featured image HTML.
	 * @param int  $post_id  The post ID.
	 */
	if ( apply_filters( 'oovvuu_should_override_has_featured_image', $override, $post->ID ) ) {
		return true;
	}

	return $has_thumbnail;
}
add_filter( 'has_post_thumbnail', __NAMESPACE__ . '\filters_has_post_thumbnail', 10, 2 );
