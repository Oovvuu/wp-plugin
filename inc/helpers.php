<?php
/**
 * Contains helper functions used across the plugin.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Gets the embed ID for a given position.
 *
 * @since 1.0.0
 *
 * @param string $position The position key.
 * @param int    $post_id The post ID.
 * @return null|string The embed id string, otherwise null.
 */
function get_embed_id( $position, $post_id = 0 ) {
	$valid_positions = get_valid_positions();

	// Invalid position.
	if ( ! array_key_exists( $position, $valid_positions ) ) {
		return null;
	}

	// No post ID.
	if ( empty( $post_id ) ) {
		$post_id = get_the_ID();
	}

	$post = get_post( $post_id );

	// Invalid post.
	if ( ! ( $post instanceof \WP_Post ) ) {
		return null;
	}

	// Get the embed codes.
	$embeds = get_post_meta( $post->ID, 'oovvuu_embeds', true );

	// Short circuit if a sidebar hero is active.
	if ( 'hero' === $position && ! empty( $embeds['sidebarHero']['id'] ) ) {
		return (string) $embeds['sidebarHero']['id'];
	}

	// Position is not enabled.
	if ( ! is_position_enabled( $position, $post->ID ) ) {
		return null;
	}

	// Has hero embed.
	if ( ! empty( $embeds[ $position ]['id'] ) ) {
		return (string) $embeds[ $position ]['id'];
	}

	return null;
}

/**
 * Checks if a position is enabled.
 *
 * @since 1.0.0
 *
 * @param string $position The position key.
 * @param int    $post_id The post ID.
 * @return boolean True if the position is enabled, otherwise false.
 */
function is_position_enabled( $position, $post_id = 0 ) {
	$valid_positions = get_valid_positions();

	// Invalid position.
	if ( ! array_key_exists( $position, $valid_positions ) ) {
		return false;
	}

	// No post ID.
	if ( empty( $post_id ) ) {
		$post_id = get_the_ID();
	}

	$post = get_post( $post_id );

	// Invalid post.
	if ( ! ( $post instanceof \WP_Post ) ) {
		return false;
	}

	// Get the state.
	$state = get_post_meta( $post->ID, 'oovvuu_state', true );

	// Position is enabled.
	if (
		! empty( $state[ 'is' . ucfirst( $position ) . 'Enabled' ] )
		&& true === $state[ 'is' . ucfirst( $position ) . 'Enabled' ]
	) {
		return true;
	}

	return false;
}

/**
 * Gets an array of valid positions and their relevant meta data.
 *
 * @since 1.0.0
 *
 * @return array The valid positions.
 */
function get_valid_positions() {
	return [
		'hero'        => [
			'type'           => 'Single',
			'embed_location' => 'Hero',
		],
		'positionTwo' => [
			'type'           => 'OneByThree',
			'embed_location' => 'ParagraphFour',
		],
	];
}

/**
 * A helper function for loading partials.
 *
 * @param string $scope Where to load the partial from (admin or public).
 * @param string $slug The partial filepath to the partial template.
 *
 * @since 1.0.0
 * @access public
 */
function load_admin_partial( $scope, $slug ) {

	// Ensure requested partial exists.
	$filepath = OOVVUU_PATH . '/admin/partials/' . $slug . '.php';
	if ( ! file_exists( $filepath ) ) {
		return;
	}

	require $filepath; //phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
}
