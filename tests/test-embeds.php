<?php
/**
 * Tests the embeds file.
 *
 * @package Oovvuu
 */

class Embeds_Test extends WP_UnitTestCase {

	/**
	 * Tests if post has hero embed.
	 */
	public function test_has_hero_embed() {
		$post_id = self::factory()->post->create();

		// No hero embed.
		$this->assertFalse( \Oovvuu\has_hero_embed( $post_id ) );

		// Add the hero embed.
		update_post_meta( $post_id, 'oovvuu_state', [ 'isHeroEnabled' => true ] );
		update_post_meta( $post_id, 'oovvuu_embeds', [ 'hero' => [ 'id' => '1234' ] ] );

		// Has hero embed.
		$this->assertTrue( \Oovvuu\has_hero_embed( $post_id ) );

		// Check if invalid post ID.
		$this->assertFalse( \Oovvuu\has_hero_embed( 0 ) );
	}

	/**
	 * Tests getting a post hero embed.
	 */
	public function test_get_hero_embed() {
		$post_id = self::factory()->post->create();

		// No hero embed.
		$this->assertEmpty( \Oovvuu\get_hero_embed( $post_id ) );

		// Add the hero embed.
		update_post_meta( $post_id, 'oovvuu_state', [ 'isHeroEnabled' => true ] );
		update_post_meta( $post_id, 'oovvuu_embeds', [ 'hero' => [ 'id' => '1234' ] ] );

		// Has hero embed.
		$this->assertNotEmpty( \Oovvuu\get_hero_embed( $post_id ) );

		// Check if invalid post ID.
		$this->assertEmpty( \Oovvuu\get_hero_embed( 0 ) );
	}

	/**
	 * Tests filtering post thumbnail HTML.
	 */
	public function test_filters_post_thumbnail_html() {
		$post_id = self::factory()->post->create(
			[
				'post_type' => 'post',
				'post_status' => 'publish',
			]
		);

		// No hero embed.
		$this->assertEmpty( apply_filters( 'post_thumbnail_html', '', $post_id ) );

		// Add the hero embed.
		update_post_meta( $post_id, 'oovvuu_state', [ 'isHeroEnabled' => true ] );
		update_post_meta( $post_id, 'oovvuu_embeds', [ 'hero' => [ 'id' => '1234' ] ] );

		// Should not return HTMl until global setting is active.
		$this->assertEmpty( apply_filters( 'post_thumbnail_html', '', $post_id ) );

		// Activate global setting.
		update_option( 'oovvuu_auto_replace_feature_image', '1' );

		// Only allow overrides to happen on single pages.
		$this->assertEmpty( apply_filters( 'post_thumbnail_html', '', $post_id ) );

		// Go to post page.
		$this->go_to( get_permalink( $post_id ) );

		// Returns HTML.
		$this->assertNotEmpty( apply_filters( 'post_thumbnail_html', '', $post_id ) );

		// Check if invalid post ID.
		$this->assertEmpty( apply_filters( 'post_thumbnail_html', '', PHP_INT_MAX ) );
	}

	/**
	 * Tests filtering has post thumbnail.
	 */
	public function test_filters_has_post_thumbnail() {
		$post_id = self::factory()->post->create(
			[
				'post_type' => 'post',
				'post_status' => 'publish',
			]
		);

		// No hero embed.
		$this->assertFalse( apply_filters( 'has_post_thumbnail', false, $post_id ) );

		// Add the hero embed.
		update_post_meta( $post_id, 'oovvuu_state', [ 'isHeroEnabled' => true ] );
		update_post_meta( $post_id, 'oovvuu_embeds', [ 'hero' => [ 'id' => '1234' ] ] );

		// Should not return HTMl until global setting is active.
		$this->assertFalse( apply_filters( 'has_post_thumbnail', false, $post_id ) );

		// Activate global setting.
		update_option( 'oovvuu_auto_replace_feature_image', '1' );

		// Only allow overrides to happen on single pages.
		$this->assertFalse( apply_filters( 'has_post_thumbnail', false, $post_id ) );

		// Go to post page.
		$this->go_to( get_permalink( $post_id ) );

		// Returns HTML.
		$this->assertTrue( apply_filters( 'has_post_thumbnail', false, $post_id ) );

		// Check if invalid post ID.
		$this->assertFalse( apply_filters( 'has_post_thumbnail', false, PHP_INT_MAX ) );
	}
}
