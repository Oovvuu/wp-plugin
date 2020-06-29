<?php
/**
 * Contains functions for displaying a hero embed from a specific post.
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

	// Get the embed ID.
	$embed_id = get_embed_id( 'hero', $post_id );

	// Has hero embed.
	if ( ! empty( $embed_id ) ) {
		return true;
	}

	return false;
}

/**
 * Gets the Hero embed HTML given an embed ID.
 *
 * @since 1.0.0
 *
 * @param string $embed_id The embed ID.
 * @return string The HTML for the embed.
 */
function get_hero_embed_html( $embed_id ) {
	$html = '<script>!function(e,t,o){let n;const r=e.getElementsByTagName("script")[0];e.getElementById(o)||(n=e.createElement("script"),n.id=o,n.onload=()=>{},n.src="https://playback.prod.oovvuu.io/player/bundle.js",r.parentNode.insertBefore(n,r))}(document,0,"oovvuu-player-sdk");</script>' .
		'<div data-oovvuu-embed="' . esc_attr( $embed_id ) . '"></div>';

	/**
	 * Filters the hero embed HTML.
	 *
	 * @since 1.0.0
	 *
	 * @param string $html     The hero embed HTMl.
	 * @param string $embed_id The Oovvuu embed ID.
	 */
	return apply_filters( 'oovvuu_hero_embed_html', $html, $embed_id );
}

/**
 * Gets the Hero embed HTML given an embed ID.
 *
 * @since 1.0.0
 *
 * @param string $embed_id The embed ID.
 */
function the_hero_embed_html( $embed_id ) {
	// Escaped in the get_hero_embed_html function.
	echo get_hero_embed_html( $embed_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
	$embed_id = get_embed_id( 'hero', $post_id );

	// No hero embed.
	if ( empty( $embed_id ) ) {
		return '';
	}

	// Set the attributes varaible for use in the template part.
	$attributes       = [];
	$attributes['id'] = $embed_id;

	// Get the HTML.
	$html = get_hero_embed_html( $attributes['id'] );

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
