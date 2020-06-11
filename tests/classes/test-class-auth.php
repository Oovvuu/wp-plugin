<?php
/**
 * Tests the Auth class.
 *
 * @package Oovvuu
 */

use Oovvuu\Auth;

class Auth_Test extends WP_UnitTestCase {

	public function setUp() {
		parent::tearDown();

		// Login a user.
		$this->admin_id = self::factory()->user->create(
			[
				'role' => 'administrator',
			]
		);
	}

	public function tearDown() {
		parent::tearDown();

		wp_set_current_user( 0 );
	}

	/**
	 * Tests if a user is currently authenticated.
	 */
	public function test_is_user_authenticated() {
		// Without a current user logged in, authentication will fail.
		$this->assertFalse( Auth::instance()->is_user_authenticated(), 'Expecting user to be unauthenticated when no user is logged in.' );

		// Login a user.
		wp_set_current_user( $this->admin_id );

		// Without an access token set the user is unauthenticated.
		$this->assertFalse( Auth::instance()->is_user_authenticated(), 'Expecting user to be unauthenticated when no token is set.' );

		// Add access token.
		Auth::instance()->set_user_token( $this->admin_id, [ 'access_token' => 'xxx', 'refresh_token' => 'xxx', 'id_token' => 'xxx', 'expires_in' => 123, 'added_at' => 123 ] );

		$this->assertTrue( Auth::instance()->is_user_authenticated(), 'Expecting user to be authenticated.' );
	}

	/**
	 * Tests if a token is valid.
	 */
	public function test_is_token_valid() {
		// Empty token.
		$this->assertFalse( Auth::instance()->is_token_valid( false ), 'Expecting empty token to be invalid.' );

		// Wrong type.
		$this->assertFalse( Auth::instance()->is_token_valid( 'access token' ), 'Expecting wrong type of token to be invalid.' );

		// Invalid structure.
		$this->assertFalse( Auth::instance()->is_token_valid( [ 'token' => 'xxx', 'expires' => 1234 ] ), 'Expecting invalid token structure to be invalid.' );

		// Valid token
		$this->assertTrue( Auth::instance()->is_token_valid( [ 'access_token' => 'xxx', 'refresh_token' => 'xxx', 'id_token' => 'xxx', 'expires_in' => 123, 'added_at' => 123 ] ), 'Expecting token to be valid.' );
	}

	/**
	 * Tests if a token is expired.
	 */
	public function test_is_token_expired() {
		// Empty token.
		$this->assertTrue( Auth::instance()->is_token_expired( false ), 'Expecting empty token to be considered expired.' );

		// Not expired.
		$this->assertFalse( Auth::instance()->is_token_expired( [ 'expires_in' => 100, 'added_at' => time() ] ), 'Expecting token to not be expired.' );

		// Expired.
		$this->assertTrue( Auth::instance()->is_token_expired( [ 'expires_in' => 100, 'added_at' => time() - 200 ] ), 'Expecting token to be expired.' );
	}
}
