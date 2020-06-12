<?php
/**
 * Tests the helpers file.
 *
 * @package Oovvuu
 */

class Helpers_Test extends WP_UnitTestCase {

	/**
	 * Tests getting an embed ID.
	 */
	public function test_get_embed_id() {
		$post_id = self::factory()->post->create();

		// Position not enabled.
		$this->assertNull( \Oovvuu\get_embed_id( 'hero', $post_id ) );

		// Enable the position.
		update_post_meta( $post_id, 'oovvuu_state', [ 'isHeroEnabled' => true ] );

		// Position enabled without an embed.
		$this->assertNull( \Oovvuu\get_embed_id( 'hero', $post_id ) );

		// Add the hero embed.
		update_post_meta( $post_id, 'oovvuu_embeds', [ 'hero' => [ 'id' => '1234' ] ] );

		// Has hero embed.
		$this->assertEquals( '1234', \Oovvuu\get_embed_id( 'hero',$post_id ) );

		// Check if invalid post ID.
		$this->assertNull( \Oovvuu\get_embed_id( 'hero', 0 ) );
	}

	/**
	 * Tests if a position is enabled.
	 */
	public function test_is_position_enabled() {
		$post_id = self::factory()->post->create();

		// Position not enabled.
		$this->assertFalse( \Oovvuu\is_position_enabled( 'hero', $post_id ) );

		// Enable the position.
		update_post_meta( $post_id, 'oovvuu_state', [ 'isHeroEnabled' => true ] );

		// Position enabled.
		$this->assertTrue( \Oovvuu\is_position_enabled( 'hero', $post_id ) );
	}
}
